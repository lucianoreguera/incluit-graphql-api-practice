const express = require('express');
const expressGraphQL = require('express-graphql');
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
	GraphQLString
} = require('graphql');

const app = express();

const courses = require('./db/courses.json');
const students = require('./db/students.json');
const grades = require('./db/grades.json');


const CourseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represent courses',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) }
    })
});

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
			  	return courses.find(course => course.id === student.courseID);
			},
		}
    })
});

const GradeType = new GraphQLObjectType({
	name: "Grade",
	description: "Represent grades",
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		courseID: { type: GraphQLNonNull(GraphQLInt) },
		studentID: { type: GraphQLNonNull(GraphQLInt) },
		grade: { type: GraphQLNonNull(GraphQLInt) },
		course: {
			type: CourseType,
			resolve: grade => {
				return courses.find(course => course.id === grade.courseID);
			},
		},
		student: {
			type: StudentType,
			resolve: grade => {
				return students.find(student => student.id === grade.studentID);
			}
		}
	})
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        courses: {
            type: new GraphQLList(CourseType),
            description: 'List of all courses',
            resolve: () => courses
		},
		course: {
            type: CourseType,
            description: 'Particular Course',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => courses.find(course => course.id === args.id)
        },
        students: {
            type: new GraphQLList(StudentType),
            description: 'List of all students',
            resolve: () => students
		},
		student: {
            type: StudentType,
            description: 'Particular Student',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => students.find(student => student.id === args.id)
        },
		grades: {
            type: new GraphQLList(GradeType),
            description: 'List of all grades',
            resolve: () => grades
        },
        grade: {
            type: GradeType,
            description: 'Particular Grade',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => grades.find(grade => grade.id === args.id)
        }
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addCourse: {
            type: CourseType,
            description: 'Add a course',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const course = {
                    id: courses.length + 1,
                    name: args.name,
                    description: args.description
				};
				
                courses.push(course);
                return course;
            }
        },
        addStudent: {
            type: StudentType,
            description: 'Add a student',
            args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				lastname: { type: GraphQLNonNull(GraphQLString) },
				courseID: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const student = {
                    id: students.length + 1,
					name: args.name,
					lastname: args.lastname,
					courseID: args.courseID
				};

                students.push(student);
                return student;
            }
		},
		addGrade: {
			type: GradeType,
			description: 'Add a grade',
			args: {
				courseID: { type: GraphQLNonNull(GraphQLInt) },
				studentID: { type: GraphQLNonNull(GraphQLInt) },
				grade: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const grade = {
					id: grades.length + 1,
					courseID: args.courseID,
					studentID: args.studentID,
					grade: args.grade
				};

				grades.push(grade);
				return grade;
			}
		},
		deleteCourse: {
			type: GraphQLList(CourseType),
			description: 'Delete a course',
			args: {
				id: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const remove = courses.find(course => course.id === args.id);
				if (remove) {
					const coursesList = courses.filter(course => course.id !== args.id);
					return coursesList;
				} else {
					throw new Error('The course does not exist');
				}
			}
		},
		deleteStudent: {
			type: GraphQLList(StudentType),
			description: 'Delete a student',
			args: {
				id: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const remove = students.find(student => student.id === args.id);
				if (remove) {
					const studentsList = students.filter(student => student.id !== args.id);
					return studentsList;
				} else {
					throw new Error('The student does not exist');
				}
			}
		},
		deleteGrade: {
			type: GraphQLList(GradeType),
			description: 'Delete a course',
			args: {
				id: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const gradesList = grades.filter(grade => grade.id !== args.id);
				return gradesList;
			}
		}
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});