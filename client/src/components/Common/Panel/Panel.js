import React from "react";

import "./Panel.css";

const Panel = ({children}) => {
    return (
        <div className="panel">
            {
                children
            }
        </div>
    )
}

export default Panel;