import React, {useContext} from "react";
import "./MentorCard.css";
import {Col, Row} from "react-bootstrap";
import Stars from "../Common/Rating/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import Button from "../Common/Button/Button";
import TooltipWrapper from "../Common/ToolTipWrapper/ToolTipWrapper";
import {GetCardButtonContext} from "../../contexts/GetCardButtonContext";

const MentorCard = (props) => {
    const {
        id,
        fullName,
        birthDate,
        experienceYears,
        phone,
        email,
        rating,
        isShowRateButton
    } = props;

    const getCardButton = useContext(GetCardButtonContext);

    return (
        <div className="mentor-card shadow-m">
            <div className="title">
                <h4>{fullName}</h4>
            </div>

            <div className="dates">

            </div>

            <hr/>

            <div className="body">
                <Row>

                </Row>

                <Row>
                    <Col>
                        <h6>Рейтинг:</h6>
                    </Col>
                    <Col>
                        <Stars value={rating} faIcon={faStar}/>
                    </Col>
                </Row>
            </div>

            {
                isShowRateButton ? (
                    <TooltipWrapper label="Оценить работу преподавателя">
                        <div>
                            <Button label="Оценить"
                                    onClick={() => {
                                    }}
                                    className="w-100"/>
                        </div>
                    </TooltipWrapper>
                ) : null
            }

            {
               getCardButton(id)
            }

        </div>
    )
};

export default MentorCard;