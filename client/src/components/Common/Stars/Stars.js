import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./Stars.css"
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "../ToolTipWrapper/ToolTipWrapper";

const Stars = ({value, showToolTip = true}) => {

    const buildStarsFromValue = (value) => {
        const fillWithIcon = (times, faIcon) =>
            new Array(times).fill(<FontAwesomeIcon icon={faIcon}/>)

        let arr = []

        if (value === 0) {
            arr.push(<FontAwesomeIcon icon={faStarHalf}/>)

        } else if (Number.isInteger(value)) {
            arr = fillWithIcon(value, faStar)

        } else {
            arr = fillWithIcon(Math.round(value - 1), faStar)
            arr.push(<FontAwesomeIcon icon={faStarHalf}/>)
        }

        return arr.map((it, i) => <Fragment key={i}>{it} </Fragment>)
    }

    const isAppropriateValue = value => {
        return value >= 0 && value <= 5
    }

    const roundHalf = value => Math.round(value * 2) / 2;

    const getElements = () => {
        if (isAppropriateValue(value)) {
            if (value === 0) {
                return <MutedStars toolTipLabel="Недостаточное кол-во оценок."/>
            } else {
                return (
                    <TooltipWrapper id={''} label={value}>
                        <span>{buildStarsFromValue(roundHalf(value))}</span>
                    </TooltipWrapper>
                )
            }
        } else {
            return <span className="text-danger">wrong value {value}.</span>
        }
    }

    return (
        <div className="stars noselect">
            {
                getElements()
            }
        </div>
    )
};

export default Stars

Stars.propTypes = {
    value: PropTypes.number,
    showToolTip: PropTypes.bool,
};

const MutedStars = ({toolTipLabel}) => {
    const elements = [...Array(5).keys()]
        .map(it => <FontAwesomeIcon key={it} icon={faStar}/>)

    return (
        <TooltipWrapper label="Недостаточное количество оценок.">
            <span className="muted">
                {
                    elements
                }
            </span>
        </TooltipWrapper>
    )
}