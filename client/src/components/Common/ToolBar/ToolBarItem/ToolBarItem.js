import React from "react";

import classNames from "classnames"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./ToolBarItem.css"
import {Link} from "react-router-dom";

const ToolBarItem = ({href, label, faIcon, isActive, onClick}) => {

    const getClassNames = () =>
        classNames('tool-bar-item', {
                'active': isActive
            }
        )

    return (
        <Link to={href} className={getClassNames()} onClick={() => onClick(href)}>
            {
                isActive ? <FontAwesomeIcon icon={faIcon}/> : null
            }
            {label}

        </Link>
    )
}

export default ToolBarItem;