import {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import * as constants from '../constants/constants';
import {Button, Collapse, Table} from "react-bootstrap";
import PetMedicalHistoryResults from "./petMedicalHistoryResults";

const PetMedicalHistoryList = ({medicalHistories, petId, isYourProfile}) => {
    const [data, setData] = useState(medicalHistories);
    const [resultsShown, setResultsShown] = useState([]);

    const handleResultsToggle = (medHisId) => {
        console.log("medicalHistories", medicalHistories);
        setResultsShown((prevDetailsShown) => {
            if (prevDetailsShown.includes(medHisId)) {
                return prevDetailsShown.filter((id) => id !== medHisId);
            } else {
                return [...prevDetailsShown, medHisId];
            }
        });
    };

    const handleDelete = async (id) => {
        try {
            fetch(constants.URL + constants.API_DELETE_MEDICAL_HISTORY_BY_ID + id, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response)
                    throw new Error('Failed to delete medical history');
                } else {
                    //update the list of medical histories
                    setData(data.filter((medicalHistory) => medicalHistory.id !== id));
                }

            }).catch(error => {
                console.log(error)
            });
        } catch (e) {
            console.error(e);
        }
    };

    const MedicalHistory = ({medicalHistory, index}) => {
        return (
            <tr>
                <td> {index} </td>
                <td className="text-nowrap"> {medicalHistory.diagnosis} </td>
                <td className="text-nowrap"> {medicalHistory.date} </td>
                <td> {medicalHistory.description}</td>
                <td>
                    {medicalHistory.isPublic ? "Public" : "Private"}
                </td>
                <td>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleResultsToggle(medicalHistory.id)}
                        aria-controls="example-collapse-text">
                        {resultsShown.includes(medicalHistory.id) ? 'Hide' : 'Show'}
                    </Button>
                    <Button
                        variant='danger'
                        size="sm"
                        onClick={() => handleDelete(medicalHistory.id)}>
                        Delete
                    </Button>
                </td>
            </tr>
        )
    }

    const renderMedicalHistory = () => {
        if (medicalHistories) {
            return (
                <div className="medicalHistoryList">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Diagnosis</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th> Visibility</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((medicalHistory, index) => (
                                <Fragment key={medicalHistory.id}>
                                    <MedicalHistory medicalHistory={medicalHistory} index={index}/>
                                    <tr>
                                        <td colSpan="5">
                                            <Collapse in={resultsShown.includes(medicalHistory.id)}>
                                                <div id="example-collapse-text">
                                                    <PetMedicalHistoryResults results={medicalHistory.results}/>
                                                </div>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))
                        }
                        {isYourProfile &&
                        <tr>
                            <td colSpan={5}>
                                <Button className="ms-auto" variant="primary" size="sm" as={Link}
                                        to={constants.ADD_MEDICAL_HISTORY + petId}> Add Medical History </Button>
                            </td>
                        </tr>
                        }
                        </tbody>

                    </Table>
                </div>
            )
        } else {
            return <div>No medical histories found.</div>;
        }
    }
    return (
        <div>
            {renderMedicalHistory()}
        </div>
    );
}

export default PetMedicalHistoryList;