const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
} = require('graphql');

const CourseType = require('./Course');
const StudentType = require('./Student');

const courses = require('../../db/courses.json');
const students = require('../../db/students.json');

const GradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represent grades',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        courseID: { type: GraphQLNonNull(GraphQLInt) },
        studentID: { type: GraphQLNonNull(GraphQLInt) },
        grade: { type: GraphQLNonNull(GraphQLInt) },
        course: {
            type: CourseType,
            resolve: grade => {
                return courses.find( course => course.id === grade.courseID );
            }
        },
        student: {
            type: StudentType,
            resolve: grade => {
                return students.find( student => student.id === grade.studentID );
            }
        },
    })
});

module.exports = GradeType;