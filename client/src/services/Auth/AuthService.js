import {headers} from "../../utils/headers";
import {checkResponseStatus, loginResponseHandler} from "../../handlers/responseHandlers";
import * as qs from "qs";
import ApiService, {buildUri} from "../Api/ApiService";
import {defaultErrorHandler} from "../../handlers/errorHandlers";
import RoleService from "../Role/RoleService";

const {login: URI_LOGIN, refreshToken: URI_REFRESH_TOKEN} = ApiService.pathNames()

export default {

    getRole() {
        const authObject = JSON.parse(localStorage.auth);
        const anonymousRole = RoleService.anonymous()
        if (authObject && authObject.roles) {
            const {roles} = authObject;
            if (Array.isArray(roles) && roles.length > 0) {
                return RoleService.isRoleValid(roles[0]) ? roles[0] : anonymousRole;
            }
        }

        return null;
    },

    login(userDetails) {
        fetch(buildUri(URI_LOGIN), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then(checkResponseStatus)
            .then(loginResponseHandler)
            .catch(defaultErrorHandler);
    },

    writeToken(auth) {
        localStorage.auth = JSON.stringify(auth);
    },

    removeToken() {
        delete localStorage.auth;
    },

    checkIsTokenExists() {
        return !!localStorage.auth
    },

    refreshToken() {
        return fetch(buildUri(URI_REFRESH_TOKEN), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: qs.stringify({
                grant_type: 'refresh_token',
                refresh_token: JSON.parse(localStorage.auth).refresh_token
            })
        }).then(checkResponseStatus)
            .then(this.writeToken)
            .catch(() => {
                throw new Error("Unable to refresh!")
            })
    },

    checkAuthentication(setAuthenticated, setRole) {
        if (this.checkIsTokenExists()) {
            this.checkAuthEndpoint()
                .then(value => {
                    setAuthenticated(value);
                    if (value) {
                        setRole(this.getRole())
                    }
                })
                .catch(() => setAuthenticated(false))
        } else {
            setAuthenticated(false)
        }
    },

    async checkAuthEndpoint() {
        try {
            const {status} = await fetch(buildUri('/api/checkAuth'),
                {headers: headers()})
            console.log(status);
            return status >= 200 && status < 300
        } catch (e) {
            console.error(e);
            await this.refreshToken()
            return false
        }
    },
};