package mentor

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import student.StudentService

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class MentorController extends RestfulController {
    static responseFormats = ['json', 'xml']

    MentorController() {
        super(Mentor)
    }

    MentorService mentorService
    StudentService studentService

    def myMentors() {
        def authenticatedStudent = studentService.authenticatedStudent
        def mentors = []

        if (authenticatedStudent) {
            mentors = mentorService.getMentorsByStudent(authenticatedStudent)
        }

        respond mentors
    }
}
