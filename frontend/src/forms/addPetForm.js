import * as constants from '../constants';
import {useEffect, useState} from 'react';
import useFetch from '../proccess_data/use_fetch';
import {useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

const AddPetForm = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [selectedSex, setSelectedSex] = useState('MALE');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedBirthDate, setSelectedBirthDate] = useState('');

    const handleSpeciesChange = (event) => {
        console.log("Species change", event.target.value)
        setSelectedSpecies(event.target.value);
    };

    const handleBreedChange = (event) => {
        console.log("Breed change", event.target.value)
        setSelectedBreed(event.target.value);
    };

    const handleNameChange = (event) => {
        console.log("Name change", event.target.value)
        setSelectedName(event.target.value);
    };

    const handleBirthDateChange = (event) => {
        console.log("Birth date change", event.target.value)
        setSelectedBirthDate(event.target.value);
    };


    const handleSexChange = (event) => {
        console.log("Sex change", event.target.value)
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
                const blob = new Blob([selectedImage], {type: selectedImage.type});
                console.log("BLOB", blob)
                const formData = new FormData();
                formData.append("image", blob);
                console.log("image post")
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
                <Form.Control as="select" value={selectedSpecies ? selectedSpecies : ''} onChange={handleSpeciesChange}
                              required>
                    <option value="">Select a species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sex">
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
            <Form.Group className="mb-3" controlId="title">
                <Form.Control
                    type="text"
                    placeholder="Pet name"
                    maxLength="16"
                    value={selectedName}
                    pattern="[A-Za-z]+"
                    onChange={handleNameChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId='breed'>
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
                <input id="birthDate" className="form-control" type="date" max={new Date().toISOString().split('T')[0]}
                       onChange={handleBirthDateChange}/>
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => handleFileValidation(event)}
                />
                {errorMessage}
            </Form.Group>

            <Button className='float-end' variant="primary" type="submit">Add</Button>
        </Form>
    );
};

export default AddPetForm;