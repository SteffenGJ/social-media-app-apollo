const resolvers = {
  Query: {
    //resolver args: (parent, args, contextValue, info)
    userById: (_, { id }, { dataSources }) => {
      return dataSources.dataAPI.getUser(id);
    },
    allPosts: (_, __, { dataSources }) => {
      return dataSources.dataAPI.getAllPosts();
    },
    postsByUser: (_, { id }, { dataSources }) => {
      return dataSources.dataAPI.getPostsByUser(id);
    },
    friendRecommendations: (_, { id }, { dataSources }) => {
      return dataSources.dataAPI.getFriendRecommendations(id);
    },
  },
  Mutation: {
    addUser: async (_, { username, password, email }, { dataSources }) => {
      try {
        const user = await dataSources.dataAPI.addUser(
          username,
          password,
          email
        );

        return {
          code: 200,
          success: true,
          message: "Successfully created a new user",
          user,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          user: null,
        };
      }
    },
    sendFriendRequest: async (_, { userId, matchId }, { dataSources }) => {
      try {
        const friendRequestReciever =
          await dataSources.dataAPI.sendFriendRequest(userId, matchId);

        return {
          code: 200,
          success: true,
          message: `Successfully sent friend request to ${friendRequestReciever.potentialFriend}`,
          friendRequestReciever: friendRequestReciever.potentialFriend,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          friendRequestReciever: null,
        };
      }
    },
    acceptFriendRequest: async (
      _,
      { userId, requesterId },
      { dataSources }
    ) => {
      try {
        const acceptor = await dataSources.dataAPI.acceptFriendRequest(
          userId,
          requesterId
        );

        return {
          code: 200,
          success: true,
          message: `Successfully accepted friend request from ${requesterId}`,
          acceptor,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          friendRequestReciever: null,
        };
      }
    },
    addPost: async (_, { text, authorId }, { dataSources }) => {
      try {
        const post = await dataSources.dataAPI.addPost(text, authorId);

        return {
          code: 200,
          success: true,
          message: "Successfully posted a post",
          post,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          post: null,
        };
      }
    },
    login: async (_, { username, password }, { dataSources }) => {
      try {
        const response = await dataSources.dataAPI.login(username, password);

        return {
          code: 200,
          success: true,
          message: `Logged in as ${response.message}`,
          user: response.message,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body.message,
        };
      }
    },
  },
  User: {
    friends: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getFriends(id);
    },
    posts: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getPostsByUser(id);
    },
    incommingFriendRequests: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getFriendRequests(id);
    },
    outgoingFriendRequests: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getOutgoingRequests(id);
    },
    following: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getFollowing(id);
    },
    hasLiked: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getHasLiked(id);
    },
  },
  Post: {
    author: ({ author }, _, { dataSources }) => {
      return dataSources.dataAPI.getUser(author);
    },
    comments: ({ id }, _, { dataSources }) => {
      return dataSources.dataAPI.getComments(id);
    },
  },
  Comment: {
    author: ({ author }, _, { dataSources }) => {
      return dataSources.dataAPI.getUser(author);
    },
    post: ({ post }, _, { dataSources }) => {
      return dataSources.dataAPI.getPost(post);
    },
  },
};

module.exports = resolvers;
