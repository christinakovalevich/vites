import React, {useContext} from "react";
import Stars from "../Common/Rating/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {Col, Row} from "react-bootstrap";
import {withRouter} from "react-router-dom";

import "./CourseCard.css"
import {formatDate} from "../../utils/utils";
import TooltipWrapper from "../Common/ToolTipWrapper/ToolTipWrapper";
import {GetCardButtonContext} from "../../contexts/GetCardButtonContext";

const CourseCard = (props) => {

    const {
        id,
        name,
        difficulty,
        popularity,
        totalPlacesCount,
        availablePlacesCount,
        startDate,
        endDate,
        history
    } = props;

    const showCourse = () => {
        history.push(`${id}`)
    }

    const getCardButton = useContext(GetCardButtonContext);

    return (
        <div className="course-card shadow-m">

            <div className="title" onClick={showCourse}>
                <h4>{name}</h4>
            </div>

            <div className="dates">
                <TooltipWrapper label={formatDate(startDate)}>
                    <span>
                        {formatDate(startDate)}
                    </span>
                </TooltipWrapper>
                <span> - </span>
                <TooltipWrapper label={formatDate(endDate)}>
                    <span>
                        {formatDate(endDate)}
                    </span>
                </TooltipWrapper>
            </div>

            <hr/>

            <div>
                <div className="mb-2">
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
                </div>

                <div>
                    Всего мест: <span className="font-weight-bold">{totalPlacesCount}</span>
                </div>
                <div>
                    Осталось свободных мест: <span className="font-weight-bold">{availablePlacesCount}</span>
                </div>
            </div>
            {
                getCardButton(id)
            }
        </div>
    )
};

export default withRouter(CourseCard)