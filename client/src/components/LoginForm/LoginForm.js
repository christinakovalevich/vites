import React from "react";
import DefaultPage from "../Common/DefaultPage/DefaultPage";
import Form from "react-bootstrap/Form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {Col, Container, Row} from "react-bootstrap";
import Button from "../Common/Button/Button";

import "./LoginForm.css"

const LoginForm = ({userDetails, error, inputChangeHandler, onSubmit}) => {
    return (
        <DefaultPage>
            <div className="login-form">

                <div className="title">
                    <h1>
                        <FontAwesomeIcon icon={faSignInAlt}/> Войти в систему
                    </h1>
                </div>

                <Container>
                    <Row>
                        <Col/>
                        <Col lg={6}>
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
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Пароль:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        autoComplete="on"
                                        value={userDetails.password}
                                        onChange={inputChangeHandler}
                                        placeholder="Введите пароль"/>
                                    <Form.Text className="text-muted">
                                        Ваши данные находятся под надёжной защитой.
                                    </Form.Text>
                                </Form.Group>

                                <Button label="Войти" submit/>

                            </Form>
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </div>
        </DefaultPage>
    )
};

export default LoginForm