package technology

import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import mentor.Mentor
import student.Student

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/technology")
class Technology {

    String name
    int difficulty
    int popularity
    int demand

    static hasMany = [students: Student, menthors: Mentor]
    static belongsTo = [Student, Mentor]

    static constraints = {
        name size: 0..25
        difficulty min: 1, max: 10
        popularity min: 0, max: 10
        demand min: 0, max: 10
    }
}
