import React from "react";

import "./LoginForm.css"
import DefaultPage from "../Common/DefaultPage/DefaultPage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = ({userDetails, error, inputChangeHandler, onSubmit}) => {
    return (
        <DefaultPage>
            <div className="signIn-form">
                {error ? <p className="alert alert-danger">{error} </p> : null}

                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Имя пользователя</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={userDetails.username}
                            onChange={inputChangeHandler}
                            placeholder="Введите имя пользователя" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={inputChangeHandler}
                            placeholder="Введите пароль" />
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