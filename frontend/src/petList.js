import {Fragment, useEffect, useState} from "react";
import * as con from './constants';
import Image from "./assets/default-pet-image.jpg";
import {Link, useNavigate} from "react-router-dom";
import useFetch from "./proccess_data/use_fetch";
import {Button, Card, Col, Container, Row} from 'react-bootstrap';

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [email, setEmail] = useState(localStorage.getItem('userEmail'));

    const {
        data,
        error,
        isPending
    } = useFetch(con.URL + con.API_GET_PETS_BY_USER_EMAIL + localStorage.getItem('userEmail'));

    useEffect(() => {
        console.log("pets", data)
        setPets(data);
    }, [data]);

    useEffect(() => {
        setEmail(localStorage.getItem('userEmail'));
    }, [email]);

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
        if (isPending) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!data || !data.length) {

            return <div>No pets found.
                <div className="pet-add">
                    <Link to={'/add/pet'}>
                        <button>
                            <img className="pet-add-image" src={require("./assets/add-pet-image.png")}
                                 alt="Add a new pet"/>
                        </button>
                    </Link>
                    <p> Add pet</p>
                </div>
            </div>;
        }
        return (
            <Container>
                <Row xs={12} sm={12} md={6} lg={6} className="g-4">
                    {pets &&
                    pets.map(pet => (
                            <Fragment key={pet.id}>
                                {/* {console.log(pet)} */}
                                <Pet pet={pet} handleDelete={handleDelete} getPetImage={getPetImage}/>
                            </Fragment>
                        )
                    )}
                    <Col xs={12} sm={12} md={6} lg={4}>
                        <Card bg='secondary'>
                            <Card.Link className="card-link" href="/add/pet">
                                <Card.Img
                                    src={require("./assets/add-pet-image.png")}
                                    alt="Example Image"
                                    style={{opacity: 0.7}}/>

                                <Card.Body>
                                    <Card.Title>Add new pet</Card.Title>

                                </Card.Body>
                            </Card.Link>
                        </Card>
                    </Col>
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

const Pet = ({pet, handleDelete, getPetImage}) => {
    const navigate = useNavigate();
    const age = Math.floor((Date.now() - new Date(pet.dateOfBirth)) / 31557600000);
    const petId = pet.id;

    const onView = (petId) => {
        navigate(con.PET + petId);
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
                        <Button variant="warning" size='sm' onClick={() => onEdit(petId)}>Edit</Button>
                        <Button variant="danger" size='sm' onClick={() => onDelete(petId)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )


}

export default PetList;