import React, {Component} from 'react';
import {APP_NAME, CLIENT_VERSION, REACT_VERSION} from '../../config/config';
import ToolBar from "../Common/ToolBar/ToolBar/ToolBar";

import Panel from "../Common/Panel/Panel";
import StudentsPage from "../Pages/StudentsPage/StudentsPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PathService from "../../services/api/PathService";
import MentorPage from "../Pages/MentorPage/MentorPage";
import RatingPage from "../Pages/RatingPage/RatingPage";
import CoursesPage from "../Pages/CoursesPage/CoursesPage";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import ApiService from "../../services/api/ApiService";
import NotConnectedPage from "../Pages/NotConnectedPage/NotConnectedPage";
import Loader from "../Common/Loader/Loader";
import ToolBarService from "../../services/ToolBar/ToolBarService";

import "./App.css";

class App extends Component {

    apiService = new ApiService();
    pathService = new PathService();
    toolBarService = new ToolBarService();

    state = {
        serverInfo: {},
        appInfo: {
            version: CLIENT_VERSION,
            react: REACT_VERSION
        },
        isConnected: false,
        isAuthenticated: false,
        isShowLoader: false,
        toolBarTopItems: [],
    };

    componentDidMount() {
        this.apiService.testConnection(this.setConnected, this.showLoader);
        this.setToolBarActiveItem(window.location.pathname);
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

    render() {
        const {toolBarTopItems, isConnected, isShowLoader, appInfo} = this.state;

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

        const getContentForConnected = () => (
            <Switch>
                <Route path={this.pathService.main()}
                       render={() => <DashboardPage title="Главная"/>}/>

                <Route path={this.pathService.courses()}
                       render={() => <CoursesPage title="Курсы"/>}/>

                <Route path={this.pathService.students()}
                       render={() => <StudentsPage title="Студенты"/>}/>

                <Route path={this.pathService.mentors()}
                       render={() => <MentorPage title="Преподаватели"/>}/>

                <Route path={this.pathService.rating()}
                       render={() => <RatingPage title="Успеваемость"/>}/>
            </Switch>
        )

        const bottomItems = this.toolBarService
            .getBottomToolBarItems(this.onToolBarItemClick)
        const toolBarBrandItemProps = this.toolBarService
            .getToolBarBrandItemProps(
                () =>
                    this.apiService.testConnection(this.setConnected, this.showLoader, 500),
                isConnected,
                APP_NAME.toUpperCase(),
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