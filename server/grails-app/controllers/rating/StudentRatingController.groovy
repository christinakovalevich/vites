package rating

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class StudentRatingController {

    StudentRatingService studentRatingService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond studentRatingService.list()
    }

    def show(Long id) {
        respond studentRatingService.get(id)
    }

    @Transactional
    def save(StudentRating studentRating) {
        if (studentRating == null) {
            render status: NOT_FOUND
            return
        }
        if (studentRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond studentRating.errors
            return
        }

        try {
            studentRatingService.save(studentRating)
        } catch (ValidationException e) {
            respond studentRating.errors
            return
        }

        respond studentRating, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(StudentRating studentRating) {
        if (studentRating == null) {
            render status: NOT_FOUND
            return
        }
        if (studentRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond studentRating.errors
            return
        }

        try {
            studentRatingService.save(studentRating)
        } catch (ValidationException e) {
            respond studentRating.errors
            return
        }

        respond studentRating, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        studentRatingService.delete(id)

        render status: NO_CONTENT
    }
}
