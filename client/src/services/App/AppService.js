import appIcon from "../../components/App/app-icon-white-blue.png";
import RoleService from "../Role/RoleService";
import ApiService from "../Api/ApiService";
import PathService from "../Path/PathService";
import ToolBarService from "../ToolBar/ToolBarService";
import CoursePageService from "../Course/CoursePageService";

const toolBarService = new ToolBarService();

export default {
    getToolBarProps(isConnected, isAuthenticated, userDetails, appInfo, logoutHandler, setConnected, showLoader) {
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
            statusBarProps: {
                showReloadButton: !isConnected || userDetails.role === RoleService.admin(),
                onConnectionReload: () =>
                    ApiService.testConnection(setConnected, showLoader, 500),
                appInfo,
                icon: RoleService.getUserIcon(userDetails.role)
            },
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

    getInitialUserDetails() {
        return {
            username: '',
            password: '',
            role: null
        }
    },

    sortCoursesByDate(courses) {
        return [...courses].sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)
    }
}