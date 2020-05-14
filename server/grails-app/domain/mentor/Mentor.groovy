package mentor

import course.Course
import grails.compiler.GrailsCompileStatic
import rating.MentorRating
import security.User

@GrailsCompileStatic
class Mentor {

    String name
    String lastName
    String fatherName

    Date birthDate

    User user
    int experienceYears

    Date dateCreated
    Date lastUpdated
    User createdBy
    User lastUpdatedBy
    boolean disabled

    static hasMany = [courses: Course, ratings: MentorRating]

    static constraints = {
        name shared: "name"
        lastName shared: "name"
        fatherName shared: "name"
        birthDate shared: "birthDate"
        experienceYears min: 0, max: 99
    }
}
