const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    exampleQuery: Example!
  }

  type Example {
    id: ID!
    title: String!
    author: Author!
    views: Int!
  }

  type Author {
    id: ID!
    name: String!
  }

  type IncrementExampleViewsResponse {
    code: Int!
    success: Boolean!
    message: String!
    example: Example
  }

  type Mutation {
    incrementExampleViews(id: ID!): IncrementExampleViewsResponse!
  }
`;

module.exports = typeDefs;
