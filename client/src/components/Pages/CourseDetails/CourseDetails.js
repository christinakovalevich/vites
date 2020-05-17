import React, {useEffect, useState} from "react";
import "./CourseDetails.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Stars from "../../Common/Rating/Stars/Stars";
import {formatDate} from "../../../utils/utils";
import Button from "../../Common/Button/Button";
import GoBackButton from "../../Common/GoBackButton/GoBackButton";
import {Col, Container, Row} from "react-bootstrap";
import Loader from "../../Common/Loader/Loader";
import AlertError from "../../Common/Alert/AlertError/AlertError";

const CourseDetails = ({getCourse}) => {
    const [course, setCourse] = useState({});
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
            })
    }, [getCourse, id])

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

                <div>
                    <h3>Описание:</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deleniti, dolor est
                    eum facere id illum, ipsum molestias nihil numquam odio, odit quos recusandae repudiandae
                    rerum sequi tenetur unde ut.
                </div>

                <div>
                    <h3>Требования:</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque eos eveniet inventore,
                    odit porro possimus suscipit tempore? Aliquid consectetur debitis illum itaque sint sunt
                    voluptate! Beatae exercitationem nisi velit!
                </div>

                <div>
                    <Button label="Оставить заявку"/>
                </div>

            </DefaultPage>
        </div>
    )
};

export default CourseDetails

CourseDetails.propTypes = {
    title: PropTypes.string,
    getCourse: PropTypes.func,
}

