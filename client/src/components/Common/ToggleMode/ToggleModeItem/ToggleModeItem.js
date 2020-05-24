import React from "react";
import "./ToggleModeItem.css"
import classNames from "classnames";
import PropTypes from "prop-types";
import TooltipWrapper from "../../ToolTipWrapper/ToolTipWrapper";

const ToggleModeItem = ({label, isActiveMode, onClick}) => {
    const className = classNames('toggle-mode-item', {
        'active': isActiveMode
    });

    return (
        <TooltipWrapper label={`Показать ${label.toLowerCase()}.`}>
            <button className={className}
                    onClick={onClick}> {label} </button>
        </TooltipWrapper>
    )
};

export default ToggleModeItem;

ToggleModeItem.propTypes = {
    label: PropTypes.string,
    isActiveMode: PropTypes.bool,
    onClick: PropTypes.func,
}