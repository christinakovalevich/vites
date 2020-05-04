import React from "react";

import "./CommonPage.css"

const CommonPage = ({children}) => {
    return (
        <div className="common-page">
            {children}
        </div>
    )
};

export default CommonPage