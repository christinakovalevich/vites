import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION, SERVER_URL} from '../../config/config';
import ToolBar from "../Common/ToolBar/ToolBar/ToolBar";

import Panel from "../Common/Panel/Panel";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PathService from "../../services/api/PathService";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ApiService from "../../services/api/ApiService";
import NotConnectedPage from "../Pages/NotConnectedPage/NotConnectedPage";
import Loader from "../Common/Loader/Loader";
import ToolBarService from "../../services/ToolBar/ToolBarService";

import "./App.css";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import MentorPage from "../Pages/MentorPage/MentorPage";
import RatingPage from "../Pages/RatingPage/RatingPage";
import LoginForm from "../LoginForm/LoginForm";
import Auth from "../security/auth";
import {checkResponseStatus, loginResponseHandler} from "../handlers/responseHandlers";
import {defaultErrorHandler} from "../handlers/errorHandlers";

class App extends Component {

    apiService = new ApiService();
    pathService = new PathService();
    toolBarService = new ToolBarService();

    state = {
        serverInfo: {},
        appInfo: {
            name: APP_NAME,
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
        isConnected: false,
        isAuthenticated: false,
        isShowLoader: false,
        toolBarTopItems: [],
        userDetails: {
            username: '',
            password: ''
        },
    };

    componentDidMount() {
        this.apiService.testConnection(this.setConnected, this.showLoader);
        this.setToolBarActiveItem(window.location.pathname);
        (async () => {
            if (await Auth.loggedIn()) {
                this.setState({isAuthenticated: true})
            } else {
                this.setState({isAuthenticated: false});
            }
        })();
        setInterval(() =>
            this.apiService.testConnection(this.setConnected, this.showLoader), 300000);
    }

    showLoader = () => {
        this.setState({
            isShowLoader: true
        })
    };

    hideLoader = () => {
        this.setState({
            isShowLoader: false
        })
    };

    setConnected = (value) => {
        this.hideLoader();
        this.setState({
            isConnected: value,
        })
    };

    onToolBarItemClick = (pathName) => {
        if (this.pathService.isPathExists(pathName)) {
            this.setToolBarActiveItem(pathName);
        } else {
            console.error('Unknown path:', pathName);
        }
    };

    setToolBarActiveItem = (currentPath) => {
        const currentPathName = this.pathService.getNameByPath(currentPath)
        const toolBarItems = this.toolBarService.getTopToolBarItems(this.onToolBarItemClick);

        const updatedToolBarItems =
            toolBarItems
                .map(it => it.id === currentPathName ?
                    {...it, isActive: true} : {...it, isActive: false}
                );

        this.setState({
            toolBarTopItems: updatedToolBarItems
        });
    }

    reset = () => {
        this.setState({
            userDetails: {
                username: '',
                password: ''
            },
        });
    };

    inputChangeHandler = (event) => {
        let {userDetails} = this.state;
        const target = event.target;

        userDetails[target.name] = target.value;

        this.setState({userDetails});
    };

    login = (e) => {
        console.log('login');
        e.preventDefault();

        fetch(`${SERVER_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.userDetails)
        }).then(checkResponseStatus)
            .then(response => loginResponseHandler(response, this.customLoginHandler))
            .catch(error => defaultErrorHandler(error));
    };

    customLoginHandler = () => {
        this.setState({isAuthenticated: true});
    };

    //end::handler[]


    //tag::logout[]
    logoutHandler = () => {
        Auth.logOut();
        this.reset();
    };

    render() {
        const {toolBarTopItems, isConnected, isShowLoader, appInfo, isAuthenticated, userDetails} = this.state;

        const getContentForNotConnected = () => (
            <NotConnectedPage
                title="Вы не подключены к серверу"
                onRefresh={() => this.apiService.testConnection(
                    this.setConnected,
                    this.showLoader,
                    500
                )}
            />
        )

        const getLoginFormProps = () => {
            return {
                onSubmit: this.login,
                userDetails: userDetails,
                error: null,
                inputChangeHandler: this.inputChangeHandler
            }
        }

        const loginPathName = this.pathService.login()

        const getContentForConnected = () => {
            return (
                <Switch>
                    <Route path={this.pathService.login()}
                           exact
                           render={() => <LoginForm {...getLoginFormProps()}/>}/>

                    <PrivateRoute path={this.pathService.main()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <DashboardPage title="Главная"/>
                    </PrivateRoute>

                    <PrivateRoute path={this.pathService.courses()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <CoursesPage title="Курсы"
                                     getCourses={this.apiService.getCourses}/>
                    </PrivateRoute>

                    <PrivateRoute path={this.pathService.students()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <StudentsPage title="Студенты"/>
                    </PrivateRoute>

                    <PrivateRoute path={this.pathService.mentors()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <MentorPage title="Преподаватели"/>
                    </PrivateRoute>

                    <PrivateRoute path={this.pathService.rating()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <RatingPage title="Успеваемость"/>
                    </PrivateRoute>
                </Switch>
            )
        }

        const bottomItems = this.toolBarService
            .getBottomToolBarItems(this.onToolBarItemClick)
        const toolBarBrandItemProps = this.toolBarService
            .getToolBarBrandItemProps(
                () =>
                    this.apiService.testConnection(this.setConnected, this.showLoader, 500),
                isConnected,
                appInfo.name.toUpperCase(),
            )

        return (
            <div className="App">
                <BrowserRouter>
                    <ToolBar
                        brandItemProps={toolBarBrandItemProps}
                        topItems={toolBarTopItems}
                        bottomItems={bottomItems}
                        appInfo={appInfo}
                    />
                    <Panel>
                        {
                            isShowLoader ? <Loader/> : null
                        }
                        {
                            isConnected ?
                                getContentForConnected() : getContentForNotConnected()
                        }
                    </Panel>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;