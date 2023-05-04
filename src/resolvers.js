const resolvers = {
  Query: {
    //resolver args: (parent, args, contextValue, info)
    exampleQuery: (_, { id }, { dataSources }) => {
      return dataSources.exampleAPI.getExampleQuery(id);
    },
  },
  Mutation: {
    incrementExampleViews: async (_, { id }, { dataSources }) => {
      try {
        const example = await dataSources.exampleAPI.incrementExampleViews(id);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          example,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          example: null,
        };
      }
    },
  },
  Example: {
    // This is for the more difficult queries.
    // You would want to define this child resolver if you have an authorId but not the whole author as promised.
    // In that case you can call another endpoint and get the needed information to return
    // For more information see Resolverchains
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.exampleAPI.getAuthor(authorId);
    },
  },
};

module.exports = resolvers;
