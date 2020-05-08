import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION} from '../../config/config';
import ToolBar from "../Common/ToolBar/ToolBar/ToolBar";
import Panel from "../Common/Panel/Panel";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ApiService from "../../services/api/ApiService";
import NotConnectedPage from "../Pages/NotConnectedPage/NotConnectedPage";
import Loader from "../Common/Loader/Loader";
import ToolBarService from "../../services/ToolBar/ToolBarService";
import RouteWrapper from "../RouteWrapper/RouteWrapper";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import MentorPage from "../Pages/MentorPage/MentorPage";
import RatingPage from "../Pages/RatingPage/RatingPage";
import LoginForm from "../LoginForm/LoginForm";
import Auth from "../../security/auth";

import "./App.css";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import CoursePageService from "../../services/Course/CoursePageService";
import PathService from "../../services/api/PathService";

class App extends Component {

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
        userDetails: {
            username: '',
            password: ''
        },
        coursesPageMode: CoursePageService.modeAll(),
    };

    componentDidMount() {
        ApiService.testConnection(this.setConnected, this.showLoader);
        Auth.checkAuthentication(this.setAuthenticated);

        setInterval(() =>
            ApiService.testConnection(this.setConnected, this.showLoader), 300000);
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

    setConnected = (isConnected) => {
        this.hideLoader();
        this.setState({
            isConnected
        })
    };

    setAuthenticated = (isAuthenticated) => {
        this.setState({
            isAuthenticated
        })
    }

    inputChangeHandler = (event) => {
        let {userDetails} = this.state;
        const target = event.target;

        userDetails[target.name] = target.value;

        this.setState({userDetails});
    };

    loginHandler = (e) => {
        e.preventDefault();
        Auth.login(this.state.userDetails);
    };

    logoutHandler = () => {
        Auth.removeToken();
        this.setState({
            userDetails: {
                username: '',
                password: ''
            },
        });
        window.location.pathname = PathService.home()
    };

    onCoursesPageModeChange = (coursesPageMode) => {
        if (CoursePageService.isModeValid(coursesPageMode)) {
            this.setState({
                coursesPageMode
            })
        } else {
            console.error('Unknown coursesPageMode:', coursesPageMode)
        }
    };

    getCoursesPageFetchFunction = coursesPageMode => {
        if (CoursePageService.isModeValid(coursesPageMode)) {
            switch (coursesPageMode) {
                case CoursePageService.modeAll():
                    return ApiService.fetchCourses
                case CoursePageService.modeMy():
                    return ApiService.fetchMyCourses
                default:
                    return () => []
            }
        } else {
            console.error('Unknown coursesPageMode:', coursesPageMode)
        }
    }

    render() {
        const {
            isConnected,
            isShowLoader,
            appInfo,
            isAuthenticated,
            userDetails,
            coursesPageMode
        } = this.state;

        const getContentForNotConnected = () => (
            <NotConnectedPage
                title="Вы не подключены к серверу"
                onRefresh={() => ApiService.testConnection(
                    this.setConnected,
                    this.showLoader,
                    500
                )}
            />
        )

        const getLoginFormProps = () => {
            return {
                onSubmit: this.loginHandler,
                userDetails: userDetails,
                error: null,
                inputChangeHandler: this.inputChangeHandler
            }
        }

        const loginPathName = '';

        const getContentForConnected = () => {
            if (!isAuthenticated) {
                return <LoginForm {...getLoginFormProps()}/>
            }
            return (
                <Switch>
                    <Route path={'/login'}
                           exact
                           render={() => <LoginForm {...getLoginFormProps()}/>}/>

                    <RouteWrapper path={PathService.home()}
                                  exact
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <DashboardPage title="Главная"/>
                    </RouteWrapper>

                    <RouteWrapper path={PathService.courses()}
                                  exact
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <CoursesPage title="Курсы и стажировки"
                                     sort={this.sortCoursesByDate}
                                     modes={{
                                         all: CoursePageService.modeAll,
                                         my: CoursePageService.modeMy,
                                     }}
                                     isActiveMode={currentMode =>
                                         CoursePageService.isActiveMode(coursesPageMode, currentMode)}
                                     onModeChange={this.onCoursesPageModeChange}
                                     getLabelForMode={CoursePageService.getLabelForMode}
                                     getCourses={this.getCoursesPageFetchFunction(coursesPageMode)}/>
                    </RouteWrapper>

                    <RouteWrapper path={PathService.courses() + ':id'}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <CourseDetails title="Курс"
                                       getCourse={ApiService.fetchCourse}/>
                    </RouteWrapper>

                    <RouteWrapper path={PathService.students()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <StudentsPage title="Студенты"/>
                    </RouteWrapper>

                    <RouteWrapper path={PathService.mentors()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <MentorPage title="Преподаватели"/>
                    </RouteWrapper>

                    <RouteWrapper path={PathService.rating()}
                                  isAuthenticated={isAuthenticated}
                                  loginPathname={loginPathName}>
                        <RatingPage title="Успеваемость"/>
                    </RouteWrapper>
                </Switch>
            )
        }

        return (
            <div className="App">
                <BrowserRouter>
                    <ToolBar {...this.getToolBarProps(isConnected, appInfo, isAuthenticated)}/>
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

    getToolBarProps = (isConnected, appInfo, isAuthenticated) => {
        const topItems = this.toolBarService.getTopToolBarItems()
        const bottomItems = this.toolBarService.getBottomToolBarItems()
        const brandItemProps = this.toolBarService
            .getToolBarBrandItemProps(
                () =>
                    ApiService.testConnection(this.setConnected, this.showLoader, 500),
                isConnected,
                appInfo.name.toUpperCase(),
            )

        const logOutItemProps = this.toolBarService.getToolBarLogOutItemProps(this.logoutHandler)

        return {
            brandItemProps,
            logOutItemProps,
            topItems,
            bottomItems,
            appInfo,
            isAuthenticated,
        }
    }

    sortCoursesByDate = courses => {
        return [...courses].sort((a, b) => (a.startDate > b.startDate) ? 1 : -1)
    }
}

export default App;