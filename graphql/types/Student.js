const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const CourseType = require('./Course');
const courses = require('../../db/courses.json');

const StudentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represent students',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        courseID: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: student => {
                return courses.find( course => course.id === student.courseID );
            }
        }
    })
});

module.exports = StudentType;