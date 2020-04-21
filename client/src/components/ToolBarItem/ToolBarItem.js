import React from "react";

import {joinClassNames} from "../../utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./ToolBarItem.css"

const ToolBarItem = ({href, label, faIcon, classNames = []}) => {
    return (
        <a href={href || '#'}
           className={joinClassNames('tool-bar-item', ...classNames)}>
            {
                faIcon ? <FontAwesomeIcon icon={faIcon}/> : null
            }
            {label}
        </a>
    )
}

export default ToolBarItem;