import React from "react";
import "./ToggleModeItem.css"
import classNames from "classnames";
import PropTypes from "prop-types";

const ToggleModeItem = ({label, modeValue, isActiveMode, onClick}) => {
    const className = classNames('toggle-mode-item', {
        'active': isActiveMode(modeValue)
    });

    return (
        <span className={className}
              onClick={() => onClick(modeValue)}> {label} </span>
    )
}

export default ToggleModeItem

ToggleModeItem.propTypes = {
    label: PropTypes.string,
    modeValue: PropTypes.string,
    isActiveMode: PropTypes.func,
    onClick: PropTypes.func,
}