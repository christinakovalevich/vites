import {SERVER_URL} from "../../config/config";
import {headers} from "./Headers";
import Auth from "../../security/auth";

export default {

    buildUri(path, serverUrl = SERVER_URL) {
        return `${serverUrl}${path}`
    },

    async _getResource(uri) {
        try {
            const response = await fetch(uri, {
                headers: headers()
            });

            return response.json()
        } catch (e) {
            throw e
        }
    },

    _testConnection(onSuccess, onError) {
        return fetch(this.buildUri('/api/testConnection'), {
            headers: headers()
        });
    },

    fetchServerInfo() {
        return this._getResource(this.buildUri('/api/application'))
    },

    hasErrors(data) {
        return !!(data.error && data.message);
    },

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

            this._testConnection(onSuccess, onError)
                .then(onSuccess)
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

    checkAuthentication(setAuthenticated) {
        (async () => {
            if (await Auth.isLoggedIn()) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
        })();
    },

    getCourses() {
        return [
            {
                id: 0,
                name: 'Java Students Lab',
                technologies: [
                    {
                        id: 0,
                        name: 'Java'
                    }
                ],
                difficulty: 4,
                popularity: 4.5,
                mentors: [
                    {
                        id: 1,
                        name: 'Мокритский Петр Алексеевич',
                    }
                ],
                totalPlacesCount: 20,
                availablePlacesCount: 10,
                studentsCount: 10,
                startDate: '18.04.2020',
                endDate: '26.08.2020',
            },

            {
                id: 1,
                name: 'JavaScript Students Lab',
                technologies: [
                    {
                        id: 0,
                        name: 'JavaScript'
                    }
                ],
                difficulty: 3.33,
                popularity: 5,
                mentors: [
                    {
                        id: 1,
                        name: 'Мокритский Петр Алексеевич',
                    }
                ],
                totalPlacesCount: 20,
                availablePlacesCount: 3,
                studentsCount: 17,
                startDate: '12.03.2020',
                endDate: '24.06.2020',
            },

            {
                id: 2,
                name: 'Ruby Students Lab',
                technologies: [
                    {
                        id: 0,
                        name: 'Ruby'
                    }
                ],
                difficulty: 4.3,
                popularity: 2.3,
                mentors: [
                    {
                        id: 1,
                        name: 'Мокритский Петр Алексеевич',
                    }
                ],
                totalPlacesCount: 20,
                availablePlacesCount: 10,
                studentsCount: 5,
                startDate: '14.06.2020',
                endDate: '28.07.2020',
            },

            {
                id: 3,
                name: 'Node.js Students Lab',
                technologies: [
                    {
                        id: 0,
                        name: 'JavaScript'
                    }
                ],
                difficulty: 4.56,
                popularity: 4.34,
                mentors: [
                    {
                        id: 1,
                        name: 'Мокритский Петр Алексеевич',
                    }
                ],
                totalPlacesCount: 20,
                availablePlacesCount: 5,
                studentsCount: 15,
                startDate: '15.02.2020',
                endDate: '30.04.2020',
            },

            {
                id: 4,
                name: 'Python Students Lab',
                technologies: [
                    {
                        id: 5,
                        name: 'Python'
                    }
                ],
                difficulty: 3.18,
                popularity: 4.98,
                mentors: [
                    {
                        id: 1,
                        name: 'Мокритский Петр Алексеевич',
                    }
                ],
                totalPlacesCount: 20,
                availablePlacesCount: 10,
                studentsCount: 5,
                startDate: '01.01.2020',
                endDate: '12.03.2030',
            },
        ]
    }

};