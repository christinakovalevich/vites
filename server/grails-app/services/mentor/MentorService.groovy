package mentor

import grails.gorm.services.Service
import grails.util.Holders
import student.Student

interface IMentorService {

    Mentor get(Serializable id)

    List<Mentor> list(Map args)

    Long count()

    void delete(Serializable id)

    Mentor save(Mentor mentor)

}

@Service(Mentor)
abstract class MentorService implements IMentorService {

    Mentor getAuthenticatedMentor() {
        def currentUser = Holders.applicationContext.springSecurityService.currentUser

        if (currentUser) {
            return Mentor.findByUser(currentUser)
        }

        return null
    }

    Set<Mentor> getMentorsByStudent(Student student) {
        def mentors = [] as Set<Mentor>

        if (student.courses) {
            student.courses.each {
                mentors.addAll(it.mentors)
            }
        }

        return mentors
    }

}
