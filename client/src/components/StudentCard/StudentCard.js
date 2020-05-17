import React, {useContext} from "react";
import "./StudentCard.css";
import {GetCardButtonContext} from "../../contexts/GetCardButtonContext";
import Stars from "../Common/Rating/Stars/Stars";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {parsePhoneNumberFromString} from "libphonenumber-js";
import {formatDate} from "../../utils/utils";

const StudentCard = (props) => {
    const {
        id,
        fullName,
        birthDate,
        educationDegree,
        institutionName,
        phone,
        email,
        rating,
    } = props;

    const getCardButton = useContext(GetCardButtonContext);

    return (
        <div className="student-card shadow-m">
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
                    <h6>Учебное заведение: </h6>
                </div>
                <div className="d-inline-block w-25 text-right">
                    {institutionName}
                </div>
            </div>

            <div>
                <div className="d-inline-block w-25">
                    <h6>Образование: </h6>
                </div>
                <div className="d-inline-block w-75 text-right">
                    {educationDegree}
                </div>
            </div>
            {
                getCardButton(id)
            }
        </div>
    )
};

export default StudentCard;