import * as constants from '../constants';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Row} from 'react-bootstrap';

const AddMedicalHistoryForm = ({petId, data: factors, setData: setFactors}) => {
    const navigate = useNavigate();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [diagnosis, setDiagnosis] = useState(null);
    const [description, setDescription] = useState(null);
    const [date, setDate] = useState(null);
    const [isMedicalHistoryPublic, setIsMedicalHistoryPublic] = useState(true);
    const handlePublicToggle = () => setIsMedicalHistoryPublic(!isMedicalHistoryPublic);
    // const [formFactors, setFormFactors] = useState([factors]);

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage !== token) {
            setToken(tokenFromLocalStorage);
        }
    }, [token]);

    useEffect(() => {
        setFactors(factors);
    }, [factors, setFactors]);

    const changeFactorValue = (value, factorName) => {
        factors.map(factor => {
            if (factor.name === factorName) {
                factor.value = Number(value);
                return factor;
            }
            return factor;
        });
        console.log("factors", factors);
    }

    const onMedicalHistorySubmit = (event) => {
        event.preventDefault();
        const factorArray = [];

        for (const [index, factor] of Object.entries(factors)) {
            console.log(index, factor);
            if (factors.find(fct => fct.name.toUpperCase() === factor.name)) {
                factorArray.push({bloodFactorType: factor.name, value: factor.value})
            }
        }
        fetch(constants.URL + constants.API_ADD_MEDICAL_HISTORY, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                description: description,
                diagnosis: diagnosis,
                bloodResults: factorArray,
                isPublic: isMedicalHistoryPublic,
                petId: petId
            })
        }).then(response => {
            console.log(response);
            navigate(constants.HOME);
        })
            .catch(error => {
                console.log(error);
            })
    };


    return (
        <div className='row justify-content-center my-5'>
            <Form onSubmit={onMedicalHistorySubmit}>
                <div className='row row align-items-start'>
                    <div className='col-12 col-md-6'>
                        <Form.Group className="mb-3" controlId="diagnosis">
                            <Form.Label>Diagnosis:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. stomach tumor"
                                onChange={(event) => setDiagnosis(event.target.value)}
                                required/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Date:</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="When ilness started"
                                onChange={(event) => setDate(event.target.value)}
                                required/>
                        </Form.Group>
                        <Form.Group controlId="isPublic">
                            <Form.Label>Visibility</Form.Label>
                            <Form.Check
                                type="switch"
                                id="publicToggle"
                                label={isMedicalHistoryPublic ? "Public" : "Private"}
                                checked={isMedicalHistoryPublic}
                                onChange={handlePublicToggle}
                            />
                        </Form.Group>
                    </div>
                    <div className='col-12 col-md-6'>
                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description of illness history:</Form.Label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="7"
                                onChange={(event) => {
                                    setDescription(event.target.value)
                                }}>
                            </textarea>
                        </Form.Group>
                    </div>
                </div>

                <Row>
                    {factors.map((factor, index) => (
                        <Col md={3} key={index}>
                            <Form.Group className="mb-3" controlId={factor.name}>
                                <Form.Label>{factor.name.toUpperCase()}</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    defaultValue={factor.value}
                                    onChange={(event) => changeFactorValue(event.target.value, factor.name)}
                                    required/>
                            </Form.Group>
                        </Col>
                    ))}
                </Row>
                <Button type="submit">Submit</Button>
            </Form>

        </div>

    );
};

export default AddMedicalHistoryForm;