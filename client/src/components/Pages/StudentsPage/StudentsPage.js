import React, {useEffect, useState} from "react";

import "./StudentsPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";

const StudentsPage = ({title, getStudents, sortStudents, toggleModeContainerProps}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents()
            .then(students => {
                setStudents(students);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getStudents])

    return (
        <div className="students-page">
            <DefaultPage>
                <h1>{title}</h1>

                <ToggleModeContainer {...toggleModeContainerProps}/>
            </DefaultPage>
        </div>
    )
};

export default StudentsPage;