export default {
    anonymous: () => _ROLES.anonymous,
    admin: () => _ROLES.admin,
    manager: () => _ROLES.manager,
    mentor: () => _ROLES.mentor,
    student: () => _ROLES.student,

    isRoleValid: role =>
        Object.values(_ROLES).includes(role)
}

const _ROLES = {
    anonymous: 'ROLE_ANONYMOUS',
    admin: 'ROLE_ADMIN',
    manager: 'ROLE_MANAGER',
    mentor: 'ROLE_MENTOR',
    student: 'ROLE_STUDENT',
}