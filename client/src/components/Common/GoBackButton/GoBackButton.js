import React from "react";
import "./GoBackButton.css";
import {withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons";
import TooltipWrapper from "../ToolTipWrapper/ToolTipWrapper";


const GoBackButton = ({history, toolTipLabel = 'Вернуться назад'}) => {
    return (
        <TooltipWrapper label={toolTipLabel}>
            <span className="go-back-button" onClick={history.goBack}>
                <FontAwesomeIcon icon={faLongArrowAltLeft}/>
            </span>
        </TooltipWrapper>
    )
}

export default withRouter(GoBackButton)