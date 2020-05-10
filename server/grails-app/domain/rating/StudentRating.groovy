package rating

import grails.compiler.GrailsCompileStatic
import mentor.Mentor
import security.User
import student.Student

@GrailsCompileStatic
class StudentRating {

    float value
    Student student
    Mentor ratedBy

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static belongsTo = [student: Student]

    static constraints = {
        value shared: "ratable"
    }
}
