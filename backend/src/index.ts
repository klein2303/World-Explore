import { ApolloServer } from '@apollo/server'; // preserve-line
import { startStandaloneServer } from '@apollo/server/standalone'; // preserve-line
import { PrismaClient } from '@prisma/client';
import { count } from 'console';


const prisma = new PrismaClient();

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
        profileid: String!

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
        writtenjournals: [Journal!]!
        unwrittenjournals: [Journal!]!
    }

    type Mutation {
      addJournal(countryid: String!, profileid: String!): Journal
      addReview(title: String!, date: String!, rating: Int!, text: String!, ispublic: Boolean!, journalid: Int!): Review
      addProfile(username: String!, email: String!, password: String!): Profile
    }
`;


// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
      countries: async () => {
        return await prisma.country.findMany();
      },
      country: async (_, {name}) => {
        return await prisma.country.findUnique({
          where: {
            name: name,
          },
      })},
      filteredcountries : async (_, {skip, name, continents, sort}) => {
        return await prisma.country.findMany({
          skip: skip,
          take: 12,
          where: {
            name: {
              contains: name.toLowerCase(),
              mode: 'insensitive',
            },
            continent: {
              in: continents,
            },
          },
          orderBy: {
              name: sort ? 'asc' : 'desc',
          },
        })
      },
      filteredcountriescount: async (_, {name, continents}) => {
        return await prisma.country.count({
          where: {
            name: {
              contains: name.toLowerCase(),
              mode: 'insensitive',
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
      writtenjournals: async () => {
        return await prisma.journal.findMany(
          {
            where: {
              reviews: {
                some: {},
              },
            },  
          },
        );
      },
      unwrittenjournals: async () => {
        return await prisma.journal.findMany(
          {
            where: {
              reviews: {
                none: {},
              },
            },  
          },
        );
      },
    },

    Mutation: {
        addJournal: async (_, {countryid, profileid}) => {
          return await prisma.journal.create({
            data: {
              country: {
                connect: {
                  name: countryid,
                },
              },
              profile: {
                connect: {
                  email: profileid,
                },
              },
            },
          });
        },
      addReview: async (_, {title, date, rating, text, ispublic, journalid}) => {
        return await prisma.review.create({
          data: {
            title: title,
            date: date,
            rating: rating,
            text: text,
            ispublic: ispublic,
            journal: {
              connect: {
                id: journalid,
              },
            }
          },
        });
      },
      addProfile: async (_, {username, email, password}) => {
        return await prisma.profile.create({
          data: {
            username: username,
            email: email,
            password: password,
          },
        });
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