import React, {useEffect, useState} from "react";

import "./StudentsPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";
import Loader from "../../Common/Loader/Loader";
import AlertError from "../../Common/Alert/AlertError/AlertError";
import RowDataTransformer from "../../Common/RowDataContainer/RowDataTransformer";
import StudentCard from "../../StudentCard/StudentCard";

const StudentsPage = ({title, getStudents, sortStudents, toggleModeContainerProps}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents()
            .then(students => {
                setStudents(students);
                setError(false);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getStudents]);

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertError/>
    }

    return (
        <div className="students-page">
            <DefaultPage>
                <h1>{title}</h1>

                <ToggleModeContainer {...toggleModeContainerProps}/>

                <RowDataTransformer dataArr={students} CardComponent={StudentCard}/>
            </DefaultPage>
        </div>
    )
};

export default StudentsPage;