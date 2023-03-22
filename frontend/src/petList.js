import {Fragment, useEffect, useState} from "react";
import * as con from './constants';
import Image from "./assets/default-pet-image.jpg";
import {Link} from "react-router-dom";
import useFetch from "./proccess_data/use_fetch";

//TODO: czy aby na pewno chces zusunąć zwierzę? 

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [email, setEmail] = useState(localStorage.getItem('userEmail'));

    const {
        data,
        error,
        isPending
    } = useFetch(con.URL + con.API_GET_PETS_BY_USER_EMAIL + localStorage.getItem('userEmail'));

    useEffect(() => {
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
                    console.log(currPets)
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
            <div className="pets-list">
                {pets &&
                pets.map(pet => (
                        <Fragment key={pet.id}>
                            <Pet pet={pet} handleDelete={handleDelete} getPetImage={getPetImage}/>
                        </Fragment>
                    )
                )}
                <div className="pet-add">
                    <Link to={'/add/pet'}>
                        <button>
                            <img className="pet-add-image" src={require("./assets/add-pet-image.png")}
                                 alt="Add a new pet"/>
                        </button>
                    </Link>
                    <p> Add pet</p>
                </div>
            </div>

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
    const petId = pet.id;
    return (<div className="pet-preview" key={pet.id}>
        <Link to={con.PET + petId}>
            {<img className="pet-preview-image"
                  src={pet.imageId ? `data:image/jpeg;base64,${getPetImage(pet.id)}` : Image}
                  alt={pet.name}/>}
        </Link>
        {pet.species && <p> {pet.species}</p>}
        {pet.name && <p> Name: {pet.name}</p>}
        {pet.breed && <p>Breed: {pet.breed.name}</p>}
        {pet.birthDate && <p>Birth date: {pet.birthDate}</p>}
        <div className="pet-buttons">
            <Link to={con.MODIFY_PET + pet.id}>
                <button>Modify</button>
            </Link>
            <button onClick={() => handleDelete(pet.id)}>Delete</button>

        </div>
    </div>)
}

export default PetList;