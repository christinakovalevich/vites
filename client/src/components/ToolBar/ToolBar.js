import React from "react";

import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";

const ToolBar = ({toolBarItems = []}) => {

    const transformToolBarItems = (toolBarItems) => {
        return toolBarItems.map(it => (
            <ToolBarItem key={it.id} {...it}/>
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