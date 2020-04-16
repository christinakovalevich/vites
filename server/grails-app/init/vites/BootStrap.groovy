package vites

import grails.gorm.transactions.Transactional

class BootStrap {

    def init = { servletContext ->
        initSecurity()
    }
    def destroy = {
    }

    @Transactional
    private initSecurity() {
        def role
    }
}
