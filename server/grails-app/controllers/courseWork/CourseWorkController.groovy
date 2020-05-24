package courseWork

import course.Course
import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController
import student.Student
import student.StudentService

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class CourseWorkController extends RestfulController {
    static responseFormats = ['json', 'xml']

    CourseWorkController() {
        super(CourseWork)
    }

    StudentService studentService

    def indexByCurrentStudent() {
        respond CourseWork
                .findAllByStudent(studentService.authenticatedStudent)
    }

    def indexByStudent() {
        respond CourseWork
                .findAllByStudent(Student.read(params.studentId))
    }

    def indexByCourse() {
        respond CourseWork
                .findAllByCourse(Course.read(params.courseId))
    }
}
