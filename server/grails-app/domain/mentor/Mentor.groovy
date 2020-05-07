package mentor


import course.Course
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import security.User

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/mentor")
class Mentor {

    String name
    String lastName
    String fatherName

    Date birthDate

    float rating

    User user
    int experience

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static hasMany = [courses: Course]

    static constraints = {
        experience min: 0, max: 99
    }
}
