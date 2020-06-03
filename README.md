<h1>graphql-api</h1>
<h2>Pre-requisites</h2>
<ol>
<li>Create 3 JSON files with Course, Student and Grade</li>
<li>Course have an id, name and description</li>
<li>Student have id, name, lastname, courseId (Assumption: 1 student only can be in one course)</li>
<li>Grade have id, courseId, studentId, grade</li>
</ol>
<h2>Create a Graphql structure in order to:</h2>
<ol>
<li>Query all Courses, Students and Grades</li>
<li>Query by id a Course, Student and Grade</li>
<li>Create a Course, Student and Grade</li>
<li>Delete a Course, Student and Grade</li>
</ol>

<h3>Endpoint</h3>
http://localhost:3000/graphql

<h3>Querys</h3>
<p>All courses</p>
<code>
query {
  courses{
    id
    name
    description
  }
}
</code>
<p>All students</p>
<code>
query {
  students {
    id
    name
    lastname
    course {
      name
      description
    }
  }
}
</code>
<p>All grades</p>
<code>
query {
  grades {
    student {
      name
      lastname
    }
    course {
      name
    }
    grade
  }
}
</code>
<p>Particular course</p>
<code>
query {
  course(id:1) {
    id
    name
    description
  }
}
</code>
<p>Particular student</p>
<code>
query {
  student(id: 1) {
    id
    name
    lastname
    course {
      name
    }
  }
}
</code>
<p>Particular grade</p>
<code>
query {
  grade(id: 1) {
    student {
      name
      lastname
    }
    course {
      name
    }
    grade
  }
}
</code>
<h3>Mutations</h3>
<p>Add course</p>
<code>
mutation {
  addCourse(name: "test", description:"test") {
    id
    name
    description
  }
}
</code>
<p>Add student</p>
<code>
mutation {
  addStudent(name: "test", lastname:"test", courseID:1) {
    id
    name
    lastname
    course {
      name
    }
  }
}
</code>
<p>Add grade</p>
<code>
mutation {
  addGrade(courseID: 6, studentID: 1, grade: 8) {
    id
    student {
      name
      lastname
    }
    course {
      name
    }
    grade
  }
}
</code>
<p>Delete course</p>
<code>
mutation {
  deleteCourse(id:1) {
    id
    name
    description
  }
}
</code>
<p>Delete student</p>
<code>
mutation {
  deleteStudent(id: 1){
    id
    name
    lastname
  }
}
</code>
<p>Delete grade</p>
<code>
mutation {
  deleteGrade(id:1) {
    id
    student {
      name
      lastname
    }
    course {
      name
    }
    grade
  }
}
</code>
