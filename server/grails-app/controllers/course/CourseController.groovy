package course

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import org.springframework.http.HttpStatus
import security.User
import student.Student

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class CourseController extends RestfulController<Course> {
    static responseFormats = ['json', 'xml']

    CourseService courseService

    CourseController() {
        super(Course)
    }

    def index() {
        respond Course.list()
    }

    def show(Course course) {
        if (course == null) {
            render status: HttpStatus.NOT_FOUND
        }
        respond course
    }

    def myCourses() {
        def student = Student.findByUser(authenticatedUser as User)
        def courseList = student?.courses ?: []
        respond courseList
    }
}
