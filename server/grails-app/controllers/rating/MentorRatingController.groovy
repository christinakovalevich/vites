package rating

import grails.gorm.transactions.Transactional
import grails.plugin.springsecurity.annotation.Secured
import grails.validation.ValidationException

import static org.springframework.http.HttpStatus.*

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class MentorRatingController {

    MentorRatingService mentorRatingService

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index() {
        respond mentorRatingService.list()
    }

    def show(Long id) {
        respond mentorRatingService.get(id)
    }

    @Transactional
    def save(MentorRating mentorRating) {
        if (mentorRating == null) {
            render status: NOT_FOUND
            return
        }
        if (mentorRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond mentorRating.errors
            return
        }

        try {
            mentorRatingService.save(mentorRating)
        } catch (ValidationException e) {
            respond mentorRating.errors
            return
        }

        respond mentorRating, [status: CREATED, view: "show"]
    }

    @Transactional
    def update(MentorRating mentorRating) {
        if (mentorRating == null) {
            render status: NOT_FOUND
            return
        }
        if (mentorRating.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond mentorRating.errors
            return
        }

        try {
            mentorRatingService.save(mentorRating)
        } catch (ValidationException e) {
            respond mentorRating.errors
            return
        }

        respond mentorRating, [status: OK, view: "show"]
    }

    @Transactional
    def delete(Long id) {
        if (id == null) {
            render status: NOT_FOUND
            return
        }

        mentorRatingService.delete(id)

        render status: NO_CONTENT
    }
}
