import React, {useContext} from "react";
import "./MentorCard.css";
import Stars from "../Common/Rating/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {GetCardButtonContext} from "../../contexts/GetCardButtonContext";
import {formatDate} from "../../utils/utils";
import {parsePhoneNumberFromString} from 'libphonenumber-js';

const MentorCard = (props) => {
    const {
        id,
        fullName,
        birthDate,
        experienceYears,
        phone,
        email,
        rating
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

            <div>
                <div className="d-inline-block w-25">
                    <h6>Рейтинг:</h6>
                </div>
                <div className="d-inline-block w-75 text-right">
                    <Stars value={rating} faIcon={faStar}/>
                </div>
            </div>

            <div>
                <div className="d-inline-block w-25">
                    <h6>E-mail:</h6>
                </div>
                <div className="d-inline-block w-75 text-right">
                    <a href={`mailto:${email}`}>{email}</a>
                </div>
            </div>

            <div>
                <div className="d-inline-block w-25">
                    <h6>Телефон:</h6>
                </div>
                <div className="d-inline-block w-75 text-right">
                    <a href={`tel:${phone}`}>
                        {
                            parsePhoneNumberFromString(phone, 'BY').formatNational()
                        }
                    </a>
                </div>
            </div>

            <div>
                <div className="d-inline-block w-50">
                    <h6>Дата рождения:</h6>
                </div>
                <div className="d-inline-block w-50 text-right">
                    {formatDate(birthDate)}
                </div>
            </div>

            <div>
                <div className="d-inline-block w-75">
                    <h6>Опыт менторства: </h6>
                </div>
                <div className="d-inline-block w-25 text-right">
                    {experienceYears}
                </div>
            </div>

            {
                getCardButton(id)
            }

        </div>
    )
};

export default MentorCard;