import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWifi} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import classNames from "classnames"

import "./ConnectionIcon.css"

const ConnectionIcon = ({isConnected, onConnectionIconClick}) => {
    const icon = isConnected ? faWifi : faWifi
    const title = `Вы${isConnected ? '' : ' не'} подключены к серверу.`
    const className = classNames('connection-icon', {
        'blinking': !isConnected
    })

    return (
        <div className={className}
             data-tip={title}
             onClick={onConnectionIconClick}
        >
            <FontAwesomeIcon icon={icon}/>
            <ReactTooltip/>
        </div>
    )
};

export default ConnectionIcon