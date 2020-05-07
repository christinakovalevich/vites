import React, {useEffect, useState} from "react";
import "./CourseDetails.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";

const CourseDetails = ({title, getCourse}) => {
    const [course, setCourse] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getCourse(id)
            .then(setCourse)
            .catch(console.error)
    }, [getCourse, id])

    return (
        <div className="course-details">
            <DefaultPage>
                <h1>{course.name}</h1>
                id: {id}
            </DefaultPage>
        </div>
    )
};

export default CourseDetails

CourseDetails.propTypes = {
    title: PropTypes.string,
    getCourse: PropTypes.func,
}