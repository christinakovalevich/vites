import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION, SERVER_URL} from '../../config/config';
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
import StudentsPanel from "../Student/StudentsPanel/StudentsPanel";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PathService, {PATHS_NAMES} from "../../services/api/PathService";
import MentorPanel from "../Mentor/MentorPanel/MentorPanel";
import RatingPanel from "../Rating/RatingPanel/RatingPanel";
import CoursesPanel from "../Course/CoursesPanel/CoursesPanel";

class App extends Component {

    pathService = new PathService();

    state = {
        serverInfo: {},
        clientInfo: {
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },

        toolBarItems: [],
    };

    componentDidMount() {
        fetch(SERVER_URL + '/application')
            .then(r => r.json())
            .then(json => this.setState({serverInfo: json}))
            .catch(error => console.error('Error connecting to server: ' + error));

        this._setToolBarActiveItem(window.location.pathname);
    }

    onToolBarItemClick = (pathName) => {
        if (this.pathService.isPathExists(pathName)) {
            this._setToolBarActiveItem(pathName);
        } else {
            console.error('Unknown path:', pathName);
        }
    }

    render() {
        const {toolBarItems} = this.state;

        return (
            <div className="App">
                <BrowserRouter>
                    <ToolBar toolBarItems={toolBarItems}
                             onToolBarItemClick={this.onToolBarItemClick}/>
                    <Switch>
                        <Route path={this.pathService.main()} exact component={Panel}/>

                        <Route
                            path={this.pathService.courses()}
                            render={() => <CoursesPanel title="Курсы"/>}
                        />

                        <Route path={this.pathService.students()}
                               render={() => <StudentsPanel title="Студенты"/>}
                        />

                        <Route path={this.pathService.mentors()}
                               render={() => <MentorPanel title="Преподаватели"/>}
                        />

                        <Route path={this.pathService.rating()}
                               render={() => <RatingPanel title="Успеваемость"/>}
                        />

                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

    _setToolBarActiveItem = (currentPath) => {
        const currentPathName = this.pathService.getNameByPath(currentPath)
        const toolBarItems = this._getToolBarItems();

        const updatedToolBarItems =
            toolBarItems
                .map(it => it.id === currentPathName ?
                    {...it, isActive: true} : {...it, isActive: false}
                );

        this.setState({
            toolBarItems: updatedToolBarItems
        });
    }

    _getToolBarItems = () => {
        return [
            {
                id: 'brand',
                label: APP_NAME.toUpperCase(),
                href: '#',
                faIcon: faUserAstronaut,
                isActive: false
            },
            {
                id: PATHS_NAMES.main,
                label: 'Главная',
                href: this.pathService.main(),
                faIcon: faHome,
                isActive: false
            },
            {
                id: PATHS_NAMES.courses,
                label: 'Курсы',
                href: this.pathService.courses(),
                faIcon: faLaptopCode,
                isActive: false
            },
            {
                id: PATHS_NAMES.students,
                label: 'Студенты',
                href: this.pathService.students(),
                faIcon: faUserGraduate,
                isActive: false
            },
            {
                id: PATHS_NAMES.mentors,
                label: 'Преподаватели',
                href: this.pathService.mentors(),
                faIcon: faChalkboardTeacher,
                isActive: false
            },
            {
                id: PATHS_NAMES.rating,
                label: 'Успеваемость',
                href: this.pathService.rating(),
                faIcon: faTrophy,
                isActive: false
            },
        ]
    }
}

export default App;