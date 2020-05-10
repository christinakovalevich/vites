package rating

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class CourseRatingController {

    CourseRatingService courseRatingService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond courseRatingService.list()
    }

    def show(Long id) {
        respond courseRatingService.get(id)
    }

    @Transactional
    def save(CourseRating courseRating) {
        if (courseRating == null) {
            render status: NOT_FOUND
            return
        }
        if (courseRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond courseRating.errors
            return
        }

        try {
            courseRatingService.save(courseRating)
        } catch (ValidationException e) {
            respond courseRating.errors
            return
        }

        respond courseRating, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(CourseRating courseRating) {
        if (courseRating == null) {
            render status: NOT_FOUND
            return
        }
        if (courseRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond courseRating.errors
            return
        }

        try {
            courseRatingService.save(courseRating)
        } catch (ValidationException e) {
            respond courseRating.errors
            return
        }

        respond courseRating, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        courseRatingService.delete(id)

        render status: NO_CONTENT
    }
}
