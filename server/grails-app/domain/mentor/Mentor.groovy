package mentor

import common.StudentMentorCommonProperties
import course.Course
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/mentor")
class Mentor extends StudentMentorCommonProperties {

    int experience

    static hasMany = [courses: Course]

    static constraints = {
        experience min: 0, max: 99
    }
}
