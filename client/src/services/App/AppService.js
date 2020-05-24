import appIcon from "../../components/App/app-icon-white-blue.png";
import ApiService from "../Api/ApiService";
import PathService from "../Path/PathService";
import ToolBarService from "../ToolBar/ToolBarService";
import CoursePageService from "../Course/CoursePageService";
import MentorPageService from "../Mentor/MentorPageService";
import {checkResponseStatus} from "../../handlers/responseHandlers";

const toolBarService = new ToolBarService();

export default {
    getToolBarProps(isConnected, isAuthenticated, userDetails, appInfo, logoutHandler) {
        const topItems = toolBarService.getTopToolBarItems(userDetails.role)
        const bottomItems = toolBarService.getBottomToolBarItems(userDetails.role)
        const logOutItemProps = toolBarService.getToolBarLogOutItemProps(logoutHandler)

        return {
            brandItemProps: {
                appName: appInfo.name.toLowerCase(),
                appIcon: appIcon,
            },
            logOutItemProps,
            topItems,
            bottomItems,
            isAuthenticated,
            isPathActive: PathService.isPathActive
        }
    },

    getLoginFormProps(userDetails, loginHandler, inputChangeHandler) {
        return {
            userDetails: userDetails,
            error: null,
            onSubmit: loginHandler,
            inputChangeHandler: inputChangeHandler
        }
    },

    getCoursesPageFetchFunction(coursesPageMode) {
        if (CoursePageService.isModeValid(coursesPageMode)) {
            switch (coursesPageMode) {
                case CoursePageService.modes.all():
                    return ApiService.fetchCourses
                case CoursePageService.modes.my():
                    return ApiService.fetchMyCourses
                default:
                    return () => []
            }
        } else {
            console.error('Unknown coursesPageMode:', coursesPageMode)
        }
    },

    getMentorsFetchFunction(mentorsPageMode) {
        if (MentorPageService.isModeValid(mentorsPageMode)) {
            switch (mentorsPageMode) {
                case MentorPageService.modes.all():
                    return ApiService.fetchMentors
                case MentorPageService.modes.my():
                    return ApiService.fetchMyMentors
                default:
                    return () => []
            }
        } else {
            console.error('Unknown mentorsPageMode:', mentorsPageMode)
        }
    },

    getStudentsFetchFunction(studentsPageMode) {
        if (MentorPageService.isModeValid(studentsPageMode)) {
            switch (studentsPageMode) {
                case MentorPageService.modes.all():
                    return ApiService.fetchStudents
                case MentorPageService.modes.my():
                    return ApiService.fetchMyStudents
                default:
                    return () => []
            }
        } else {
            console.error('Unknown studentsPageMode:', studentsPageMode)
        }
    },

    getInitialUserDetails() {
        return {
            username: '',
            password: '',
            role: null
        }
    },

    addToCourse(courseId) {
        if (window.confirm('Вы действительно хотите записаться на выбранный курс?')) {
            return ApiService.addToCourse(courseId)
                .then(checkResponseStatus)
        }
    }
}