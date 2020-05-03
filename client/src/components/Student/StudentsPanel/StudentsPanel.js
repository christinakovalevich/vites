import React from "react";
import Panel from "../../Panel/Panel";

const StudentsPanel = ({title}) => {
    return (
        <div className="students-panel">
            <Panel
                title={title}
            />
        </div>
    )
};

export default StudentsPanel;