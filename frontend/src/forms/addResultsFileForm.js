import {useEffect, useState} from "react";
import * as constants from "../constants";
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const AddResultsFileForm = ({data, setData}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage !== token) {
            setToken(tokenFromLocalStorage);
        }
    }, [token]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile && allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
            setResults(selectedFile);
            setError(null);
        } else {
            setResults(null);
            setError("Please select a PNG, JPG, or PDF file smaller than 5MB.");
        }
    };

    const onResultImageSubmit = (event) => {
        event.preventDefault();

        if (results) {
            const dataFile = results;
            const formDataUpload = new FormData();
            formDataUpload.append("results", dataFile);
            console.log(token);
            fetch(constants.URL + constants.API_GET_RESULTS_FROM_IMAGE, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: formDataUpload,
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    const newData = data.map((item) => {
                        const responseItem = responseData.factors.find((response) => response.bloodFactorType === item.name);
                        if (responseItem) {
                            return {
                                ...item,
                                value: responseItem.value
                            };
                        } else {
                            return item;
                        }
                    });
                    setData(newData); // update the data in the parent component
                    alert("Results uploaded successfully!");
                })
                .catch(error => {
                    console.log(error);
                });
        }

    };

    return (
        <div className='row justify-content-center my-5'>
            <Form onSubmit={onResultImageSubmit}>
                <Form.Text className="text-muted"> Upload blood results image of your pet to get tag values.</Form.Text>
                <Form.Group className="mb-3" controlId="results">
                    <Form.Label>Select a PNG, JPG, or PDF file (max 5MB):</Form.Label>
                    <Form.Control type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange}/>
                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                </Form.Group>
                <Button type="submit" disabled={!results}>Upload file</Button>

            </Form>
        </div>
    );
}

export default AddResultsFileForm;