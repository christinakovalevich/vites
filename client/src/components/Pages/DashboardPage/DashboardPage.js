import React from "react";

import "./DashboardPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";

const DashboardPage = ({title}) => {
    return (
        <div className="dashboard-page">
            <DefaultPage>
                <h1>{title}</h1>
            </DefaultPage>
        </div>
    )
};

export default DashboardPage