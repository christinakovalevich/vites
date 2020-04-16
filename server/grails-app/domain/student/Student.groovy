package student

import common.CommonProperties
import enums.student.EducationDegree
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/student")
class Student extends CommonProperties {

    String name
    String lastName
    String fatherName

    Date birthDate

    EducationDegree educationDegree
    String institutionName
    String speciality

    float rating

    static constraints = {
    }
}
