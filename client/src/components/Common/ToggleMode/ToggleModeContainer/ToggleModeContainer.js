import React, {useContext} from "react";
import "./ToggleModeContainer.css"
import ToggleModeItem from "../ToggleModeItem/ToggleModeItem";
import {ShowToggleContext} from "../../../../contexts/ShowToggleContext";
import PropTypes from "prop-types";

const ToggleModeContainer = ({modes, getLabelForMode, isActiveMode, onModeChange}) => {

    const showToggle = useContext(ShowToggleContext);

    if (!showToggle) {
        return null
    }

    const getToggleModeItemProps = (mode) => {
        return {
            label: getLabelForMode(mode),
            isActiveMode: isActiveMode(mode),
            onClick: () => onModeChange(mode)
        }
    }

    return (
        <div className="toggle-mode-container">
            <h6 className="d-inline">Показать: </h6>
            <ToggleModeItem {...getToggleModeItemProps(modes.all())}/>
            <span> | </span>
            <ToggleModeItem {...getToggleModeItemProps(modes.my())}/>
        </div>
    )
};

export default ToggleModeContainer;

ToggleModeContainer.propsTypes = {
    modes: PropTypes.object,
    getLabelForMode: PropTypes.func,
    isActiveMode: PropTypes.func,
    onModeChange: PropTypes.func,
}