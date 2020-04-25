import React from "react";

import "./Panel.css";

const Panel = ({title = 'Panel'}) => {
    return (
        <div className="panel">
            <div className="panel-title">
                {title}
            </div>
            <div className="panel-content">
            </div>
        </div>
    )
}

export default Panel;