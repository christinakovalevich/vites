package courseWork

import course.Course
import grails.compiler.GrailsCompileStatic
import student.Student

@GrailsCompileStatic
class CourseWork {

    Course course
    String repositoryLink
    static belongsTo = [student: Student]

    static constraints = {
        repositoryLink nullable: true, blank: false
    }
}
