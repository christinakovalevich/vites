const _PATH_DATA = {
    HOME: {
        path: "/",
    },
    COURSES: {
        path: "/courses/",
    },
    STUDENTS: {
        path: "/students/",
    },
    MENTORS: {
        path: "/mentors/",
    },
    RATING: {
        path: "/rating/",
    },
    SETTINGS: {
        path: "/settings",
    },
}

const _isPathExists = path =>
    Object.values(_PATH_DATA).some(it => it.path === path)


export default {
    home: () => _PATH_DATA.HOME.path,
    courses: () => _PATH_DATA.COURSES.path,
    students: () => _PATH_DATA.STUDENTS.path,
    mentors: () => _PATH_DATA.MENTORS.path,
    rating: () => _PATH_DATA.RATING.path,
    settings: () => _PATH_DATA.SETTINGS.path,

    isPathExists: _isPathExists,

    isPathActive: (targetPath, activePath, rootPath = '/') => {
        const match = activePath.match(targetPath)
        return match && (activePath === rootPath ? true : match[0] !== rootPath)
    },
}