const {
    GraphQLObjectType,
} = require('graphql');

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        
    })
});

module.exports = RootMutationType;

