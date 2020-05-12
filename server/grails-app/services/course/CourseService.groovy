package course

import grails.gorm.services.Service
import grails.util.Holders
import groovy.time.TimeCategory
import rating.CourseRating

interface ICourseService {
    Course get(Serializable id)

    List<Course> list()

    Number count()

    Course save(Course course)

    void delete(Serializable id)
}

@Service(Course)
abstract class CourseService implements ICourseService {

    Set<Course> getMyCourses() {
        def myCourses = [] as Set<Course>
        def currentStudent = Holders.applicationContext.studentService.authenticatedStudent

        if (currentStudent && currentStudent.courses) {
            myCourses.addAll(currentStudent.courses)
        } else {
            def currentMentor = Holders.applicationContext.mentorService.authenticatedMentor

            if (currentMentor && currentMentor.courses) {
                myCourses.addAll(currentMentor.courses)
            }
        }

        return myCourses
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
