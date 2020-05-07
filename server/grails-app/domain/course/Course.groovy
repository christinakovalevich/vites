package course


import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import mentor.Mentor
import security.User
import student.Student

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/course")
class Course {

    String name
    Date startDate
    Date endDate

    float difficulty
    float popularity

    int totalPlacesCount

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    int getAvailablePlacesCount() {
        if (students) {
            return totalPlacesCount - students.size()
        }
        return totalPlacesCount
    }

    static hasMany = [mentors: Mentor, students: Student]

    static belongsTo = [Mentor, Student]

    static constraints = {
        name blank: false, size: 0..100
        difficulty min: 0.0f, max: 5.0f
        popularity min: 0.0f, max: 5.0f
        totalPlacesCount min: 0
    }
}
