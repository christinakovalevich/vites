import React, {useEffect, useState} from "react";
import "./CoursesPage.css"
import PropTypes from "prop-types";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import Loader from "../../Common/Loader/Loader";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";
import RowDataTransformer from "../../Common/RowDataContainer/RowDataTransformer";

const CoursesPage = ({title, modes, getCourses, sortCourses, isActiveMode, onModeChange, getLabelForMode}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses()
            .then(courses => {
                setCourses(courses);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getCourses])

    return (
        <div className="courses-page">
            <DefaultPage>

                <div className="title">
                    <h1>{title}</h1>
                </div>

                <ToggleModeContainer modes={modes}
                                     isActiveMode={isActiveMode}
                                     getLabelForMode={getLabelForMode}
                                     onModeChange={onModeChange}/>

                {
                    hasLoaded ?
                        !hasError || courses.length > 0 ?
                            <RowDataTransformer dataArr={sortCourses(courses)}/> : null : <Loader/>
                }
            </DefaultPage>
        </div>
    )
};

export default CoursesPage

CoursesPage.propTypes = {
    title: PropTypes.string,
    getCourses: PropTypes.func,
    sortCourses: PropTypes.func,
}