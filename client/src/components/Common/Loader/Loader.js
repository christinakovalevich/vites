import React from "react";

import "./Loader.css"
import loaderIcon from "./loader-icon.svg"

const Loader = ({title = 'Загрузка..'}) => {
    return (
        <div className="loader">
            <img src={loaderIcon} alt="loading.."/>
            <div className="title">
                <span>{title}</span>
            </div>
        </div>
    )
};

export default Loader