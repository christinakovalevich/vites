package vites

import enums.security.RoleTypes
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
        def adminRole = new Role(authority: RoleTypes.ROLE_ADMIN.value).save()
        def adminUser = new User(username: 'admin', password: 'admin').save()
        UserRole.create(adminUser, adminRole)

        def managerRole = new Role(authority: RoleTypes.ROLE_MANAGER.value).save()
        def managerUser = new User(username: 'manager', password: 'manager').save()
        UserRole.create(managerUser, managerRole)
    }
}
