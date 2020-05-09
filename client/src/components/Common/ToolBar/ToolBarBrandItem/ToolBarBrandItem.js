import React from "react";
import "./ToolBarBrandItem.css";
import classNames from "classnames";

const ToolBarBrandItem = ({appName, appIcon}) => {

    const getClassNames = () =>
        classNames('tool-bar-item', 'brand')

    return (
        <div className={getClassNames()}>
            <img src={appIcon} alt=""/> {appName}
        </div>
    )
};

export default ToolBarBrandItem;