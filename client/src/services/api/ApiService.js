import {SERVER_URL} from "../../config/config";
import {headers} from "./Headers";
import {methods} from "./Methods";

export default class ApiService {

    _buildUri(serverUrl, path) {
        return `${SERVER_URL}${path}`
    };

    async _getResource(uri) {
        const response = await fetch(uri, {
            headers: headers()
        });
        return response.json()
    };

    async _deleteResource(uri) {
        return await fetch(uri, {
            headers: headers(),
            method: methods().DELETE
        })
    };

    async _postResource(uri, data) {
        return await fetch()
    };

    fetchServerInfo() {
        return this._getResource(this._buildUri(SERVER_URL, '/api/application'))
    };

    hasErrors(data) {
        return !!(data.error && data.message);
    };

};