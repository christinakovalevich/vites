package rating

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import org.hibernate.SessionFactory
import spock.lang.Specification

@Integration
@Rollback
class MentorRatingServiceSpec extends Specification {

    MentorRatingService mentorRatingService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new MentorRating(...).save(flush: true, failOnError: true)
        //new MentorRating(...).save(flush: true, failOnError: true)
        //MentorRating mentorRating = new MentorRating(...).save(flush: true, failOnError: true)
        //new MentorRating(...).save(flush: true, failOnError: true)
        //new MentorRating(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //mentorRating.id
    }

    void "test get"() {
        setupData()

        expect:
        mentorRatingService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<MentorRating> mentorRatingList = mentorRatingService.list(max: 2, offset: 2)

        then:
        mentorRatingList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        mentorRatingService.count() == 5
    }

    void "test delete"() {
        Long mentorRatingId = setupData()

        expect:
        mentorRatingService.count() == 5

        when:
        mentorRatingService.delete(mentorRatingId)
        sessionFactory.currentSession.flush()

        then:
        mentorRatingService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        MentorRating mentorRating = new MentorRating()
        mentorRatingService.save(mentorRating)

        then:
        mentorRating.id != null
    }
}
