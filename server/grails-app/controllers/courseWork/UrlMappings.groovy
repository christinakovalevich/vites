package courseWork

class UrlMappings {

    static mappings = {
        delete "/$controller/$id(.$format)?"(action: "delete")
        get "/$controller(.$format)?"(action: "index")
        get "/$controller/$id(.$format)?"(action: "show")
        post "/$controller(.$format)?"(action: "save")
        put "/$controller/$id(.$format)?"(action: "update")
        patch "/$controller/$id(.$format)?"(action: "patch")

        delete "/api/$controller/$id(.$format)?"(action: "delete")
        get "/api/$controller(.$format)?"(action: "index")
        get "/api/$controller/$id(.$format)?"(action: "show")
        post "/api/$controller(.$format)?"(action: "save")
        put "/api/$controller/$id(.$format)?"(action: "update")
        patch "/api/$controller/$id(.$format)?"(action: "patch")

        "/"(controller: 'application', action: 'index')
        "500"(view: '/error')
        "404"(view: '/notFound')

        "/api/addToCourse"(controller: "course", action: "addToCourse")
        "/api/myCourses"(controller: "course", action: "myCourses")
        "/api/myMentors"(controller: "mentor", action: "myMentors")
        "/api/myStudents"(controller: "student", action: "myStudents")
        "/api/courseWork/byStudent"(controller: "courseWork", action: "indexByCurrentStudent")
        "/api/courseWork/byStudent/$studentId(.$format)?"(controller: "courseWork", action: "indexByStudent")
        "/api/courseWork/byCourse/$courseId(.$format)?"(controller: "courseWork", action: "indexByCourse")

        "/api/testConnection"(controller: 'application', action: 'testConnection')
        "/api/checkAuth"(controller: 'application', action: 'checkIsAuthenticated')
    }
}
