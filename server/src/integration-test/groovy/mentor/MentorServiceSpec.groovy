package mentor

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import org.hibernate.SessionFactory
import spock.lang.Specification

@Integration
@Rollback
class MentorServiceSpec extends Specification {

    MentorService mentorService
    SessionFactory sessionFactory

    private Long setupData() {
        // TODO: Populate valid domain instances and return a valid ID
        //new Mentor(...).save(flush: true, failOnError: true)
        //new Mentor(...).save(flush: true, failOnError: true)
        //Mentor mentor = new Mentor(...).save(flush: true, failOnError: true)
        //new Mentor(...).save(flush: true, failOnError: true)
        //new Mentor(...).save(flush: true, failOnError: true)
        assert false, "TODO: Provide a setupData() implementation for this generated test suite"
        //mentor.id
    }

    void "test get"() {
        setupData()

        expect:
        mentorService.get(1) != null
    }

    void "test list"() {
        setupData()

        when:
        List<Mentor> mentorList = mentorService.list(max: 2, offset: 2)

        then:
        mentorList.size() == 2
        assert false, "TODO: Verify the correct instances are returned"
    }

    void "test count"() {
        setupData()

        expect:
        mentorService.count() == 5
    }

    void "test delete"() {
        Long mentorId = setupData()

        expect:
        mentorService.count() == 5

        when:
        mentorService.delete(mentorId)
        sessionFactory.currentSession.flush()

        then:
        mentorService.count() == 4
    }

    void "test save"() {
        when:
        assert false, "TODO: Provide a valid instance to save"
        Mentor mentor = new Mentor()
        mentorService.save(mentor)

        then:
        mentor.id != null
    }
}
