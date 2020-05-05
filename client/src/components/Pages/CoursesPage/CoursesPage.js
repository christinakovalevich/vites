import React, {useEffect, useState} from "react";

import PropTypes from "prop-types";

import "./CoursesPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import CourseCard from "../../CourseCard/CourseCard";

const CoursesPage = ({title, getCourses}) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setCourses(getCourses())
    }, [getCourses])

    const transformCourses = (courses) =>
        courses.map(it =>
        <CourseCard key={it.id} {...it}/>)

    return (
        <div className="courses-page">
            <DefaultPage>
                <h1>{title}</h1>
                {
                    transformCourses(courses)
                }
            </DefaultPage>
        </div>
    )
};

export default CoursesPage

CoursesPage.propTypes = {
    title: PropTypes.string,
    getCourses: PropTypes.func,
}