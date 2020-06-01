const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./resolvers/Querys');
const RootMutationType = require('./resolvers/Mutations');

const Schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

module.exports = Schema;