import {joinClassNames} from "../../../utils/utils";
import React from "react";

import "./Button.css"

const Button = ({variant = 'default', label = 'button', onClick, submit, disabled}) => {
    const className = joinClassNames('button', variant)
    return (
        <button
            className={className}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >{label}</button>
    )
};

export default Button