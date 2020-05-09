package student


import course.Course
import enums.student.EducationDegree
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import security.User

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/student")
class Student {

    String name
    String lastName
    String fatherName

    Date birthDate

    float rating

    User user
    EducationDegree educationDegree
    String institutionName
    String speciality

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static hasMany = [courses: Course]

    static constraints = {
        name shared: "name"
        lastName shared: "name"
        fatherName shared: "name"
        birthDate shared: "birthDate"
        rating shared: "ratable"
    }
}
