import {SERVER_URL} from "../../config/config";
import {headers} from "../../utils/headers";

export default {

    testConnection(setConnected, showLoader, delay = 0) {
        console.log('Test connection..')

        const testConnectionInternal = () => {
            const onSuccess = () => {
                setConnected(true);
                console.log('Connected to server.')
            };

            const onError = error => {
                setConnected(false);
                console.error('Not connected to server. Error:', error)
            }

            fetch(buildUri('/api/testConnection'), {
                headers: headers()
            }).then(onSuccess)
                .catch(onError);
        }

        if (delay > 0) {
            showLoader();

            setTimeout(() => {
                testConnectionInternal()
            }, delay);

        } else {
            testConnectionInternal()
        }
    },

    fetchCourses() {
        return _getResource(buildUri('/api/course'))
    },

    fetchMyCourses() {
        return _getResource(buildUri('/api/myCourses'))
    },

    fetchCourse(id) {
        return _getResource(buildUri(`/api/course/${id}`))
    },

    fetchMentors() {
        return _getResource(buildUri('/api/mentor'))
    },

    fetchMyMentors() {
        return _getResource(buildUri('/api/myMentors'))
    },

    fetchMentor(id) {
        return _getResource(buildUri(`/api/mentor/${id}`))
    },

    fetchStudents() {
        return _getResource(buildUri('/api/student'))
    },

    fetchMyStudents() {
        return _getResource(buildUri('/api/myStudents'))
    },

    fetchStudent(id) {
        return _getResource(buildUri(`/api/student/${id}`))
    },

    fetchCourseWorkByStudent(id) {
        const uri = '/api/courseWork/byStudent' + (id ? `/${id}` : '');
        console.log(uri)
        return _getResource(buildUri(uri))
    },

    pathNames() {
        return {
            login: '/api/login',
            refreshToken: '/oauth/access_token'
        }
    },

    addToCourse(courseId) {
        return fetch(buildUri('/api/addToCourse'), {
            method: 'post',
            headers: headers(),
            body: JSON.stringify({
                courseId
            })
        })
    },

    updateCourseWork(id, data) {
        console.log("updateCourseWork", data)
        return fetch(buildUri(`/api/courseWork/${id}`), {
            method: 'put',
            headers: headers(),
            body: JSON.stringify(data)
        })
    }

};

export const buildUri = (path, serverUrl = SERVER_URL) => {
    return `${serverUrl}${path}`
};

const _getResource = async (uri) => {
    try {
        const response = await fetch(uri, {
            headers: headers()
        });

        return response.json()
    } catch (e) {
        throw e
    }
};