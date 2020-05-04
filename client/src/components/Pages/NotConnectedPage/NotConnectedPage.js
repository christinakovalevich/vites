import React, {Fragment} from "react";
import Button from "../../Common/Button/Button";

import "./NotConnectedPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {FontAwesomeIcon,} from "@fortawesome/react-fontawesome";
import {faSyncAlt} from "@fortawesome/free-solid-svg-icons";

const NotConnectedPage = ({title, onRefresh}) => {

    const reloadButtonText = (title) => (
        <Fragment>
            <FontAwesomeIcon icon={faSyncAlt}/> {title}
        </Fragment>
    )

    return (
        <div className="common-page">
            <DefaultPage>
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <Button label={reloadButtonText("Перезагрузить")} onClick={onRefresh}/>
            </DefaultPage>
        </div>
    )
}

export default NotConnectedPage;