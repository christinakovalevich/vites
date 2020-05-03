import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION, SERVER_URL} from '../../config/config';
import 'whatwg-fetch';
import ToolBar from "../ToolBar/ToolBar";

import "./App.css";
import {
    faChalkboardTeacher,
    faHome,
    faLaptopCode,
    faTrophy,
    faUserAstronaut,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import Panel from "../Panel/Panel";

class App extends Component {

    state = {
        serverInfo: {},
        clientInfo: {
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
    };

    componentDidMount() {
        fetch(SERVER_URL + '/application')
            .then(r => r.json())
            .then(json => this.setState({serverInfo: json}))
            .catch(error => console.error('Error connecting to server: ' + error));

    }

    render() {
        const {serverInfo, clientInfo} = this.state;

        const toolBarItems = _getToolBarItems();

        return (
            <div className="App">
                <ToolBar toolBarItems={toolBarItems}/>
                <Panel title="Главная"/>
            </div>
        )
    }
}

export default App;

const _getToolBarItems = () => {
    return [
        {
            id: 'brand',
            label: APP_NAME.toUpperCase(),
            href: '#',
            faIcon: faUserAstronaut,
            isActive: false
        },
        {
            id: 'dashboard',
            label: 'Главная',
            href: '/dashboard',
            faIcon: faHome,
            isActive: false
        },
        {
            id: 'courses',
            label: 'Курсы',
            href: '/courses',
            faIcon: faLaptopCode,
            isActive: true
        },
        {
            id: 'students',
            label: 'Студенты',
            href: '/students',
            faIcon: faUserGraduate,
            isActive: false
        },
        {
            id: 'mentors',
            label: 'Преподаватели',
            href: '/mentors',
            faIcon: faChalkboardTeacher,
            isActive: false
        },
        {
            id: 'rating',
            label: 'Успеваемость',
            href: '/rating',
            faIcon: faTrophy,
            isActive: false
        },
    ]
}