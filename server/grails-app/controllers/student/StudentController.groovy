package student

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import mentor.MentorService

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class StudentController extends RestfulController {
    static responseFormats = ['json', 'xml']

    StudentController() {
        super(Student)
    }

    StudentService studentService
    MentorService mentorService

    def myStudents() {
        def authenticatedMentor = mentorService.authenticatedMentor
        def studentList = []

        if (authenticatedMentor) {
            studentList = studentService.getStudentsByMentor(authenticatedMentor)
        }

        respond studentList
    }
}
