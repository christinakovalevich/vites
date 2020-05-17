import React, {Fragment} from "react";
import "./Stars.css"
import PropTypes from "prop-types";
import TooltipWrapper from "../../ToolTipWrapper/ToolTipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

const Stars = ({value, highestRate = 5, toolTipPlacement='top'}) => {

    const getToolTipLabel = (value) =>
        value > 0 ? value : 'Недостаточное кол-во оценок.';

    const buildStarsFromValue = (value) => [...Array(value).keys()]
        .map(it => <FontAwesomeIcon key={it} icon={faStar}/>);

    const isAppropriateValue = (value, highestRate) =>
        value >= 0 && value <= highestRate;

    const parseValue = (value, highestRate) => {
        const ROUNDED_VALUE = Math.round(value);
        const DELTA = highestRate - ROUNDED_VALUE
        return [
            ROUNDED_VALUE,
            DELTA
        ]
    }

    const getStars = (value) => {
        const [rounded, delta] = parseValue(value, highestRate);
        return (
            <Fragment>
                <span>
                    {
                        buildStarsFromValue(rounded)
                    }
                </span>
                <span className="muted">
                    {
                        buildStarsFromValue(delta)
                    }
                </span>
            </Fragment>
        )
    }

    return (
        <div className="stars noselect">
            {
                isAppropriateValue(value, highestRate) ? (
                    <TooltipWrapper label={getToolTipLabel(value)} placement={toolTipPlacement}>
                        <span>
                            {
                                getStars(value, highestRate)
                            }
                        </span>
                    </TooltipWrapper>
                ) : <span className="text-danger">wrong value {value}.</span>
            }
        </div>
    )
};

export default Stars

Stars.propTypes = {
    value: PropTypes.number,
    highestRate: PropTypes.number,
};