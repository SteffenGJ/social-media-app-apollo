const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const DataAPI = require("./datasources/data-api");

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const port = Number.parseInt(process.env.PORT) || 4000;

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;

      return {
        dataSources: {
          dataAPI: new DataAPI({ cache }),
        },
      };
    },
    listen: { port },
  });

  console.log(`
    🚀  Server is running
    📭  Query at ${url}
  `);
}

startApolloServer();
