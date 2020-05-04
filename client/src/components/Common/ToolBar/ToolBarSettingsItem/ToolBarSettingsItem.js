import React from "react";

import "./ToolBarSettingsItem.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ToolBarSettingsItem = ({title = 'Настройки', href}) => {
    return (
        <Link to={href} className="toolBar-settings-item">
            <FontAwesomeIcon icon={faCog}/> {title}
        </Link>
    )
};

export default ToolBarSettingsItem