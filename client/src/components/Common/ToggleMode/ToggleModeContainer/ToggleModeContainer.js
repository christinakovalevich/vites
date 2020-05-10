import React, {useContext} from "react";
import "./ToggleModeContainer.css"
import ToggleModeItem from "../ToggleModeItem/ToggleModeItem";
import {ShowToggleContext} from "../../../../contexts/ShowToggleContext";

const ToggleModeContainer = ({modes, getLabelForMode, isActiveMode, onModeChange}) => {

    const showToggle = useContext(ShowToggleContext);

    if (!showToggle) {
        return null
    }

    return (
        <div className="toggle-mode-container">
            <h6 className="d-inline">Показать: </h6>
            <ToggleModeItem
                label={getLabelForMode(modes.all())}
                modeValue={modes.all()}
                isActiveMode={isActiveMode}
                onClick={onModeChange}
            />
            <span> | </span>
            <ToggleModeItem
                label={getLabelForMode(modes.my())}
                modeValue={modes.my()}
                isActiveMode={isActiveMode}
                onClick={onModeChange}
            />
        </div>
    )
};

export default ToggleModeContainer