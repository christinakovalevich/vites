import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import "./Stars.css"
import {faStar, faStarHalf} from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";

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

    return (
        <div className="stars noselect">
            {
                isAppropriateValue(value) ?
                    <span data-tip={value}>{buildStarsFromValue(roundHalf(value))}</span> :
                    <span className="text-danger">wrong value {value}.</span>
            }
            {
                showToolTip ? <ReactTooltip/> : null
            }
        </div>
    )
};

export default Stars

Stars.propTypes = {
    value: PropTypes.number,
    showToolTip: PropTypes.bool,
}