const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represent courses',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
    })
});

module.exports = CourseType;