import React, {useEffect, useState} from "react";
import "./CourseDetails.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Stars from "../../Common/Rating/Stars/Stars";
import {formatDate} from "../../../utils/utils";
import GoBackButton from "../../Common/GoBackButton/GoBackButton";
import {Col, Container, Row} from "react-bootstrap";
import Loader from "../../Common/Loader/Loader";
import AlertError from "../../Common/Alert/AlertError/AlertError";
import CourseWorkTable from "../../CourseWorkTable/CourseWorkTable";

const CourseDetails = ({getCourse, getCourseWorks}) => {
    const [course, setCourse] = useState({});
    const [courseWorks, setCourseWorks] = useState(null);
    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        getCourse(id)
            .then(course => {
                setLoaded(true);
                setError(false);
                setCourse(course);
            })
            .catch(error => {
                setLoaded(true);
                setError(true);
                console.error(error);
            });
        if (typeof getCourseWorks !== "undefined") {
            if (!courseWorks) {
                setLoaded(false);
                getCourseWorks(id).then(courseWork => {
                    setLoaded(true);
                    setError(false);
                    setCourseWorks(courseWork);
                })
                    .catch(error => {
                        setLoaded(true);
                        setError(true);
                        console.error(error);
                    });
            }
        }
    }, [course, courseWorks, getCourse, getCourseWorks, id])

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertError/>
    }

    return (
        <div className="course-details">
            <DefaultPage>
                <Container fluid>
                    <Row>
                        <Col className="p-0" md={1}>
                            <GoBackButton/>
                        </Col>
                        <Col>
                            <h1 className="d-inline">{course.name}</h1>
                        </Col>
                        <Col className="text-right">
                            <h4>
                                <Stars value={course.popularity}
                                       toolTipPlacement="bottom"/> ({course.popularity})
                            </h4>
                            <h6>Средняя оценка курса</h6>
                        </Col>
                    </Row>
                </Container>

                <hr/>

                <div className="short-info">
                    <div className="dates line">
                        <div>
                            <span className="label">
                                Дата начала: <span className="value">{formatDate(course.startDate)}</span>
                            </span>
                        </div>
                        <div>
                            <span className="label">
                                Дата окончания: <span className="value">{formatDate(course.endDate)}</span>
                            </span>
                        </div>

                    </div>
                </div>

                {
                    courseWorks ? (
                        <CourseWorkTable data={courseWorks}/>
                    ) : null
                }

            </DefaultPage>
        </div>
    )
};

export default CourseDetails

CourseDetails.propTypes = {
    title: PropTypes.string,
    getCourse: PropTypes.func,
}

