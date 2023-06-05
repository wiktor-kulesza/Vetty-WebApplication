import React, {useEffect, useState} from "react";
import DefaultImage from "../assets/default-pet-image.jpg";
import {useNavigate} from "react-router-dom";
import useFetch from '../services/use_fetch';
import * as constants from "../constants/constants";
import {Button, Form, Image, Row} from "react-bootstrap";

const ModifyPetForm = ({pet}) => {
    const navigate = useNavigate();
    console.log("pet: ", pet);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [selectedSex, setSelectedSex] = useState(pet.sex);
    const [selectedSpecies] = useState(pet.species);
    const [selectedBreed, setSelectedBreed] = useState(pet.breedName);
    const [orginalImage, setOriginalImage] = useState(pet.image);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedName, setSelectedName] = useState(pet.name);
    const [selectedBirthDate, setSelectedBirthDate] = useState(pet.birthDate);

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        setToken(tokenFromLocalStorage);
    }, []);

    function getFileFormat(fileName) {
        const regex = /\.[^\.]+$/; // Match the last period and any non-period characters after it
        const match = fileName.match(regex); // Get the matched string
        return match ? match[0].substr(1) : null; // Remove the period from the match and return it, or return null if no match
    }

    function getImageSource() {
        if (selectedImage && selectedImage !== pet.image) {
            return URL.createObjectURL(selectedImage);
        } else if (orginalImage && orginalImage.imageBase64) {
            return `data:image/${fileFormat};base64,${orginalImage.imageBase64}`;
        } else {
            return DefaultImage;
        }

    }

    const [fileFormat] = useState((pet && pet.image && pet.image.name) ? getFileFormat(pet.image.name) : "jpg");

    const {error, isPending, data: breeds} = useFetch("http://localhost:8080/api/breeds/all");

    const handleSexChange = (event) => {
        setSelectedSex(event.target.value);
    };

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
    };

    const handleBreedChange = (event) => {
        setSelectedBreed(event.target.value);
    };
    const handleBirthDateChange = (event) => {
        setSelectedBirthDate(event.target.value);
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


    const updatePet = async (imageId) => {
        const modifiedPet = {
            id: pet.id,
            name: selectedName.length > 0 ? selectedName : pet.name,
            sex: selectedSex,
            species: selectedSpecies,
            breedName: selectedBreed,
            birthDate: selectedBirthDate,
            medicalHistories: pet.medicalHistories,
            ownerEmail: localStorage.getItem('userEmail'),
            imageId: imageId
        };
        const requestOptions = {
            method: "PUT",
            headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
            body: JSON.stringify(modifiedPet)
        };
        const response = await fetch(constants.URL + constants.API_MODIFY_PET_BY_ID + pet.id, requestOptions)
        const responseData = await response.json();
        if (responseData) {
            console.log("Pet modified successfully");
            navigate(constants.HOME);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (window.confirm("Are you sure you want to modify pet?")) {
            if (selectedImage !== null && selectedImage !== orginalImage) {
                console.log("ADDING IMAGE");
                console.log("image", selectedImage)
                console.log("image name", selectedImage.name)
                const blob = new Blob([selectedImage], {type: selectedImage.type, name: selectedImageName});
                const file = new File([blob], selectedImageName, {type: blob.type});
                const formData = new FormData();
                formData.append("image", file);
                const response = await fetch(constants.URL + constants.API_ADD_IMAGE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: "POST",
                    body: formData,
                })
                const responseData = await response.json();
                console.log("RESPONSE DATA", responseData);
                await updatePet(responseData);
            } else {

                await updatePet(orginalImage ? pet.imageId : null);
            }
        }
    }

    return (
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {breeds &&
            <Form onSubmit={onSubmit}>
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
                    <Form.Control as="select" value={selectedBreed ? selectedBreed : ''}
                                  onChange={handleBreedChange}
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
                <Form.Group className="mb-3">
                    <Form.Label>Birth date</Form.Label>
                    <input id="birthDate" className="form-control" type="date" value={selectedBirthDate}
                           max={new Date().toISOString().split('T')[0]}
                           onChange={handleBirthDateChange}/>
                </Form.Group>
                <Form.Group controlId="image">

                    <Form.Label>Image</Form.Label>
                    <Row className="mb-3">
                        <div style={{width: '250px', height: '250px'}}>
                            <Image className="pet-image"
                                   fluid={true}
                                   src={getImageSource()}
                                   style={{objectFit: 'cover', width: '100%', height: '100%'}}
                                   alt={pet.name}/></div>

                    </Row>
                    <Row>
                        <Form.Control
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={(event) => handleFileValidation(event)}
                            defaultValue={""}
                        />
                        <Button className="mb-3" variant="danger" onClick={() => setOriginalImage(null)}>Remove orginal
                            image</Button>
                    </Row>
                    {errorMessage}
                </Form.Group>

                <Button className="mr-3" variant="primary" type="submit">Modify</Button>
            </Form>

            }
        </div>
    );
};

export default ModifyPetForm;
