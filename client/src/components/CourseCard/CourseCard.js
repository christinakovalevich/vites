import React from "react";

import "./CourseCard.css"
import Stars from "../Common/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../Common/Button/Button";
import {Col, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import ReactTooltip from "react-tooltip";

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
    return (
        <div className="course-card shadow-m">

            <div className="title">
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

                <h6>Преподаватели:</h6>

                <div>
                    Всего мест: <span className="font-weight-bold">{totalPlacesCount}</span>
                </div>
                <div>
                    Осталось свободных мест: <span className="font-weight-bold">{availablePlacesCount}</span>
                </div>
            </div>

            <Button label="Подробнее" onClick={() => history.push(`${id}`)}/>
            <ReactTooltip/>
        </div>
    )
};

export default withRouter(CourseCard)