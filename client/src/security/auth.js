import {SERVER_URL} from "../config/config";
import {headers} from "../services/api/Headers";
import {checkResponseStatus} from "../handlers/responseHandlers";
import * as qs from "qs";
import ApiService from "../services/api/ApiService";

export default {

    logIn(auth) {
        localStorage.auth = JSON.stringify(auth);
    },

    logOut() {
        delete localStorage.auth;
    },

    refreshToken() {
        return fetch(
            `${SERVER_URL}/oauth/access_token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: qs.stringify({
                    grant_type: 'refresh_token',
                    refresh_token: JSON.parse(localStorage.auth).refresh_token
                })
            })
            .then(checkResponseStatus)
            .then((a) => localStorage.auth = JSON.stringify(a))
            .catch(() => {
                throw new Error("Unable to refresh!")
            })
    },

    isLoggedIn() {
        console.log('Check is logged in..')
        return localStorage.auth &&
            fetch(new ApiService().buildUri('/api/course'),
                {headers: headers()})
                .then(checkResponseStatus)
                .then(() => {
                    console.log('Logged in.')
                    return true
                })
                .catch(this.refreshToken)
                .catch(() => {
                    console.warn('Not logged in.')
                    return false
                });
    }
};