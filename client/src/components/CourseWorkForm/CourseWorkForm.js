import React, {useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CourseWorkForm = ({onSubmit, data}) => {

    const [value, setValue] = useState(data.repositoryLink || '')

    const isValueDifferent = () => (data.repositoryLink || '') !== value

    const onChange = ({target}) => {
        setValue(target.value)
    }

    const onReset = () => {
        setValue(data.repositoryLink || '')
    }

    const onSubmitWrapper = (e) => {
        e.preventDefault();
        if (isValueDifferent()) {
            onSubmit({repositoryLink: value})
        }
    }

    return (
        <Form onSubmit={onSubmitWrapper}>
            <Form.Group controlId={data.id}>

                <Form.Label>{data.course.name}</Form.Label>
                <InputGroup>
                    <Form.Control
                        value={value}
                        type="url"
                        name="repositoryLink"
                        onChange={onChange}
                        placeholder="Введите URL репозитория "/>
                    {
                        isValueDifferent() ?
                            (
                                <>
                                    <InputGroup.Append>
                                        <Button type="submit"
                                                variant="outline-success">
                                            <FontAwesomeIcon icon={faCheck}/> Сохранить
                                        </Button>
                                    </InputGroup.Append>
                                    <InputGroup.Append>
                                        <Button type="reset"
                                                onClick={onReset}
                                                variant="outline-danger">
                                            <FontAwesomeIcon icon={faBan}/>
                                        </Button>
                                    </InputGroup.Append>
                                </>
                            ) : null
                    }

                </InputGroup>

                <Form.Text className="text-muted">
                    Формат: {'https://github.com/<username>/<repositoryName>'}
                </Form.Text>
            </Form.Group>
        </Form>
    )
}

export default CourseWorkForm