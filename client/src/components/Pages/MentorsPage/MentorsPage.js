import React, {useEffect, useState} from "react";
import "./MentorsPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";

const MentorsPage = ({title, getMentors, sortMentors, toggleModeContainerProps}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        getMentors()
            .then(courses => {
                setMentors(courses);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getMentors])

    return (
        <div className="mentors-page">
            <DefaultPage>
                <h1>{title}</h1>

                <ToggleModeContainer {...toggleModeContainerProps}/>

            </DefaultPage>
        </div>
    )
};

export default MentorsPage