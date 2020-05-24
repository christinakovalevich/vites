import React from "react";
import {Table} from "react-bootstrap";

const CourseWorkTable = ({data = []}) => {
    const transformData = (data) => data.map(({student, repositoryLink}, i) => (
        <tr key={i}>
            <td>{i + 1}</td>
            <th>{student.fullName}</th>
            <th>
                {
                    repositoryLink ? (
                        <a href={repositoryLink}
                           rel="noopener noreferrer"
                           target="_blank">{repositoryLink}</a>
                    ) : "--"
                }
            </th>
        </tr>
    ))
    
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Студент</th>
                    <th>Ссылка на репозиторий</th>
                </tr>
            </thead>
            <tbody>
                {
                    transformData(data)
                }
            </tbody>
        </Table>
    )
}

export default CourseWorkTable