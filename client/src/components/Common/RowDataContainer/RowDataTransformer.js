import React, {Fragment} from "react";
import {Col, Row} from "react-bootstrap";
import CourseCard from "../../CourseCard/CourseCard";

const RowDataTransformer = ({dataArr}) => {

    const reshapeDataArr = (dataArr) => {
        let resultArr = [];

        if (Array.isArray(dataArr)) {
            let dataArrCopy = [...dataArr]
            while (dataArrCopy.length) {
                resultArr.push(dataArrCopy.splice(0, 3))
            }
        }

        return resultArr;
    }

    const transformDataArr = (dataArr) => {
        return reshapeDataArr(dataArr).map((row, i) => (
            <Row key={i}>
                {
                    row.map((col, i) => (
                        <Col key={i} lg={4}>
                            <CourseCard key={col.id} {...col}/>
                        </Col>
                    ))
                }
            </Row>
        ))
    };

    return (
        <Fragment>
            {
                transformDataArr(dataArr)
            }
        </Fragment>
    )
};

export default RowDataTransformer