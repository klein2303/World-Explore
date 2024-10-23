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
        co2emissions: Float
        image: String!

        journals: [Journal!]!
    }

    type Journal {
        id: ID!
        countryid: Int!
        title: String!
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

    type Query {
        countries: [Country!]!
        country(name: String!): Country

        journals: [Journal!]!
        reviews: [Review!]!
    }

    type Mutation {
      addJournal(countryid: Int!): Journal
      addReview(title: String!, date: String!, rating: Int!, text: String!, ispublic: Boolean!, journalid: Int!): Review
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
      journals: async () => {
        return await prisma.journal.findMany();
      },
      reviews: async () => {
        return await prisma.review.findMany();
      },
    },

    Mutation: {
      addJournal: async (_, {countryId}) => {
        return await prisma.journal.create({
          data: {
            country: {
              connect: {
                id: countryId,
            }
          },
        }});
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
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);