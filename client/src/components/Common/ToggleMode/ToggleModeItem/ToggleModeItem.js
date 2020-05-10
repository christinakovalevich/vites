import React from "react";
import "./ToggleModeItem.css"
import classNames from "classnames";
import PropTypes from "prop-types";

const ToggleModeItem = ({label, isActiveMode, onClick}) => {
    const className = classNames('toggle-mode-item', {
        'active': isActiveMode
    });

    return (
        <span className={className}
              onClick={onClick}> {label} </span>
    )
}

export default ToggleModeItem

ToggleModeItem.propTypes = {
    label: PropTypes.string,
    modeValue: PropTypes.string,
    isActiveMode: PropTypes.bool,
    onClick: PropTypes.func,
}