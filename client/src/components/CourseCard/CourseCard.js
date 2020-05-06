import React from "react";
import Stars from "../Common/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../Common/Button/Button";
import {Col, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import ReactTooltip from "react-tooltip";

import "./CourseCard.css"

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
                        history
                    }) => {

    const showCourse = () => {
        history.push(`${id}`)
    }

    return (
        <div className="course-card shadow-m">

            <div className="title" onClick={showCourse}>
                <h4>{name}</h4>
            </div>

            <div className="dates"
                 data-tip={`${startDate} - ${endDate}`}>
                {startDate} - {endDate}
            </div>

            <hr/>

            <div className="body">
                <Row>
                    <Col>
                        <h6>Сложность:</h6>
                    </Col>
                    <Col>
                        <Stars value={difficulty} faIcon={faStar}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h6>Популярность:</h6>
                    </Col>
                    <Col>
                        <Stars value={popularity} faIcon={faStar}/>
                    </Col>
                </Row>

                <br/>

                <div>
                    Всего мест: <span className="font-weight-bold">{totalPlacesCount}</span>
                </div>
                <div>
                    Осталось свободных мест: <span className="font-weight-bold">{availablePlacesCount}</span>
                </div>
            </div>

            <Button label="Подробнее" onClick={showCourse}/>
            <ReactTooltip/>
        </div>
    )
};

export default withRouter(CourseCard)