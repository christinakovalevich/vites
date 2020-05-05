import React from "react";

import "./CourseCard.css"
import Stars from "../Common/Stars/Stars";
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";

const CourseCard = ({name, difficulty = 0, popularity = 0}) => {
    return (
        <div className="course-card shadow">
            Название: <h6>{name}</h6>
            <h6>Сложность:</h6>
            <Stars value={difficulty} faIcon={faStar}/>
            <h6>Популярность:</h6>
            <Stars value={popularity} faIcon={faStarHalf}/>
        </div>
    )
};

export default CourseCard