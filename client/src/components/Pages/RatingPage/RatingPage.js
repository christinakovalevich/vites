import React, {useEffect, useState} from "react";

import "./RatingPage.css"
import DefaultPage from "../../Common/DefaultPage/DefaultPage";
import Loader from "../../Common/Loader/Loader";
import AlertError from "../../Common/Alert/AlertError/AlertError";
import CourseWorkForm from "../../CourseWorkForm/CourseWorkForm";
import ApiService from "../../../services/Api/ApiService";

const RatingPage = ({title, getData}) => {

    const [hasError, setError] = useState(false);
    const [hasLoaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getData()
            .then(data => {
                setData(data);
                setError(false);
                setLoaded(true);
            })
            .catch(error => {
                setError(true);
                setLoaded(true);
                console.error(error);
            })
    }, [getData]);

    const onSubmit = (id, updatedData) => {
        ApiService.updateCourseWork(id, updatedData)
            .then(r => {
                console.log(r)
                getData()
                    .then(data => {
                        setData(data);
                        setError(false);
                        setLoaded(true);
                    })
                    .catch(error => {
                        setError(true);
                        setLoaded(true);
                        console.error(error);
                    })
            }).catch(console.error)
    }

    if (!hasLoaded) {
        return <Loader/>
    }

    if (hasError) {
        return <AlertError/>
    }

    const getForms = (data) => {
        return data.map(it => (
            <div className="mb-4" key={it.id}>
                <CourseWorkForm data={it}
                                onSubmit={onSubmit}/>
            </div>
        ))
    }

    return (
        <div className="rating-page">
            <DefaultPage>
                <div className="title">
                    <h1>{title}</h1>
                </div>
                <div className="mt-4 mb-2">
                    <h6>
                        Пожалуйста укажите ссылки на репозитории Ваших курсовых проектов.
                    </h6>
                </div>
                <br/>
                {
                    getForms(data)
                }

            </DefaultPage>
        </div>
    )
};

export default RatingPage;