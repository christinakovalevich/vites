import {
    faChalkboardTeacher,
    faCog,
    faHome,
    faLaptopCode, faSignOutAlt,
    faTrophy,
    faUserAstronaut,
    faUserCircle,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import PathService, {PATHS_NAMES} from "../api/PathService";

export default class ToolBarService {

    pathService = new PathService();

    getToolBarBrandItemProps = (onConnectionIconClick, isConnected, appName) => {
        return {
            id: 'brand',
            label: appName,
            faIcon: faUserAstronaut,
            onConnectionIconClick: onConnectionIconClick,
            isConnected: isConnected,
        }
    };

    getToolBarLogOutItemProps = (onLogOut, label='Выйти') => {
        return {
            id: 'logOut',
            label,
            faIcon: faSignOutAlt,
            onClick: onLogOut,
            className: 'text-danger',
        }
    };

    getTopToolBarItems = (onToolBarItemClick) => {
        return [
            {
                id: PATHS_NAMES.dashboard,
                label: 'Главная',
                href: this.pathService.main(),
                faIcon: faHome,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.main())
            },
            {
                id: PATHS_NAMES.courses,
                label: 'Курсы',
                href: this.pathService.courses(),
                faIcon: faLaptopCode,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.courses())
            },
            {
                id: PATHS_NAMES.students,
                label: 'Студенты',
                href: this.pathService.students(),
                faIcon: faUserGraduate,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.students())
            },
            {
                id: PATHS_NAMES.mentors,
                label: 'Преподаватели',
                href: this.pathService.mentors(),
                faIcon: faChalkboardTeacher,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.mentors())
            },
            {
                id: PATHS_NAMES.rating,
                label: 'Успеваемость',
                href: this.pathService.rating(),
                faIcon: faTrophy,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.rating())
            },
        ]
    }

    getBottomToolBarItems = (onToolBarItemClick) => {
        return [
            {
                id: PATHS_NAMES.account,
                label: 'Аккаунт',
                href: this.pathService.account(),
                faIcon: faUserCircle,
                forceShowIcon: true,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.account()),
            },
            {
                id: PATHS_NAMES.settings,
                label: 'Настройки',
                href: this.pathService.settings(),
                faIcon: faCog,
                forceShowIcon: true,
                isActive: false,
                onClick: () => onToolBarItemClick(this.pathService.settings()),
            },
        ]
    }
}