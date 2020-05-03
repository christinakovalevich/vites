import React from "react";
import Panel from "../../Panel/Panel";

const CoursesPanel = ({title}) => {
    return (
        <div className="courses-panel">
            <Panel title={title}/>
        </div>
    )
};

export default CoursesPanel