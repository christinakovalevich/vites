package student

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class StudentController {

    StudentService studentService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond studentService.list()
    }

    def show(Long id) {
        respond studentService.get(id)
    }

    @Transactional
    def save(Student student) {
        if (student == null) {
            render status: NOT_FOUND
            return
        }
        if (student.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond student.errors
            return
        }

        try {
            studentService.save(student)
        } catch (ValidationException e) {
            respond student.errors
            return
        }

        respond student, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(Student student) {
        if (student == null) {
            render status: NOT_FOUND
            return
        }
        if (student.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond student.errors
            return
        }

        try {
            studentService.save(student)
        } catch (ValidationException e) {
            respond student.errors
            return
        }

        respond student, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        studentService.delete(id)

        render status: NO_CONTENT
    }
}
