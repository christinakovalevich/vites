import React from "react";

import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";

const ToolBar = ({toolBarItems = [], onToolBarItemClick}) => {

    const transformToolBarItems = (toolBarItems) => {
        return toolBarItems.map(it => (
            <ToolBarItem key={it.id} {...it} onClick={onToolBarItemClick}/>
        ))
    }

    return (
        <div className="vertical-menu">
            {
                transformToolBarItems(toolBarItems)
            }
        </div>
    )
}

export default ToolBar;