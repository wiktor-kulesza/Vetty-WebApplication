import {Fragment, useEffect, useState} from "react";
import * as con from './constants';
import Image from "./assets/default-pet-image.jpg";
import {useNavigate} from "react-router-dom";
import useFetch from "./proccess_data/use_fetch";
import {Button, Card, Col, Container, Row} from 'react-bootstrap';

const PetList = (passedEmail) => {
    const [pets, setPets] = useState([]);
    const [email, setEmail] = useState(passedEmail.passedEmail);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
    const [isYourProfile, setIsYourProfile] = useState(email === userEmail);

    const [petsUrl, setPetsUrl] = useState(isYourProfile ? con.URL + con.API_GET_PETS_BY_USER_EMAIL + email : con.URL + con.API_GET_PETS_WITH_PUBLIC_MED_HIS_BY_USER_EMAIL + "?" + email);

    console.log("passedEmail", email)
    console.log("userEmail", userEmail)

    useEffect(() => {
        setIsYourProfile(userEmail === email);
        setPetsUrl(isYourProfile ? con.URL + con.API_GET_PETS_BY_USER_EMAIL + email : con.URL + con.API_GET_PETS_WITH_PUBLIC_MED_HIS_BY_USER_EMAIL + email);
    }, [userEmail, email, isYourProfile]);

    useEffect(() => {
        setUserEmail(localStorage.getItem('userEmail'));
    }, []);

    const {
        data,
        error,
        isPending
    } = useFetch(petsUrl);

    useEffect(() => {
        setPets(data);
    }, [data]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete the pet?")) {
            try {
                fetch(con.URL + con.API_DELETE_PET_BY_ID + id, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                }).then(response => {
                    if (response.status !== 200) {
                        console.log(response)
                        throw new Error('Failed to delete pet');
                    }
                    const currPets = pets.filter((pet) => pet.id !== id);
                    setPets(currPets);
                }).catch(error => {
                    console.log(error)
                });
            } catch (e) {
                console.error(e);
            }
        }

    };

    const getPetImage = (id) => {
        const petFound = pets.find(pet => (pet.id === id && pet.image.imageBase64 != null));
        if (petFound) {
            return petFound.image.imageBase64;
        }
        return null;
    }

    const renderPetList = () => {
        console.log("pets", pets)
        if (isPending) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!data || !data.length) {
            return (
                <div>
                    No pets found.
                    {isYourProfile &&
                    <div className="pet-add">

                        <Col xs={12} sm={12} md={6} lg={4} className="">
                            <Card className="add-pet-card">
                                <Card.Link className="card-link" href="/add/pet">
                                    <Card.Img
                                        variant="top"
                                        src={require("./assets/add-pet-image.png")}/>
                                    <Card.Body>
                                        <Card.Title> Add new pet</Card.Title>
                                    </Card.Body>
                                </Card.Link>
                            </Card>
                        </Col>
                    </div>
                    }
                </div>);
        }
        return (
            <Container className="myXD">
                <Row xs={12} sm={12} md={6} lg={6} className="g-4">
                    {pets && pets.map(pet => (
                            <Fragment key={pet.id}>
                                <Pet pet={pet} handleDelete={handleDelete} getPetImage={getPetImage}
                                     isYourProfile={isYourProfile}/>
                            </Fragment>
                        )
                    )}
                    {isYourProfile &&
                    <Col xs={12} sm={12} md={6} lg={4} className="">
                        <Card className="add-pet-card">
                            <Card.Link className="card-link" href="/add/pet">
                                <Card.Img
                                    variant="top"
                                    src={require("./assets/add-pet-image.png")}/>
                                <Card.Body>
                                    <Card.Title> Add new pet</Card.Title>
                                </Card.Body>
                            </Card.Link>
                        </Card>
                    </Col>}
                </Row>

            </Container>

        );
    };

    return (
        <div>
            <h2>Pet List</h2>

            {renderPetList()}
        </div>
    );
}

const Pet = ({pet, handleDelete, getPetImage, isYourProfile}) => {
    const navigate = useNavigate();
    const age = Math.floor((Date.now() - new Date(pet.dateOfBirth)) / 31557600000);
    const petId = pet.id;

    const onView = (petId) => {
        navigate(con.PET + petId, {state: {petData: pet}});
    }

    const onEdit = (petId) => {
        navigate(con.MODIFY_PET + petId);
    }

    const onDelete = (petId) => {
        handleDelete(petId);
    }

    return (
        <Col key={pet.id} xs={12} sm={12} md={6} lg={4}>
            <Card>
                <Card.Img variant="top" src={pet.imageId ? `data:image/jpeg;base64,${getPetImage(pet.id)}` : Image}/>
                <Card.Body>
                    <Card.Title>{pet.name}</Card.Title>
                    <Card.Text>
                        {pet.breed && <p>Breed: {pet.breed}</p>}
                        {age && <p>Age: {age} years</p>}
                        {pet.name && <p>Name: {pet.name}</p>}
                    </Card.Text>
                    <div style={{maxWidth: '100%'}}>
                        <Button variant="primary" size='sm' onClick={() => onView(petId)}>View</Button>
                        {isYourProfile &&
                        <Button variant="warning" size='sm' onClick={() => onEdit(petId)}>Edit</Button>}
                        {isYourProfile &&
                        <Button variant="danger" size='sm' onClick={() => onDelete(petId)}>Delete</Button>}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetList;