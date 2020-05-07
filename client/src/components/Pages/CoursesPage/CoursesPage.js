import React, {useEffect, useState} from "react";
import "./CoursesPage.css"
import PropTypes from "prop-types";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {Col, Row} from "react-bootstrap";
import CourseCard from "../../CourseCard/CourseCard";
import Loader from "../../Common/Loader/Loader";
import {Link} from "react-router-dom";

const CoursesPage = ({title, getCourses, sort}) => {

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
        return reshapeCourses(sort(courses)).map((row, i) => (
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
                    hasLoaded ?
                        !hasError || courses.length > 0 ?
                            transformCourses(courses) : null : <Loader/>
                }
            </DefaultPage>
        </div>
    )
};

export default CoursesPage

CoursesPage.propTypes = {
    title: PropTypes.string,
    getCourses: PropTypes.func,
    sort: PropTypes.func,
}