package rating

import grails.compiler.GrailsCompileStatic
import mentor.Mentor
import security.User
import student.Student

@GrailsCompileStatic
class MentorRating {

    float value
    Mentor mentor
    Student ratedBy

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static belongsTo = [mentor: Mentor]

    static constraints = {
        value shared: "ratable"
    }
}
