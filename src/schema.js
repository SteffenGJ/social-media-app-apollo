const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    userById(id: ID!): User
    allPosts: [Post]
    postsByUser(id: ID!): [Post]
    friendRecommendations(id: ID!): [User]
  }

  type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
    ): SignupResponse!
    sendFriendRequest(userId: ID!, matchId: ID!): FriendRequestResponse
    acceptFriendRequest(
      userId: ID!
      requesterId: ID!
    ): AcceptFriendRequestResponse
    addPost(text: String!, authorId: ID!): AddPostResponse
    login(username: String!, password: String!): LoginResponse
  }

  type User {
    id: ID!
    username: String!
    email: String!
    friends: [User]
    following: [User]
    official: Boolean!
    posts: [Post]
    hasLiked: [Post]
    strategy: String!
    profilePicture: String!
    coverImage: String!
    incommingFriendRequests: [User]
    outgoingFriendRequests: [User]
  }

  type Post {
    id: ID!
    text: String!
    author: User!
    date: String!
    likes: Int!
    comments: [Comment]
    image: String
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    date: String!
    post: Post!
  }

  type SignupResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }

  type FriendRequestResponse {
    code: Int!
    success: Boolean!
    message: String!
    friendRequestReceiver: ID
  }

  type AddPostResponse {
    code: Int!
    success: Boolean!
    message: String!
    post: Post
  }

  type AcceptFriendRequestResponse {
    code: Int!
    success: Boolean!
    message: String!
    acceptor: ID
  }

  type LoginResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: ID
  }
`;

module.exports = typeDefs;
