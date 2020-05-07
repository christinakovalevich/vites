import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {Col, Row} from "react-bootstrap";
import CourseCard from "../../CourseCard/CourseCard";

import "./CoursesPage.css"
import Loader from "../../Common/Loader/Loader";

const CoursesPage = ({title, getCourses}) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses(setCourses)
    }, [getCourses])

    const reshapeCourses = (courses) => {
        let arr = [];
        while (courses.length) {
            arr.push(courses.splice(0, 3))
        }
        return arr;
    }

    const transformCourses = (courses) => {
        return reshapeCourses(courses).map((row, i) => (
            <Row key={i}>
                {
                    row.map((col, i) => (
                        <Col key={i} lg={4}>
                            <CourseCard key={col.id} {...col}/>
                        </Col>
                    ))
                }
            </Row>
        ))
    };

    return (
        <div className="courses-page">
            <DefaultPage>
                <h1>{title}</h1>
                {
                    courses ? transformCourses(courses) : <Loader/>
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