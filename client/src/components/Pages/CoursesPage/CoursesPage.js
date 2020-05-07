import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {Col, Row} from "react-bootstrap";
import CourseCard from "../../CourseCard/CourseCard";

import "./CoursesPage.css"
import Loader from "../../Common/Loader/Loader";
import {Link} from "react-router-dom";

const CoursesPage = ({title, getCourses}) => {

    const [hasError, setError] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        console.log('useEffect');
        getCourses()
            .then(setCourses)
            .catch(setError)
    }, [getCourses])

    const reshapeCourses = (courses) => {
        let arr = [];
        
        if (Array.isArray(courses)) {
            let coursesCopy = [...courses]
            while (coursesCopy.length) {
                arr.push(coursesCopy.splice(0, 3))
            }
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

                <div className="title">
                    <h1>{title}</h1>
                </div>

                <div className="courses-toggle">
                    <h6 className="d-inline">Показать: </h6>
                    <Link to='/courses/'>Все курсы </Link> | <Link to='/my-courses'>Мои курсы </Link>
                </div>

                {
                    !hasError || courses.length > 0 ? transformCourses(courses) : <Loader/>
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