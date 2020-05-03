import React from "react";

import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./ToolBarItem.css"
import {Link} from "react-router-dom";

const ToolBarItem = ({id, href, label, faIcon, isActive, onClick}) => {

    const isBrandItem = (id) => {
        return id === 'brand'
    }

    const getClassNames = () =>
        classNames('tool-bar-item', {
                'brand': isBrandItem(id),
                'active': isActive
            }
        )

    return (
        <Link to={href} className={getClassNames()} onClick={() => onClick(href)}>
            {
                isActive || isBrandItem(id) ? <FontAwesomeIcon icon={faIcon}/> : null
            }
            {label}

        </Link>
    )
}

export default ToolBarItem;