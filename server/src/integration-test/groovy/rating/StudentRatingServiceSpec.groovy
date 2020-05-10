package rating

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import org.hibernate.SessionFactory
import spock.lang.Specification

@Integration
@Rollback
class StudentRatingServiceSpec extends Specification {

    StudentRatingService studentRatingService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new StudentRating(...).save(flush: true, failOnError: true)
        //new StudentRating(...).save(flush: true, failOnError: true)
        //StudentRating studentRating = new StudentRating(...).save(flush: true, failOnError: true)
        //new StudentRating(...).save(flush: true, failOnError: true)
        //new StudentRating(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //studentRating.id
    }

    void "test get"() {
        setupData()

        expect:
        studentRatingService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<StudentRating> studentRatingList = studentRatingService.list(max: 2, offset: 2)

        then:
        studentRatingList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        studentRatingService.count() == 5
    }

    void "test delete"() {
        Long studentRatingId = setupData()

        expect:
        studentRatingService.count() == 5

        when:
        studentRatingService.delete(studentRatingId)
        sessionFactory.currentSession.flush()

        then:
        studentRatingService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        StudentRating studentRating = new StudentRating()
        studentRatingService.save(studentRating)

        then:
        studentRating.id != null
    }
}
