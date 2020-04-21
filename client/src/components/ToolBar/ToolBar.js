import React from "react";

import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";

const ToolBar = ({toolBarItems = []}) => {
    return (
        <div className="vertical-menu">
            {
                toolBarItems.map(it => (
                    <ToolBarItem key={it.id} {...it}/>
                ))
            }
        </div>
    )
}

export default ToolBar;