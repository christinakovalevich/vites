import React from "react";
import classNames from "classnames";

import "./ToolBarLogOutItem.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ToolBarLogOutItem = ({isLoggedIn, label, faIcon, onClick, className}) => {
    const getClassNames = () =>
        classNames('tool-bar-item', 'tool-bar-log-out-item', ...className)

    return (
        <div className={getClassNames()} onClick={onClick}>
            <FontAwesomeIcon icon={faIcon}/> {label}
        </div>
    )
};

export default ToolBarLogOutItem