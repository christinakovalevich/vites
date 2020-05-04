import {joinClassNames} from "../../../utils";
import React from "react";

import "./Button.css"

const Button = ({variant = 'default', label = 'button', onClick, submit}) => {
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