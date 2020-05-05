import React from "react";

import "./Loader.css"
import loaderIcon from "./loader-icon-1.svg"

const Loader = () => {
    return (
        <div className="loader">
            <img src={loaderIcon} alt="loading.."/>
        </div>
    )
};

export default Loader