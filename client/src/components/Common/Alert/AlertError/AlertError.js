import React from "react";
import {Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const AlertError = ({title, text, homePathname}) => {
    return (
        <Alert variant="warning" className="m-3">
            <Alert.Heading>
                <FontAwesomeIcon icon={faExclamationTriangle}/> {title}</Alert.Heading>
            <p>
                {
                    text
                }
            </p>
            <p>
                Вы можете вернуться <Link to={homePathname} className="alert-link">
                на главную
            </Link> страницу.
            </p>

        </Alert>
    )
};

export default AlertError

AlertError.defaultProps = {
    title: "Упс.. Кажется произошла ошибка!",
    text: "Change this and that and try again. Duis mollis, est non commodo\n" +
        "                luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.\n" +
        "                Cras mattis consectetur purus sit amet fermentum.",
    homePathname: '/',
}