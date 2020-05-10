package rating

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import org.hibernate.SessionFactory
import spock.lang.Specification

@Integration
@Rollback
class CourseRatingServiceSpec extends Specification {

    CourseRatingService courseRatingService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new CourseRating(...).save(flush: true, failOnError: true)
        //new CourseRating(...).save(flush: true, failOnError: true)
        //CourseRating courseRating = new CourseRating(...).save(flush: true, failOnError: true)
        //new CourseRating(...).save(flush: true, failOnError: true)
        //new CourseRating(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //courseRating.id
    }

    void "test get"() {
        setupData()

        expect:
        courseRatingService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<CourseRating> courseRatingList = courseRatingService.list(max: 2, offset: 2)

        then:
        courseRatingList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        courseRatingService.count() == 5
    }

    void "test delete"() {
        Long courseRatingId = setupData()

        expect:
        courseRatingService.count() == 5

        when:
        courseRatingService.delete(courseRatingId)
        sessionFactory.currentSession.flush()

        then:
        courseRatingService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        CourseRating courseRating = new CourseRating()
        courseRatingService.save(courseRating)

        then:
        courseRating.id != null
    }
}
