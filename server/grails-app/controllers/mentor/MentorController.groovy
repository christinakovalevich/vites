package mentor

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException
import student.StudentService

import static org.springframework.http.HttpStatus.*

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class MentorController {

    MentorService mentorService
    StudentService studentService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond mentorService.list()
    }

    def myMentors() {
        def authenticatedStudent = studentService.authenticatedStudent
        def mentors = []

        if (authenticatedStudent) {
            mentors = mentorService.getMentorsByStudent(authenticatedStudent)
        }

        respond mentors
    }

    def show(Long id) {
        respond mentorService.get(id)
    }

    @Transactional
    def save(Mentor mentor) {
        if (mentor == null) {
            render status: NOT_FOUND
            return
        }
        if (mentor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond mentor.errors
            return
        }

        try {
            mentorService.save(mentor)
        } catch (ValidationException e) {
            respond mentor.errors
            return
        }

        respond mentor, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Mentor mentor) {
        if (mentor == null) {
            render status: NOT_FOUND
            return
        }
        if (mentor.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond mentor.errors
            return
        }

        try {
            mentorService.save(mentor)
        } catch (ValidationException e) {
            respond mentor.errors
            return
        }

        respond mentor, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        mentorService.delete(id)

        render status: NO_CONTENT
    }
}
