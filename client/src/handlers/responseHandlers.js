import Auth from '../services/Auth/AuthService';
import PathService from "../services/Path/PathService";

export const checkResponseStatus = response => {
    if (response.status >= 200 && response.status < 300) {
        return response.json()
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const loginResponseHandler = response => {
    Auth.writeToken(response);
    window.location.pathname = PathService.home()
};