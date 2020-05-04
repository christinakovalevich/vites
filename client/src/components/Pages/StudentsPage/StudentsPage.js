import React from "react";

import "./StudentsPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";

const StudentsPage = ({title}) => {
    return (
        <div className="students-page">
            <DefaultPage>
                <h1>{title}</h1>
            </DefaultPage>
        </div>
    )
};

export default StudentsPage;