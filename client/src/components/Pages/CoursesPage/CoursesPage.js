import React from "react";

import "./CoursesPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";

const CoursesPage = ({title}) => {
    return (
        <div className="courses-page">
            <DefaultPage>
                <h1>{title}</h1>
            </DefaultPage>
        </div>
    )
};

export default CoursesPage