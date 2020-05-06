import React from "react";

import "./LoginForm.css"
import DefaultPage from "../Common/DefaultPage/DefaultPage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";

const LoginForm = ({userDetails, error, inputChangeHandler, onSubmit}) => {
    return (
        <DefaultPage>
            <div className="login-form">

                <div className="title">
                    <h1>
                        <FontAwesomeIcon icon={faSignInAlt}/> Войти в систему
                    </h1>
                </div>

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Имя пользователя:</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            autoComplete="on"
                            value={userDetails.username}
                            onChange={inputChangeHandler}
                            placeholder="Введите имя пользователя"/>
                        <Form.Text className="text-muted">
                            Ваши данные под надёжной защитой.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль:</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            autoComplete="on"
                            value={userDetails.password}
                            onChange={inputChangeHandler}
                            placeholder="Введите пароль"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            </div>
        </DefaultPage>
    )
};

export default LoginForm