class PathService {

    _pathData = {};

    constructor() {
        this._loadPathData();
    }

    isPathExists = (path) => {
        return Object.values(this._pathData).some(it => it.path === path)
    }

    isNameExists = (name) => {
        if (this._pathData.hasOwnProperty(name)) {
            return true;
        }

        console.error('Unknown path name:', name)
    }

    getPathByName = (name) => {
        return this.isNameExists(name) ? this._pathData[name].path : null
    }

    getNameByPath = (path) => {
        return this.isPathExists(path) ?
            Object.values(this._pathData).find(it => it.path === path).name : null;
    }

    _loadPathData = () => {
        this._pathData = {
            "dashboard": {
                path: "/dashboard",
                name: PATHS_NAMES.dashboard,
            },
            "courses": {
                path: "/courses/",
                name: PATHS_NAMES.courses,
            },
            "students": {
                path: "/students/",
                name: PATHS_NAMES.students,
            },
            "mentors": {
                path: "/mentors/",
                name: PATHS_NAMES.mentors,
            },
            "rating": {
                path: "/rating/",
                name: PATHS_NAMES.rating,
            },
            "settings": {
                path: "/settings",
                name: PATHS_NAMES.settings
            },
            "account": {
                path: "/account",
                name: PATHS_NAMES.account
            },
            "login": {
                path: "/login",
                name: PATHS_NAMES.login
            }
        }
    }

    main = () =>
        this.getPathByName(PATHS_NAMES.dashboard)

    courses = () =>
        this.getPathByName(PATHS_NAMES.courses)

    students = () =>
        this.getPathByName(PATHS_NAMES.students)

    mentors = () =>
        this.getPathByName(PATHS_NAMES.mentors)

    rating = () =>
        this.getPathByName(PATHS_NAMES.rating)

    settings = () =>
        this.getPathByName(PATHS_NAMES.settings)

    account = () =>
        this.getPathByName(PATHS_NAMES.account)

    login = () =>
        this.getPathByName(PATHS_NAMES.login)
}

export default PathService

export const PATHS_NAMES = {
    dashboard: "dashboard",
    courses: "courses",
    students: "students",
    mentors: "mentors",
    rating: "rating",
    settings: "settings",
    account: "account",
    login: "login",
}