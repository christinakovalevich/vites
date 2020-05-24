import {
    faChalkboardTeacher,
    faCog,
    faHome,
    faLaptopCode,
    faSignOutAlt,
    faTrophy,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import PathService from "../Path/PathService";
import RoleService from "../Role/RoleService";

export default class ToolBarService {
    getToolBarLogOutItemProps = (onLogOut, label = 'Выйти') => {
        return {
            id: 'logout',
            label,
            faIcon: faSignOutAlt,
            onClick: onLogOut,
            className: 'text-danger',
        }
    };

    getTopToolBarItems = (role) => {
        const ids = {
            HOME: 'home',
            COURSES: 'courses',
            STUDENTS: 'students',
            MENTORS: 'mentors',
            RATING: 'rating',
        }

        const items = [
            {
                id: ids.HOME,
                label: 'Главная',
                href: PathService.home(),
                faIcon: faHome,
            },
            {
                id: ids.COURSES,
                label: 'Курсы',
                href: PathService.courses(),
                faIcon: faLaptopCode,
            },
            {
                id: ids.STUDENTS,
                label: 'Студенты',
                href: PathService.students(),
                faIcon: faUserGraduate,
            },
            {
                id: ids.MENTORS,
                label: 'Преподаватели',
                href: PathService.mentors(),
                faIcon: faChalkboardTeacher,
            },
            {
                id: ids.RATING,
                label: 'Учеба',
                href: PathService.rating(),
                faIcon: faTrophy,
            },
        ];

        switch (role) {
            case RoleService.admin():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.COURSES,
                    ids.STUDENTS,
                    ids.MENTORS,
                    ids.RATING
                )
            case RoleService.manager():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.COURSES,
                    ids.STUDENTS,
                    ids.MENTORS
                )
            case RoleService.mentor():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.COURSES,
                    ids.STUDENTS
                )
            case RoleService.student():
                return this.filterItemsByIds(items,
                    ids.HOME,
                    ids.COURSES,
                    ids.MENTORS,
                    ids.RATING
                )
            case RoleService.anonymous():
                return this.filterItemsByIds(items, ids.HOME)
            default:
                return []
        }
    }

    getBottomToolBarItems = (role) => {
        return role ? [
            {
                id: 'settings',
                label: 'Настройки',
                href: PathService.settings(),
                faIcon: faCog,
                forceShowIcon: true,
            },
        ] : []
    }

    filterItemsByIds = (items = [], ...ids) => {
        return items.filter(it => ids.includes(it.id))
    }
}