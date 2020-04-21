import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION, SERVER_URL} from '../../config/config';
import 'whatwg-fetch';
import ToolBar from "../ToolBar/ToolBar";

import "./App.css";
import {faHome, faLaptopCode} from "@fortawesome/free-solid-svg-icons";

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
        const {serverInfo, clientInfo, collapse} = this.state;

        const toolBarItems = [
            {id: '0', label: APP_NAME, href: '#', faIcon: faLaptopCode, classNames: ['brand']},
            {id: '1', label: 'Главная', href: '/dashboard', faIcon: faHome, classNames: ['active']},
            {id: '2', label: 'Link 1', href: '#', faIcon: null, classNames: []},
            {id: '3', label: 'Link 2', href: '#', faIcon: null, classNames: []},
            {id: '4', label: 'Link 3', href: '#', faIcon: null, classNames: []},
            {id: '5', label: 'Link 4', href: '#', faIcon: null, classNames: []},
        ]

        return (
            <div className="App">
                <ToolBar toolBarItems={toolBarItems}/>
            </div>
        )
    }
}

export default App;
