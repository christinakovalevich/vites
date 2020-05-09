import {faUser, faUserGraduate, faUserNinja, faUserSecret, faUserTie} from "@fortawesome/free-solid-svg-icons";

export default {
    anonymous: () => _ROLES.anonymous,
    admin: () => _ROLES.admin,
    manager: () => _ROLES.manager,
    mentor: () => _ROLES.mentor,
    student: () => _ROLES.student,

    isRoleValid: role =>
        Object.values(_ROLES).includes(role),

    getUserIcon(userRole) {
        switch (userRole) {
            case this.anonymous():
                return faUser
            case this.admin():
                return faUserSecret
            case this.manager():
                return faUserTie
            case this.mentor():
                return faUserNinja
            case this.student():
                return faUserGraduate
            default: {
                return faUser
            }
        }
    }
}

const _ROLES = {
    anonymous: 'ROLE_ANONYMOUS',
    admin: 'ROLE_ADMIN',
    manager: 'ROLE_MANAGER',
    mentor: 'ROLE_MENTOR',
    student: 'ROLE_STUDENT',
}