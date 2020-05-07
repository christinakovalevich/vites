import {joinClassNames} from "../../../utils/utils";
import React from "react";

import "./Button.css"

const Button = ({label = 'button', onClick, submit, className}) => {
    return (
        <button
            className={joinClassNames('button', 'default', className)}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >{label}</button>
    )
};

export default Button