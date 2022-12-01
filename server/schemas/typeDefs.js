const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie]
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  input createUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA
  }

  input updateUserInput {
    id: ID!
    newName: String!
  }

  type Mutation {
    createUser(input: createUserInput!): User
    updateUserName(input: updateUserInput!): User
    deleteUser(id: ID!): User
  }

  enum Nationality {
    INDIA
    GERMANY
    CANADA
    BRAZIL
    CHILE
  }
`;

module.exports = { typeDefs };
