import {
    faChalkboardTeacher,
    faCog,
    faHome,
    faLaptopCode,
    faSignOutAlt,
    faTrophy,
    faUserAstronaut,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import PathService from "../api/PathService";

export default class ToolBarService {
    getToolBarBrandItemProps = (onConnectionIconClick, isConnected, appName) => {
        return {
            id: 'brand',
            label: appName,
            faIcon: faUserAstronaut,
            onConnectionIconClick: onConnectionIconClick,
            isConnected: isConnected,
        }
    };

    getToolBarLogOutItemProps = (onLogOut, label = 'Выйти') => {
        return {
            id: 'logout',
            label,
            faIcon: faSignOutAlt,
            onClick: onLogOut,
            className: 'text-danger',
        }
    };

    getTopToolBarItems = () => {
        return [
            {
                id: 'home',
                label: 'Главная',
                href: PathService.home(),
                faIcon: faHome,
            },
            {
                id: 'courses',
                label: 'Курсы',
                href: PathService.courses(),
                faIcon: faLaptopCode,
            },
            {
                id: 'students',
                label: 'Студенты',
                href: PathService.students(),
                faIcon: faUserGraduate,
            },
            {
                id: 'mentors',
                label: 'Преподаватели',
                href: PathService.mentors(),
                faIcon: faChalkboardTeacher,
            },
            {
                id: 'rating',
                label: 'Успеваемость',
                href: PathService.rating(),
                faIcon: faTrophy,
            },
        ]
    }

    getBottomToolBarItems = () => {
        return [
            {
                id: 'settings',
                label: 'Настройки',
                href: PathService.settings(),
                faIcon: faCog,
                forceShowIcon: true,
            },
        ]
    }
}