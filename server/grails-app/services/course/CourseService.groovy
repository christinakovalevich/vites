package course

import grails.gorm.services.Service
import groovy.time.TimeCategory

interface ICourseService {
    Course get(Serializable id)
    List<Course> list()
    Number count()
    Course save(Course course)
    void delete(Serializable id)
}

@Service(Course)
abstract class CourseService implements ICourseService {

    def getDays(Course course) {
        use(TimeCategory) {
            return (course.endDate - course.startDate).days
        }
    }
}
