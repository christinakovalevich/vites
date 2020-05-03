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
            "main": {
                path: "/",
                name: "main",
            },
            "courses": {
                path: "/courses/",
                name: "courses",
            },
            "students": {
                path: "/students/",
                name: "students",
            },
            "mentors": {
                path: "/mentors/",
                name: "mentors",
            },
            "rating": {
                path: "/rating/",
                name: "rating",
            }
        }
    }

    main = () => {
        return this.getPathByName(PATHS_NAMES.main)
    }

    courses = () => {
        return this.getPathByName(PATHS_NAMES.courses)
    }

    students = () => {
        return this.getPathByName(PATHS_NAMES.students)
    }

    mentors = () => {
        return this.getPathByName(PATHS_NAMES.mentors)
    }

    rating = () => {
        return this.getPathByName(PATHS_NAMES.rating)
    }

}

export default PathService

export const PATHS_NAMES = {
    main: "main",
    courses: "courses",
    students: "students",
    mentors: "mentors",
    rating: "rating"
}