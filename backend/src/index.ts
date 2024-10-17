import { ApolloServer } from '@apollo/server'; // preserve-line
import { startStandaloneServer } from '@apollo/server/standalone'; // preserve-line
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `
    type Country {
        id: ID!
        name: String!
        continent: String!
        capital: String!
        largestCity: String!
        currency: String!
        language: String!
        population: Float!
        landArea: Float!
        agricultureArea: String!
        forestArea: String!
        co2Emissions: Float!
        image: String!
    }

    type Query {
        countries: [Country]
    }
`;


// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
      countries: async () => {
        return await prisma.country.findMany();
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