package course

import grails.plugin.springsecurity.annotation.Secured
import grails.rest.RestfulController

@Secured(["ROLE_ADMIN", "ROLE_MANAGER", "ROLE_MENTOR", "ROLE_STUDENT"])
class CourseController extends RestfulController {
    static responseFormats = ['json', 'xml']

    CourseController() {
        super(Course)
    }

    CourseService courseService

    def myCourses() {
        respond courseService.myCourses
    }
}
