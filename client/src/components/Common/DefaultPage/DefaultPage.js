import React from "react";

import "./DefaultPage.css"

const DefaultPage = ({children}) => {
    return (
        <div className="default-page">
            {children}
        </div>
    )
};

export default DefaultPage