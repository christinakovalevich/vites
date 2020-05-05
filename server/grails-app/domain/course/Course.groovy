package course

import common.CommonProperties
import grails.compiler.GrailsCompileStatic
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.Resource
import mentor.Mentor
import student.Student
import technology.Technology

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
@GrailsCompileStatic
@Resource(uri = "/api/course")
class Course extends CommonProperties {

    String name
    Date startDate
    Date endDate

    int difficulty
    int popularity
    int demand

    int totalStudentsCount

    int getAvailablePlaces() {
        return totalStudentsCount - students.size()
    }

    static hasMany = [mentors: Mentor, students: Student, technologies: Technology]

    static belongsTo = [Mentor, Student]

    static constraints = {
        name blank: false, size: 0..100
        difficulty min: 1, max: 10
        popularity min: 0, max: 10
        demand min: 0, max: 10
        totalStudentsCount min: 0
    }
}
