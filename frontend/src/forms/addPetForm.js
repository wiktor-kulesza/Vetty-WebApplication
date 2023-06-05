import * as constants from '../constants/constants';
import {useEffect, useState} from 'react';
import useFetch from '../services/use_fetch';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

const AddPetForm = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [selectedSex, setSelectedSex] = useState('MALE');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedBirthDate, setSelectedBirthDate] = useState('');

    const handleSpeciesChange = (event) => {
        setSelectedSpecies(event.target.value);
    };

    const handleBreedChange = (event) => {
        setSelectedBreed(event.target.value);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleBirthDateChange = (event) => {
        setSelectedBirthDate(event.target.value);
    };


    const handleSexChange = (event) => {
        setSelectedSex(event.target.value);
    };

    const handleFileValidation = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setErrorMessage('Please select a file.');
            setSelectedImage(null);
        } else if (!file.type.includes('image')) {
            setErrorMessage('Please select a PNG or JPG image.');
            setSelectedImage(null);
        } else if (file.size > 3000000) {
            setErrorMessage('Please select a file less than 3MB in size.');
            setSelectedImage(null);
        } else {
            setErrorMessage('');
            setSelectedImage(file);
            setSelectedImageName(file.name);
        }
    }

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage !== token) {
            setToken(tokenFromLocalStorage);
        }
    }, [token]);

    const {data: breeds} = useFetch(constants.URL + constants.API_GET_ALL_BREEDS);
    const postPet = (imageId) => {
        console.log("post pet")
        console.log("image id", imageId)
        try {
            fetch(constants.URL + constants.API_ADD_PET, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    species: selectedSpecies,
                    name: selectedName,
                    sex: selectedSex,
                    breedName: selectedBreed,
                    birthDate: selectedBirthDate,
                    ownerEmail: localStorage.getItem('userEmail'),
                    imageId: imageId
                })
            })
                .then(response => {
                    navigate('/');
                })
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Submit")
        if (window.confirm("Are you sure you want to add pet?")) {
            if (selectedImage) {
                console.log("image", selectedImage)
                console.log("image name", selectedImage.name)
                const blob = new Blob([selectedImage], {type: selectedImage.type, name: selectedImageName});
                const file = new File([blob], selectedImageName, {type: blob.type})
                const formData = new FormData();
                formData.append("image", file);
                console.log("image post")
                console.log("FORM DATA", formData)
                console.log(token);
                fetch(constants.URL + constants.API_ADD_IMAGE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "POST",
                    body: formData,
                })
                    .then(response => response.json())
                    .then(imageId => postPet(imageId))
            } else {
                postPet();
            }
        }

    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId='species'>
                <Form.Label>Species</Form.Label>
                <Form.Control as="select" value={selectedSpecies ? selectedSpecies : ''} onChange={handleSpeciesChange}
                              required>
                    <option value="">Select a species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sex">
                <Form.Label> Sex </Form.Label>
                <Form.Check
                    type="radio"
                    label="Male"
                    name="sex"
                    value="MALE"
                    checked={selectedSex === 'MALE'}
                    onChange={handleSexChange}
                />
                <Form.Check
                    type="radio"
                    label="Female"
                    name="sex"
                    value="FEMALE"
                    checked={selectedSex === 'FEMALE'}
                    onChange={handleSexChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Pet name"
                    maxLength="16"
                    value={selectedName}
                    pattern="[A-Za-z]+"
                    onChange={handleNameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId='breed'>
                <Form.Label>Breed</Form.Label>
                <Form.Control as="select" value={selectedBreed ? selectedBreed : ''} onChange={handleBreedChange}
                              required>
                    <option value="">Select a breed</option>
                    {breeds && breeds.filter(
                        (breed) => breed.type.toLowerCase() === selectedSpecies.toLowerCase()).sort((a, b) => a.name.localeCompare(b.name))
                        .map((breed) => (
                            <option key={breed.id} value={breed.name}>
                                {breed.name.toLowerCase()}</option>
                        ))}
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="birthDate">
                <Form.Label>Birth date</Form.Label>
                <input id="birthDate" className="form-control" type="date" max={new Date().toISOString().split('T')[0]}
                       onChange={handleBirthDateChange}/>
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => handleFileValidation(event)}
                />
                {errorMessage}
            </Form.Group>

            <Button variant="primary" type="submit">Add</Button>
        </Form>
    );
};

export default AddPetForm;