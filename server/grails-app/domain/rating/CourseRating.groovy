package rating

import course.Course
import grails.compiler.GrailsCompileStatic
import security.User
import student.Student

@GrailsCompileStatic
class CourseRating {

    float value
    Course course
    Student ratedBy

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static belongsTo = [course: Course]

    static constraints = {
        value shared: "ratable"
    }
}
