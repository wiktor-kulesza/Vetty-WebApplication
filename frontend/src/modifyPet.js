import React from "react";
import {useParams} from "react-router-dom";
import useFetch from "./use_fetch";
import ModifyPetForm from "./modifyPetForm";

const ModifyPet = () => {
    const {petId} = useParams();
    console.log(petId)
    const {error, isPending, data: pet} = useFetch("http://localhost:8080/api/pets/" + petId);
    console.log(pet)

    return (
        <div>
            <h1>Modify Pet Data</h1>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {pet && <ModifyPetForm pet={pet}/>}
        </div>
    );
};

export default ModifyPet;
