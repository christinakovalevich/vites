package vites

import grails.converters.JSON
import grails.core.GrailsApplication
import grails.plugin.springsecurity.annotation.Secured
import grails.plugins.GrailsPluginManager
import grails.plugins.PluginManagerAware
import org.springframework.http.HttpStatus

class ApplicationController implements PluginManagerAware {

    GrailsApplication grailsApplication
    GrailsPluginManager pluginManager

    def index() {
        [grailsApplication: grailsApplication, pluginManager: pluginManager]
    }

    @Secured(value = ['permitAll'])
    def testConnection() {
        render status: HttpStatus.OK
    }

    @Secured(value = ['isAuthenticated()'])
    def checkIsAuthenticated() {
        return [status: HttpStatus.OK] as JSON
    }
}
