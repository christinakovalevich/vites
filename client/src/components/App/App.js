import React, {Component} from 'react';
import "./App.css";
import {APP_NAME, CLIENT_VERSION, REACT_VERSION} from '../../config/config';
import ToolBar from "../Common/ToolBar/ToolBar/ToolBar";
import Panel from "../Common/Panel/Panel";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ApiService from "../../services/Api/ApiService";
import NotConnectedPage from "../Pages/NotConnectedPage/NotConnectedPage";
import Loader from "../Common/Loader/Loader";
import LoginForm from "../LoginForm/LoginForm";
import AuthService from "../../services/Auth/AuthService";
import CoursePageService from "../../services/Course/CoursePageService";
import AppService from "../../services/App/AppService";
import RouteWrapper from "../RouteWrapper/RouteWrapper";
import PathService from "../../services/Path/PathService";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import MentorPage from "../Pages/MentorPage/MentorPage";
import RatingPage from "../Pages/RatingPage/RatingPage";
import {UserRoleContext} from "../../contexts/UserRoleContext"

export default class App extends Component {
    state = {
        appInfo: {
            name: APP_NAME,
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
        isConnected: false,
        isAuthenticated: false,
        isShowLoader: false,
        userDetails: AppService.getInitialUserDetails(),
        coursesPageMode: CoursePageService.modes.all(),
    };

    componentDidMount() {
        ApiService.testConnection(this.setConnected, this.showLoader);
        AuthService.checkAuthentication(this.setAuthenticated, this.setRole);

        setInterval(() =>
            ApiService.testConnection(this.setConnected, this.showLoader), 500);
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
        this.setState({isConnected});
    };

    setAuthenticated = (isAuthenticated) => {
        this.setState({isAuthenticated})
    }

    setRole = (role) => {
        this.setState(state => {
            return {
                userDetails: {
                    ...state.userDetails,
                    role
                }
            }
        })
    };

    inputChangeHandler = ({target}) => {
        const userDetails = {...this.state.userDetails};
        userDetails[target.name] = target.value;
        this.setState({userDetails});
    };

    loginHandler = (e) => {
        e.preventDefault();
        AuthService.login(this.state.userDetails);
    };

    logoutHandler = () => {
        AuthService.removeToken();
        this.setState({
            isAuthenticated: false,
            userDetails: AppService.getInitialUserDetails()
        });
    };

    onCoursesPageModeChange = (coursesPageMode) => {
        if (CoursePageService.isModeValid(coursesPageMode)) {
            this.setState({coursesPageMode});
        } else {
            console.error('Unknown coursesPageMode:', coursesPageMode);
        }
    };

    render() {
        const {
            isConnected,
            isShowLoader,
            isAuthenticated,
            userDetails,
            coursesPageMode,
            appInfo
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
        );

        const getContentForConnected = () => {
            if (!isAuthenticated) {
                return <LoginForm {...AppService.getLoginFormProps(
                    userDetails,
                    this.loginHandler,
                    this.inputChangeHandler
                )}/>
            }

            return (
                <Switch>
                    <Route path={PathService.login()}
                           roles={PathService.roles().login()}
                           exact
                           render={() => <LoginForm {...AppService.getLoginFormProps(
                               userDetails,
                               this.loginHandler,
                               this.inputChangeHandler
                           )}/>}/>

                    <UserRoleContext.Provider value={userDetails.role}>
                        <RouteWrapper path={PathService.home()} exact
                                      roles={PathService.roles().home()}>
                            <DashboardPage title="Главная"/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.courses()} exact
                                      roles={PathService.roles().courses()}>
                            <CoursesPage title="Курсы и стажировки"
                                         sort={AppService.sortCoursesByDate}
                                         modes={{
                                             all: CoursePageService.modes.all,
                                             my: CoursePageService.modes.my,
                                         }}
                                         isActiveMode={currentMode =>
                                             CoursePageService.isActiveMode(coursesPageMode, currentMode)}
                                         onModeChange={this.onCoursesPageModeChange}
                                         getLabelForMode={CoursePageService.getLabelForMode}
                                         getCourses={AppService.getCoursesPageFetchFunction(coursesPageMode)}/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.course()}
                                      roles={PathService.roles().course()}>
                            <CourseDetails title="Курс"
                                           getCourse={ApiService.fetchCourse}/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.students()}
                                      roles={PathService.roles().students()}>
                            <StudentsPage title="Студенты"/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.mentors()}
                                      roles={PathService.roles().mentors()}>
                            <MentorPage title="Преподаватели"/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.rating()}
                                      roles={PathService.roles().rating()}>
                            <RatingPage title="Успеваемость"/>
                        </RouteWrapper>

                        <RouteWrapper path={PathService.settings()}
                                      roles={PathService.roles().settings()}>
                        </RouteWrapper>
                    </UserRoleContext.Provider>
                </Switch>
            )
        };

        return (
            <div className="App">
                <BrowserRouter>
                    <ToolBar {...AppService.getToolBarProps(
                        isConnected,
                        isAuthenticated,
                        userDetails,
                        appInfo,
                        this.logoutHandler,
                        this.setConnected,
                        this.showLoader
                    )}/>
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