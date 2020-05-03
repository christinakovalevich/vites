import React from "react";
import Panel from "../../Panel/Panel";

const RatingPanel = ({title}) => {
    return (
        <div className="rating-panel">
            <Panel
                title={title}
            />
        </div>
    )
};

export default RatingPanel;