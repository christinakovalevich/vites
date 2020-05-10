package course

import grails.gorm.services.Service
import grails.util.Holders
import groovy.time.TimeCategory
import rating.CourseRating
import rating.CourseRatingService

interface ICourseService {
    Course get(Serializable id)

    List<Course> list()

    Number count()

    Course save(Course course)

    void delete(Serializable id)
}

@Service(Course)
abstract class CourseService implements ICourseService {

    List<Course> listCoursesByStudent(Serializable studentId) {
        return Course.executeQuery("from Course c join c.students s where s.id = :studentId",
                [studentId: studentId])
    }

    def getDays(Course course) {
        use(TimeCategory) {
            return (course.endDate - course.startDate).days
        }
    }

    float getAverageRating(Course course) {
        def courseRatingList = CourseRating.findAllByCourse(course)
        return Holders.applicationContext.ratingUtilService.getAverageRating(courseRatingList)
    }

}
