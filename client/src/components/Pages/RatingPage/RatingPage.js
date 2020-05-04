import React from "react";

import "./RatingPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";

const RatingPage = ({title}) => {
    return (
        <div className="rating-page">
            <DefaultPage>
                <h1>{title}</h1>
            </DefaultPage>
        </div>
    )
};

export default RatingPage;