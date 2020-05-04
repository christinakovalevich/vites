import React, {Fragment} from "react";
import Button from "../Common/Button/Button";

import "./NotConnectedPage.css"
import CommonPage from "../Common/CommonPage/CommonPage";
import {FontAwesomeIcon,} from "@fortawesome/react-fontawesome";
import {faSync} from "@fortawesome/free-solid-svg-icons";

const NotConnectedPage = ({title, onRefresh}) => {

    const reloadButtonText = (title) => (
        <Fragment>
            <FontAwesomeIcon icon={faSync}/> {title}
        </Fragment>
    )

    return (
        <div className="not-connected-page">
            <CommonPage>
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <Button label={reloadButtonText("Перезагрузить")} onClick={onRefresh}/>
            </CommonPage>
        </div>
    )
}

export default NotConnectedPage;