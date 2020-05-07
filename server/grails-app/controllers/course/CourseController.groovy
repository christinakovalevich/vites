package course

import grails.plugin.springsecurity.annotation.Secured
import security.User
import student.Student

class CourseController {
    static responseFormats = ['json', 'xml']

    CourseService courseService

//    def index() { }

    @Secured(value = ['isAuthenticated()'])
    def myCourses() {
        def student = Student.findByUser(authenticatedUser as User)
        def courses = courseService.listCoursesByStudent(student.id)
        return courses
    }
}
