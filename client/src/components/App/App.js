import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION} from '../../config/config';
import ToolBar from "../Common/ToolBar/ToolBar/ToolBar";

import "./App.css";
import {
    faChalkboardTeacher,
    faCog,
    faHome,
    faLaptopCode,
    faTrophy,
    faUserAstronaut,
    faUserCircle,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import Panel from "../Common/Panel/Panel";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PathService, {PATHS_NAMES} from "../../services/api/PathService";
import MentorPage from "../Pages/MentorPage/MentorPage";
import RatingPage from "../Pages/RatingPage/RatingPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ApiService from "../../services/api/ApiService";
import NotConnectedPage from "../Pages/NotConnectedPage/NotConnectedPage";
import Loader from "../Common/Loader/Loader";
import ToolBarBrandItem from "../Common/ToolBar/ToolBarItem/ToolBarBrandItem";

class App extends Component {

    apiService = new ApiService();
    pathService = new PathService();

    state = {
        serverInfo: {},
        appInfo: {
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
        isConnectedToServer: false,
        isAuthenticated: false,
        showLoader: false,
        toolBarItems: [],
    };

    componentDidMount() {
        this.testConnection();
        this._setToolBarActiveItem(window.location.pathname);
        setInterval(this.testConnection, 300000)
    }

    onToolBarItemClick = (pathName) => {
        if (this.pathService.isPathExists(pathName)) {
            this._setToolBarActiveItem(pathName);
        } else {
            console.error('Unknown path:', pathName);
        }
    }

    testConnection = (delay) => {
        console.log('Test connection..')

        const testConnectionInternal = () => {
            const setConnected = (value) => {
                this.setState({
                    isConnectedToServer: value,
                    showLoader: false,
                })
            };

            const onSuccess = data => {
                setConnected(true);
                console.log('data:', data);
            };

            const onError = error => {
                if (error.message !== 'Failed to fetch') {
                    setConnected(true)
                }

                setConnected(false);
                console.error('error:', error)
            }

            this.apiService.testConnection(onSuccess, onError);
        }

        if (delay) {
            this.setState({
                showLoader: true
            })

            setTimeout(() => {
                testConnectionInternal()
            }, delay);

        } else {
            testConnectionInternal()
        }
    }

    render() {
        const {toolBarItems, isConnectedToServer, showLoader, appInfo} = this.state;

        const getContentForNotConnected = () => (
            <NotConnectedPage title="Вы не подключены к серверу"
                              onRefresh={() => this.testConnection(500)}/>
        )

        const getContentForConnected = () => (
            <Switch>
                <Route path={this.pathService.main()}
                       render={() => <DashboardPage title="Главная"/>}
                />

                <Route path={this.pathService.courses()}
                       render={() => <CoursesPage title="Курсы"/>}
                />

                <Route path={this.pathService.students()}
                       render={() => <StudentsPage title="Студенты"/>}
                />

                <Route path={this.pathService.mentors()}
                       render={() => <MentorPage title="Преподаватели"/>}
                />

                <Route path={this.pathService.rating()}
                       render={() => <RatingPage title="Успеваемость"/>}
                />
            </Switch>
        )

        return (
            <div className="App">
                <BrowserRouter>
                    <ToolBar
                        brandElement={this._getBrandElement(this.brandItem, () => this.testConnection(500), isConnectedToServer)}
                        topItems={toolBarItems}
                        bottomItems={this._getBottomToolBarItems()}
                        appInfo={appInfo}
                        onToolBarItemClick={this.onToolBarItemClick}
                        onConnectionIconClick={() => this.testConnection(500)}
                    />
                    <Panel>
                        {
                            showLoader ? <Loader/> : null
                        }

                        {
                            isConnectedToServer ? getContentForConnected() : getContentForNotConnected()
                        }
                    </Panel>
                </BrowserRouter>
            </div>
        )
    }

    _setToolBarActiveItem = (currentPath) => {
        const currentPathName = this.pathService.getNameByPath(currentPath)
        const toolBarItems = this._getTopToolBarItems();

        const updatedToolBarItems =
            toolBarItems
                .map(it => it.id === currentPathName ?
                    {...it, isActive: true} : {...it, isActive: false}
                );

        this.setState({
            toolBarItems: updatedToolBarItems
        });
    }

    brandItem = {
        id: 'brand',
        label: APP_NAME.toUpperCase(),
        href: this.pathService.main(),
        faIcon: faUserAstronaut,
        isActive: false
    };

    _getBrandElement = (brandItem, onConnectionIconClick, isConnected) => {
        return <ToolBarBrandItem {...brandItem} onConnectionIconClick={onConnectionIconClick}
                                 isConnected={isConnected}/>
    }

    _getTopToolBarItems = () => {
        return [
            {
                id: PATHS_NAMES.dashboard,
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

    _getBottomToolBarItems = () => {
        return [
            {
                id: PATHS_NAMES.account,
                label: 'Аккаунт',
                href: this.pathService.account(),
                faIcon: faUserCircle,
                forceShowIcon: true,
                isActive: false
            },
            {
                id: PATHS_NAMES.settings,
                label: 'Настройки',
                href: this.pathService.settings(),
                faIcon: faCog,
                forceShowIcon: true,
                isActive: false
            },
        ]
    }
}

export default App;