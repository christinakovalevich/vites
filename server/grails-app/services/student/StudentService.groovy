package student

import grails.gorm.services.Service
import grails.util.Holders
import mentor.Mentor

interface IStudentService {

    Student get(Serializable id)

    List<Student> list(Map args)

    Long count()

    void delete(Serializable id)

    Student save(Student student)

}

@Service(Student)
abstract class StudentService implements IStudentService {

    Set<Student> getStudentsByMentor(Mentor mentor) {
        def students = [] as Set<Student>

        if (mentor.courses) {
            mentor.courses.each {
                students.addAll(it.students)
            }
        }

        return students
    }

    Student getAuthenticatedStudent() {
        def currentUser = Holders.applicationContext.springSecurityService.currentUser

        if (currentUser) {
            return Student.findByUser(currentUser)
        }

        return null
    }

}