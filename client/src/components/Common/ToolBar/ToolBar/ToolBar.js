import React from "react";

import PropTypes from 'prop-types';
import "./ToolBar.css"
import ToolBarItem from "../ToolBarItem/ToolBarItem";
import ToolBarBrandItem from "../ToolBarBrandItem/ToolBarBrandItem";
import ToolBarLogOutItem from "../ToolBarLogOutItem/ToolBarLogOutItem";

const ToolBar = ({brandItemProps, logOutItemProps, isAuthenticated, topItems = [], bottomItems = [], appInfo}) => {

    const transformToolBarItems = (toolBarItems) =>
        toolBarItems.map(itemProps =>
            <ToolBarItem key={itemProps.id} {...itemProps}/>
        )

    return (
        <div className="vertical-menu">

            <ToolBarBrandItem {...brandItemProps} />
            {
                transformToolBarItems(topItems)
            }
            <div className="bottom-container">
                {
                    transformToolBarItems(bottomItems)
                }
                {
                    isAuthenticated ? <ToolBarLogOutItem {...logOutItemProps}/> : null
                }
                <div className="app-info">
                    v. {appInfo.version}
                </div>
            </div>
        </div>
    )
}

ToolBar.propTypes = {
    brandItemProps: PropTypes.object,
    logOutItemProps: PropTypes.object,
    topItems: PropTypes.arrayOf(PropTypes.object),
    bottomItems: PropTypes.arrayOf(PropTypes.object),
}

export default ToolBar;