import React, {Fragment} from "react";
import Button from "../../Common/Button/Button";

import "./NotConnectedPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {FontAwesomeIcon,} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

import disconnectedIcon from "./disconnected-icon.svg"

const NotConnectedPage = ({title, onRefresh}) => {

    const reloadButtonText = (title) => (
        <Fragment>
            <FontAwesomeIcon icon={faSyncAlt}/> {title}
        </Fragment>
    )

    return (
        <div className="not-connected-page">
            <DefaultPage>
                <div className="title">
                    <h1>{title}</h1>
                </div>

                <div className="icon-container">
                    <img src={disconnectedIcon} alt="Icon"/>
                </div>

                <div className="button-container">
                    <Button label={reloadButtonText("Перезагрузить")} onClick={onRefresh}/>
                </div>
            </DefaultPage>
        </div>
    )
}

export default NotConnectedPage;