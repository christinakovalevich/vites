import React from "react";

import "./MentorPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";

const MentorPage = ({title}) => {
    return (
        <div className="mentor-page">
            <DefaultPage>
                <h1>{title}</h1>
            </DefaultPage>
        </div>
    )
};

export default MentorPage