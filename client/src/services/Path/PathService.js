import RoleService from "../Role/RoleService";

const _PATH_DATA = {
    HOME: {
        path: "/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
            RoleService.anonymous(),
        ],
    },
    COURSES: {
        path: "/courses/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
        ],
    },
    COURSE: {
        path: "/courses/:id",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
        ],
    },
    STUDENTS: {
        path: "/students/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
        ],
    },
    MENTORS: {
        path: "/mentors/",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.student(),
            RoleService.mentor(),
        ],
    },
    RATING: {
        path: "/rating/",
        roles: [
            RoleService.admin(),
            RoleService.student(),
        ],
    },
    SETTINGS: {
        path: "/settings",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
        ],
    },
    LOGIN: {
        path: "/login",
        roles: [
            RoleService.admin(),
            RoleService.manager(),
            RoleService.mentor(),
            RoleService.student(),
            RoleService.anonymous(),
        ],
    },
}

const _isPathExists = path =>
    Object.values(_PATH_DATA).some(it => it.path === path)


export default {
    home: () => _PATH_DATA.HOME.path,
    courses: () => _PATH_DATA.COURSES.path,
    course: () => _PATH_DATA.COURSE.path,
    students: () => _PATH_DATA.STUDENTS.path,
    mentors: () => _PATH_DATA.MENTORS.path,
    rating: () => _PATH_DATA.RATING.path,
    settings: () => _PATH_DATA.SETTINGS.path,
    login: () => _PATH_DATA.LOGIN.path,

    roles: () => {
        return {
            home: () => _PATH_DATA.HOME.roles,
            courses: () => _PATH_DATA.COURSES.roles,
            course: () => _PATH_DATA.COURSE.roles,
            students: () => _PATH_DATA.STUDENTS.roles,
            mentors: () => _PATH_DATA.MENTORS.roles,
            rating: () => _PATH_DATA.RATING.roles,
            settings: () => _PATH_DATA.SETTINGS.roles,
            login: () => _PATH_DATA.LOGIN.roles,
        }
    },

    isPathExists: _isPathExists,

    isPathActive: (targetPath, activePath, rootPath = '/') => {
        const match = activePath.match(targetPath)
        return match && (activePath === rootPath ? true : match[0] !== rootPath)
    },
}