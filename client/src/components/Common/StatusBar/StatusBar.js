import React from "react";
import "./StatusBar.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

const StatusBar = ({appInfo, icon, showReloadButton, onConnectionReload}) => {
    return (
        <div className="status-bar">
            <div className="left">
                v. {appInfo.version}
            </div>
            <div className="right">
                <FontAwesomeIcon icon={icon}/>
                {
                    showReloadButton ? (
                        <span className="connection-reload" onClick={onConnectionReload}>
                            <FontAwesomeIcon icon={faSyncAlt}/>
                        </span>
                    ) : null
                }
            </div>
        </div>
    )
};

export default StatusBar