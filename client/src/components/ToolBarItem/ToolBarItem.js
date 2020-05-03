import React from "react";

import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./ToolBarItem.css"

const ToolBarItem = ({id, href, label, faIcon, isActive}) => {

    const isBrandItem = (id) => {
        return id === 'brand'
    }

    return (
        <a href={href || '#'}
           className={classNames('tool-bar-item', {
                   'brand': isBrandItem(id),
                   'active': isActive
               }
           )}>
            {
                isActive || isBrandItem(id) ? <FontAwesomeIcon icon={faIcon}/> : null
            }
            {label}
        </a>
    )
}

export default ToolBarItem;