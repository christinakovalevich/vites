import React from "react";

import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./ToolBarBrandItem.css"
import ConnectionIcon from "../../ConnectionIcon/ConnectionIcon";

const ToolBarBrandItem = ({label, faIcon, isConnected, onConnectionIconClick}) => {

    const getClassNames = () =>
        classNames('tool-bar-item', 'brand')

    return (

        <div className={getClassNames()}>
            <div className="d-inline-block w-75">
                {
                    <FontAwesomeIcon icon={faIcon}/>
                }
                {label}
            </div>

            <div className="text-right d-inline-block w-25">
                <ConnectionIcon
                    isConnected={isConnected}
                    onConnectionIconClick={onConnectionIconClick}
                />
            </div>

        </div>
    )
}

export default ToolBarBrandItem;