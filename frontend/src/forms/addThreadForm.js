import {useEffect, useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import * as constants from '../constants';

const AddThreadForm = ({authorEmail, pets, onThreadAdded}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage !== token) {
            setToken(tokenFromLocalStorage);
        }
    }, [token]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedMedicalHistory, setSelectedMedicalHistory] = useState('');
    const [email, setEmail] = useState(localStorage.getItem('userEmail'));

    useEffect(() => {
        setEmail(localStorage.getItem('userEmail'));
    }, [email]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Function to handle pet selection
    const handlePetSelect = (e) => {
        const selectedPetId = e.target.value;
        const selectedPet = pets.find((pet) => pet.id === parseInt(selectedPetId));
        setSelectedPet(selectedPet);
        // Reset medical history selection when pet is changed
        setSelectedMedicalHistory(null);
    };

    // Function to handle medical history selection
    const handleMedicalHistorySelect = (e) => {
        const selectedMedialHistoryId = e.target.value;
        setSelectedMedicalHistory(selectedMedialHistoryId);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("selectedMedicalHistory", selectedMedicalHistory);
        // JSONify the form dat

        try {
            // Send a POST request with the form data to URL2 using async/await
            const response = await fetch(constants.URL + constants.API_ADD_THREAD, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    medicalHistoryId: selectedMedicalHistory,
                    authorEmail: authorEmail
                })
            })
            const data = await response.json();
            if (data) {
                const newThread = data
                console.log("newThread", newThread);
                onThreadAdded(newThread);
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange}/>
            </Form.Group>

            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter content" value={content}
                              onChange={handleContentChange}/>
            </Form.Group>
            <Form.Group controlId='pet'>
                <Form.Label>Select a Pet</Form.Label>
                <Form.Control as="select" value={selectedPet ? selectedPet.id : ''} onChange={handlePetSelect} required>
                    <option value="">-- Select Pet --</option>
                    {pets && pets.map((pet, index) => (
                        <option key={index} value={pet.id}>
                            {pet.name}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {selectedPet && (
                <Form.Group controlId='medicalHistory'>
                    <Form.Label>Select Medical History</Form.Label>
                    <Form.Control as="select" value={selectedMedicalHistory} onChange={handleMedicalHistorySelect}
                                  required>
                        <option value="">-- Select Medical History --</option>
                        {selectedPet.medicalHistories.filter(medHist => medHist.isPublic).map((history, index) => (
                            <option key={index} value={history.id}>
                                {history.diagnosis} - {history.date}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            )}
            <Button className='float-end' variant="primary" type="submit">Add</Button>
        </Form>

    );
};

export default AddThreadForm;