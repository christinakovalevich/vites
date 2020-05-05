package student

import common.StudentMentorCommonProperties
import course.Course
import enums.student.EducationDegree
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/student")
class Student extends StudentMentorCommonProperties {

    EducationDegree educationDegree
    String institutionName
    String speciality

    static hasMany = [courses: Course]

    static constraints = {
    }
}
