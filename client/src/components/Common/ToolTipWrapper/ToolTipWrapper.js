import {OverlayTrigger, Tooltip} from "react-bootstrap";
import React from "react";

const TooltipWrapper = ({id, label = 'tooltip', placement = 'top', delay = {show: 50, hide: 50}, children}) => (
    <OverlayTrigger
        placement={placement}
        delay={delay}
        overlay={
            <Tooltip id={id}>
                {label}
            </Tooltip>
        }>
        {
            children
        }
    </OverlayTrigger>
);

export default TooltipWrapper