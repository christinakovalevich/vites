import React, {useEffect, useState} from "react";
import "./MentorsPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import ToggleModeContainer from "../../Common/ToggleMode/ToggleModeContainer/ToggleModeContainer";
import Loader from "../../Common/Loader/Loader";
import AlertError from "../../Common/Alert/AlertError/AlertError";

const MentorsPage = ({title, getMentors, sortMentors, toggleModeContainerProps}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        getMentors()
            .then(courses => {
                setMentors(courses);
                setError(false);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getMentors]);

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertError/>
    }

    return (
        <div className="mentors-page">
            <DefaultPage>
                <h1>{title}</h1>

                <ToggleModeContainer {...toggleModeContainerProps}/>

            </DefaultPage>
        </div>
    )
};

export default MentorsPage;