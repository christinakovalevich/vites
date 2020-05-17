import React, {useEffect, useState} from "react";
import "./CourseDetails.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import Stars from "../../Common/Rating/Stars/Stars";
import {formatDate} from "../../../utils/utils";
import Button from "../../Common/Button/Button";

const CourseDetails = ({getCourse}) => {
    const [course, setCourse] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getCourse(id)
            .then(setCourse)
            .catch(console.error)
    }, [getCourse, id])

    return (
        <div className="course-details">
            <DefaultPage>
                <h1>{course.name}</h1>

                <div className="short-info">
                    <div className="rating line">
                        <span className="label">Средняя оценка курса: </span>
                        <Stars value={course.popularity}/>
                        <span> ({course.popularity})</span>
                    </div>
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

