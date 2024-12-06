import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone"; // preserve-line
import { PrismaClient } from "@prisma/client";
import { count, log } from "console";
import pkg from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;

const { sign } = pkg;
const prisma = new PrismaClient();
const APP_SECRET = "SECRET";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
    type Country {
        id: ID!
        name: String!
        continent: String!
        capital: String
        largestcity: String
        currency: String
        language: String
        population: Float
        landarea: Float
        agriculturearea: String
        forestarea: String
        co2emission: Float
        image: String!

        journals: [Journal!]!
    }

    type Journal {
        id: ID!

        countryid: String!
        countryimage: String!
        profileid: String!

        profile: Profile!

        reviews: [Review!]!
    }
    
    type Review {
        id: ID!
        title: String!
        date: String!
        rating: Int!
        text: String!
        ispublic: Boolean!

        journalid: Int!
        journal: Journal!
    }
    
    type Profile {
        id: ID!
        username: String!
        email: String!
        password: String!
        
        journals: [Journal!]!
    }

    type Query {
        countries: [Country!]!
        country(name: String!): Country
        
        filteredcountries(skip: Int, name: String, continents: [String!]!, sort: Boolean!): [Country]
        filteredcountriescount(name: String, continents: [String!]!): Int!
        
        journals: [Journal!]!
        reviews: [Review!]!

        publicreviews: [Review!]!
        filteredpublicreviews(country: String!): [Review!]!

        writtenjournals(skip: Int, profileid: String!, information: String): [Journal!]!
        writtenjournal(countryid: String!, profileid: String!): Journal
    }

    type Mutation {
      addJournal(countryid: String!, countryimage: String!, profileid: String!): Journal
      addReview(title: String!, date: String!, rating: Int!, text: String!, ispublic: Boolean!, profileid: String!, countryid: String!): Review

      addProfile(username: String!, email: String!, password: String!): Profile
      login( email: String!, password: String!): AuthPayload
      signup(username: String!, email: String!, password: String!): AuthPayload

      deleteReview(id: ID!, journalid: Int!): Int!
    }

    type AuthPayload {
        token: String
        user: Profile
    }
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        countries: async () => {
            return await prisma.country.findMany();
        },
        country: async (_, { name }) => {
            return await prisma.country.findUnique({
                where: {
                    name: name,
                },
            });
        },
        filteredcountries: async (_, { skip, name, continents, sort }) => {
            return await prisma.country.findMany({
                skip: skip,
                take: 12,
                where: {
                    name: {
                        contains: name.toLowerCase(),
                        mode: "insensitive",
                    },
                    continent: {
                        in: continents,
                    },
                },
                orderBy: {
                    name: sort ? "asc" : "desc",
                },
            });
        },
        filteredcountriescount: async (_, { name, continents }) => {
            return await prisma.country.count({
                where: {
                    name: {
                        contains: name.toLowerCase(),
                        mode: "insensitive",
                    },
                    continent: {
                        in: continents,
                    },
                },
            });
        },
        journals: async () => {
            return await prisma.journal.findMany();
        },
        reviews: async () => {
            return await prisma.review.findMany();
        },
        publicreviews: async () => {
            return await prisma.review.findMany({
                where: {
                    ispublic: true,
                },
            });
        },
        filteredpublicreviews: async (_, { country }) => {
            return await prisma.review.findMany({
                where: {
                    ispublic: true,
                    journal: {
                        countryid: country,
                    },
                },
                include: {
                    journal: {
                        include: {
                            profile: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });
        },
        writtenjournals: async (_, { skip, profileid, information }) => {
            return await prisma.journal.findMany({
                skip: skip,
                take: 15,
                where: {
                    profileid: profileid.toLowerCase(),
                    reviews: {
                        some: {},
                    },
                    countryid: {
                        contains: information.toLowerCase(),
                        mode: "insensitive",
                    }
                },
            });
        },
        writtenjournal: async (_, { countryid, profileid }) => {
            return await prisma.journal.findFirst({
                where: {
                    countryid: countryid,
                    profileid: profileid.toLowerCase(),
                },
                include: {
                    reviews: true,
                },
            });
        },
    },

    Mutation: {
        addJournal: async (_, { countryid, profileid, countryimage }) => {
            return await prisma.journal.create({
                data: {
                    countryid: countryid,
                    countryimage: countryimage,
                    profileid: profileid.toLowerCase(),
                },
            });
        },
        addReview: async (_, { title, date, rating, text, ispublic, profileid, countryid }) => {
            if (date === "" || title === "" || text === "" || rating === "" || ispublic === "") {
                throw new Error("Please fill out all fields");
            }

            if (date > new Date().toISOString().split("T")[0]) {
                throw new Error("Invalid date");
            }

            const profileExists = await prisma.profile.findUnique({
                where: {
                    email: profileid.toLowerCase(),
                },
            });

            if (!profileExists.email) {
                throw new Error("Profile with the given ID does not exist.");
            }

            let journal = await prisma.journal.findFirst({
                where: {
                    profileid: await profileid.toLowerCase(),
                    countryid: countryid,
                },
                select: {
                    id: true,
                },
            });

            if (!journal) {
                const countryimage = await prisma.country.findFirst({
                    where: {
                        name: countryid,
                    },
                });

                journal = await prisma.journal.create({
                    data: {
                        countryid: countryid,
                        countryimage: countryimage.image,
                        profileid: profileid.toLowerCase(),
                    },
                    select: { id: true }, // Select the `id` field to use in the next step
                });
            }

            return await prisma.review.create({
                data: {
                    title: title,
                    date: date,
                    rating: rating,
                    text: text,
                    ispublic: ispublic,
                    journal: {
                        connect: {
                            id: journal.id,
                        },
                    },
                },
            });
        },
        addProfile: async (_, { username, email, password }) => {
            const userExists = await prisma.profile.findUnique({
                where: {
                    email: email.toLowerCase(),
                },
            });
            if (userExists) {
                throw new Error("User already exists");
            }

            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const valid = emailRegex.test(email.toLowerCase());
            if (!valid) {
                throw new Error("Invalid email");
            }

            const passwordHash = await hash(password, 10);

            return await prisma.profile.create({
                data: {
                    username: username,
                    email: email.toLowerCase(),
                    password: passwordHash,
                },
            });
        },
        signup: async (_, { username, email, password }) => {
            if (username === "" || email === "" || password === "") {
                throw new Error("Please fill out all fields");
            }

            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters");
            }

            if (username.length < 3) {
                throw new Error("Username must be at least 3 characters");
            }

            if (username.length > 20) {
                throw new Error("Username must be less than 20 characters");
            }

            const userExists = await prisma.profile.findUnique({
                where: {
                    email: email.toLowerCase(),
                },
            });

            if (userExists) {
                throw new Error("User already exists");
            }

            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const valid = emailRegex.test(email.toLowerCase());
            if (!valid) {
                throw new Error("Invalid email");
            }

            const passwordHash = await hash(password, 10);

            const user = await prisma.profile.create({
                data: {
                    username: username,
                    email: email.toLowerCase(),
                    password: passwordHash,
                },
            });

            const token = sign({ userId: user.id }, APP_SECRET);

            return {
                token,
                user,
            };
        },
        login: async (_, { email, password }) => {
            const user = await prisma.profile.findUnique({
                where: {
                    email: email.toLowerCase(),
                },
            });

            if (!user) {
                throw new Error("No such user found");
            }

            const valid = await compare(password, user.password);

            if (!valid) {
                throw new Error("Invalid password");
            }

            const token = sign({ userId: user.id }, APP_SECRET);

            return {
                token,
                user,
            };
        },
        deleteReview: async (_, { id, journalid}) => {
            const deletedReview = await prisma.review.delete({
                where: { id: parseInt(id, 10) },
              });

            const remainingReviews = await prisma.review.count({
                where: { journalid: journalid },
            });

            if (remainingReviews === 0) {
                await prisma.journal.delete({
                  where: { id: journalid },
                });

                return 0;
            }
            
            return 1;;
        },
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 3001 },
});

console.log(`🚀  Server ready at: ${url}`);
