import React from "react";

import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";
import ToolBarBrandItem from "../ToolBarItem/ToolBarBrandItem";
import ToolBarSettingsItem from "../ToolBarSettingsItem/ToolBarSettingsItem";

const ToolBar = ({toolBarItems = [], onToolBarItemClick, isConnected, onConnectionIconClick, settingsHref}) => {

    const transformToolBarItems = (toolBarItems) => {
        return toolBarItems
            .filter(it => it.id !== 'brand')
            .map(it => (
                <ToolBarItem key={it.id} {...it} onClick={onToolBarItemClick}/>
            ))
    }

    const transformToolBarBrandItem = () => {
        const brandItem = toolBarItems.find(it => it.id === "brand")
        return <ToolBarBrandItem {...brandItem} onConnectionIconClick={onConnectionIconClick} isConnected={isConnected}/>
    }

    return (
        <div className="vertical-menu">
            {
                transformToolBarBrandItem()
            }
            {
                transformToolBarItems(toolBarItems)
            }

            <ToolBarSettingsItem href={settingsHref}/>
        </div>
    )
}

export default ToolBar;