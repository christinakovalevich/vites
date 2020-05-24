package student

import course.Course
import courseWork.CourseWork
import enums.student.EducationDegree
import grails.compiler.GrailsCompileStatic
import rating.StudentRating
import security.User

@GrailsCompileStatic
class Student {

    String name
    String lastName
    String fatherName

    Date birthDate

    User user
    EducationDegree educationDegree
    String institutionName
    String speciality

    String email
    String phone

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static hasMany = [courses: Course, ratings: StudentRating, courseWorks: CourseWork]

    static constraints = {
        name shared: "name"
        lastName shared: "name"
        fatherName shared: "name"
        birthDate shared: "birthDate"
        email shared: "email"
        phone shared: "phone"
    }
}
