import React, {useState} from "react";
import "./SettingsPage.css";
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import {Form} from "reactstrap";
import {Button, FormLabel, InputGroup} from "react-bootstrap";
import FormControl from "react-bootstrap/FormControl";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faSave} from "@fortawesome/free-solid-svg-icons";

const SettingsPage = ({title, serverInfo, onServerUrlSubmit}) => {

    const [isUrlDisabled, setUrlDisabled] = useState(true);
    const [serverUrl, setServerUrl] = useState(serverInfo.url)

    const onServerUrlChange = ({target}) => {
        setServerUrl(target.value)
    }

    return (
        <div className="settings-page">
            <DefaultPage>
                <h1>{title}</h1>

                <div className="server-info-form">
                    <Form onSubmit={onServerUrlSubmit}>
                        <InputGroup>
                            <FormControl
                                type="url"
                                name="url"
                                value={serverUrl}
                                onChange={onServerUrlChange}
                                placeholder="http://127.0.0.1:8080"
                                disabled={isUrlDisabled}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary"
                                        onClick={() => setUrlDisabled(!isUrlDisabled)}
                                ><FontAwesomeIcon icon={faPen}/></Button>
                                <Button variant="outline-secondary"
                                ><FontAwesomeIcon icon={faSave}/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
            </DefaultPage>
        </div>
    )
};

export default SettingsPage;

SettingsPage.propTypes = {
    title: PropTypes.string,
    serverInfo: PropTypes.object,
    onServerUrlChange: PropTypes.func,
    onServerUrlSubmit: PropTypes.func,
}