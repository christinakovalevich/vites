package vites

import enums.security.RoleType
import enums.security.UserType
import grails.gorm.transactions.Transactional
import security.Role
import security.User
import security.UserRole

class BootStrap {

    def init = { servletContext ->
        initSecurity()
    }
    def destroy = {
    }

    @Transactional
    private initSecurity() {
        log.debug 'Start init security'

        def adminRole = new Role(authority: RoleType.ROLE_ADMIN.value).save(FAIL_ON_ERROR)

        def adminUser = new User(
                username: 'admin',
                password: 'admin',
                userType: UserType.ADMIN
        ).save(FAIL_ON_ERROR)

        UserRole.create(adminUser, adminRole)

        def managerRole = new Role(authority: RoleType.ROLE_MANAGER.value).save(FAIL_ON_ERROR)

        def managerUser = new User(
                username: 'manager',
                password: 'manager',
                userType: UserType.MANAGER
        ).save(FAIL_ON_ERROR)

        UserRole.create(managerUser, managerRole)

        log.debug 'Finish init security'
    }

    private final static FAIL_ON_ERROR = [failOnError: true]
}
