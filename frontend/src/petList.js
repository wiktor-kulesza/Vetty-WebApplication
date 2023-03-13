import {Fragment, useEffect, useState} from "react";
import useFetch from './use_fetch';
import * as con from './constants';
import axios from 'axios';
import Image from "./assets/default-pet-image.jpg";
import {Link} from "react-router-dom";


//TODO: czy aby na pewno chces zusunąć zwierzę? 

const PetList = () => {
    const [pets, setPets] = useState([]);
    const {
        data,
        error,
        isPending
    } = useFetch(con.URL + con.API_GET_PETS_BY_USER_EMAIL + localStorage.getItem('userEmail'));
    useEffect(() => {
        setPets(data);
    }, [data]);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(con.URL + con.API_DELETE_PET_BY_ID + id);
            if (response.status !== 200) {
                throw new Error('Failed to delete pet');
            }
            setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
        } catch (e) {
            console.error(e);
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
        console.log("LAL")
        console.log(localStorage.getItem('userId'));
        if (isPending) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!data || !data.length) {
            return <div>No pets found.</div>;
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
    console.log(pet.id);
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