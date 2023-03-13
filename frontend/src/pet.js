import axios from "axios";
import PetMedicalHistoryList from "./petMedicalHistoryList";
import * as constants from "./constants";
import {Link, useParams} from "react-router-dom";
import Image from "./assets/default-pet-image.jpg";
import useFetch from "./use_fetch";

const Pet = () => {
    const {id} = useParams();
    console.log(id)
    const {data: petData, error, isPending} = useFetch(constants.URL + constants.API_GET_PET_BY_ID + id);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(constants.API_DELETE_PET_BY_ID + id);
            if (response.status !== 200) {
                throw new Error('Failed to delete pet');
            }
            window.location.href = '/';
        } catch (e) {
            console.error(e);
        }
    };

    const renderPet = () => {
        if (isPending) {
            return <div>Loading...</div>;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }
        if (petData) {
            return (
                <div className="pet">
                    {<img className="pet-image"
                          src={petData.image && petData.image.imageBase64 ? `data:image/jpeg;base64,${(petData.image.imageBase64)}` : Image}
                          alt={petData.name}/>}
                    {petData.species && <p> {petData.species}</p>}
                    {petData.name && <p> Name: {petData.name}</p>}
                    {petData.breed && <p>Breed: {petData.breed.name}</p>}
                    {petData.birthDate && <p>Birth date: {petData.birthDate}</p>}
                    {petData.medicalHistories && <PetMedicalHistoryList medicalHistories={petData.medicalHistories}/>}
                    <div className="pet-buttons">
                        <Link to={`/add/medicalHistory/${petData.id}`}>
                            <button>Add medical history</button>
                        </Link>
                        <Link to={`/modify/pets/${petData.id}`}>
                            <button>Modify</button>
                        </Link>
                        <button onClick={() => handleDelete(petData.id)}>Delete</button>
                    </div>
                </div>
            )
        } else {
            return <div>No pets found.</div>;
        }
    }
    return (
        <div>
            <h2>Your Pet</h2>
            {renderPet()}
        </div>
    );
}

export default Pet;