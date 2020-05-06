import {headers} from "../services/api/Headers";
import {checkResponseStatus} from "../handlers/responseHandlers";
import * as qs from "qs";
import ApiService from "../services/api/ApiService";

export default {

    writeToken(auth) {
        localStorage.auth = JSON.stringify(auth);
    },

    removeToken() {
        delete localStorage.auth;
    },

    refreshToken() {
        return fetch(ApiService.buildUri('/oauth/access_token'), {
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

    isLoggedIn() {
        console.log('Check is logged in..')
        return localStorage.auth &&
            fetch(ApiService.buildUri('/api/course'),
                {headers: headers()})
                .then(checkResponseStatus)
                .then(() => true)
                .catch(this.refreshToken)
                .catch(() => false);
    },

    fetchWrapper() {
        return fetch()
    }
};