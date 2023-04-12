import {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import * as constants from './constants';
import {Button, Collapse, Table} from "react-bootstrap";

const PetMedicalHistoryList = ({medicalHistories, petId}) => {
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
                                                    <MedicalHistoryResults results={medicalHistory.results}/>
                                                </div>
                                            </Collapse>
                                        </td>
                                    </tr>
                                </Fragment>
                            ))
                        }
                        <tr>
                            <td colSpan={5}>
                                <Button className="ms-auto" variant="primary" size="sm" as={Link}
                                        to={constants.ADD_MEDICAL_HISTORY + petId}> Add Medical History </Button>
                            </td>
                        </tr>
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

const MedicalHistoryResults = ({results}) => {
    return (
        <div className="medicalHistoryResults">
            {results.map((result) => (
                <Table striped bordered hover>
                    <thead>
                    <th> Factor</th>
                    <th> Value</th>
                    <th> In Norm?</th>
                    </thead>
                    <tbody>
                    {
                        result.factors.map((factor) => (
                            <tr>
                                <td className="row-height"> {factor.bloodFactorType} </td>
                                <td className="row-height"> {factor.value} </td>
                                <td className="row-height"><FactorIndicator bloodFactorType={factor}/></td>
                            </tr>))
                    }
                    </tbody>
                </Table>
            ))}
        </div>)
}

const FactorIndicator = ({bloodFactorType}) => {

    function isInNorm() {
        return !bloodFactorType.high && !bloodFactorType.low;
    }

    function isHigh() {
        return bloodFactorType.high;
    }


    if (isInNorm()) {
        return (<p className='text-success'>In norm</p>)
    } else if (isHigh()) {
        return (<p className='text-danger'>Too high</p>)
    } else {
        return (<p className='text-danger'>Too low</p>)
    }
}

export default PetMedicalHistoryList;