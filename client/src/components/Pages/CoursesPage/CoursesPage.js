import React, {useEffect, useState} from "react";
import "./CoursesPage.css"
import PropTypes from "prop-types";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import Loader from "../../Common/Loader/Loader";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";
import RowDataTransformer from "../../Common/RowDataContainer/RowDataTransformer";
import AlertError from "../../Common/Alert/AlertError/AlertError";
import CourseCard from "../../CourseCard/CourseCard";

const CoursesPage = ({title, getCourses, sortCourses, toggleModeContainerProps, getCardButton}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses()
            .then(courses => {
                setError(false);
                setLoaded(true);
                setCourses(courses);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getCourses])

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertError/>
    }

    return (
        <div className="courses-page">
            <DefaultPage>

                <div className="title">
                    <h1>{title}</h1>
                </div>

                <ToggleModeContainer {...toggleModeContainerProps}/>

                <RowDataTransformer
                    dataArr={sortCourses(courses)}
                    CardComponent={CourseCard}/>

            </DefaultPage>
        </div>
    )
};

export default CoursesPage;

CoursesPage.propTypes = {
    title: PropTypes.string,
    getCourses: PropTypes.func,
    sortCourses: PropTypes.func,
    toggleModeContainerProps: PropTypes.object,
}