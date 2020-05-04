import React from "react";

import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";

const ToolBar = ({
                     brandElement,
                     topItems = [],
                     bottomItems = [],
                     onToolBarItemClick,
                     appInfo
                 }) => {

    const transformToolBarItems = (toolBarItems) => {
        return toolBarItems
            .map(it => (
                <ToolBarItem key={it.id} {...it} onClick={onToolBarItemClick}/>
            ))
    }

    return (
        <div className="vertical-menu">
            {
                brandElement
            }
            {
                transformToolBarItems(topItems)
            }
            <div className="bottom-container">
                {
                    transformToolBarItems(bottomItems)
                }
                <div className="app-info">
                    v. {appInfo.version}
                </div>
            </div>
        </div>
    )
}

export default ToolBar;