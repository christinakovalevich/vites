package course

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import net.minidev.json.JSONObject
import org.springframework.http.HttpStatus
import student.StudentService

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class CourseController extends RestfulController {
    static responseFormats = ['json', 'xml']

    CourseController() {
        super(Course)
    }

    CourseService courseService
    StudentService studentService

    def myCourses() {
        respond courseService.myCourses
    }

    def addToCourse() {
        def json = request.JSON as JSONObject
        def currentStudent = studentService.authenticatedStudent
        def course = courseService.get(json.courseId as Serializable)

        if (course && currentStudent) {
            def savedCourse = courseService.addToStudents(course, currentStudent)
            if (savedCourse) {
                respond(savedCourse)
                return
            }
        }

        render(status: HttpStatus.BAD_REQUEST)
    }
}
