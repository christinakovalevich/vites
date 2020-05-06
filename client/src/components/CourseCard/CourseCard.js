import React from "react";

import "./CourseCard.css"
import Stars from "../Common/Stars/Stars";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

const CourseCard = ({
                        id,
                        name,
                        difficulty,
                        popularity,
                        studentsCount,
                        totalPlacesCount,
                        availablePlacesCount,
                        startDate,
                        endDate,
                        isOwned,
                    }) => {
    return (
        <div className="course-card border">
            <Link to={`${id}`}>
                <h4>{name}</h4>
            </Link>

            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        <div className="float-right">
                            <h6>Сложность:</h6>
                            <Stars value={difficulty} faIcon={faStar}/>
                            <h6>Популярность:</h6>
                            <Stars value={popularity} faIcon={faStarHalf}/>
                        </div>
                    </Col>
                    <Col>
                        <div className="float-right">
                            <h6>Преподаватели:</h6>

                            <h6>Количество свободных мест: {availablePlacesCount}</h6>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default CourseCard