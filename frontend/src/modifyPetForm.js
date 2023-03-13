import React from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import useFetch from "./use_fetch";
import * as constants from "./constants";

const ModifyPetForm = ({pet}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const {error, isPending, data: breeds} = useFetch("http://localhost:8080/api/breeds/all");
    const {register, handleSubmit, formState: {errors}} = useForm();

    const validateName = (value) => {
        const nameRegex = /^[a-zA-Z ]{1,16}$/;
        if (!nameRegex.test(value)) {
            return 'Invalid name. Name should be shorter than 16 letters and only contain a-z, A-Z characters';
        }
    };

    const validateDateOfBirth = (value) => {
        const selectedDate = new Date(value);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            return 'Invalid date of birth. You cannot pick a date in the future';
        }
    };
    const onSubmit = (data) => {
        const modifiedPet = {
            id: pet.id,
            name: data.name,
            species: data.species || pet.species,
            breedName: data.breedName || null,
            birthDate: data.birthDate,
            medicalHistories: pet.medicalHistories,
            ownerId: pet.ownerId,
            image: data.image
        };
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(modifiedPet),
            Authorization: `Bearer ${token}`
        };
        console.log(token);
        fetch(constants.URL + constants.API_MODIFY_PET_BY_ID + pet.id, requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate('/');
                }
            });
    };

    return (
        <div>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {breeds &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>
                        Name:
                        <input type="text" {...register('name', {required: true, validate: validateName})}
                               defaultValue={pet.name}/>
                        {errors.name && <span> <br/> {errors.name.message}</span>}
                    </label>
                </div>

                <div>
                    <label>
                        Breed:
                        <select {...register('breedName', {required: true})} defaultValue={pet.breedName}>
                            <option value="">Select a breed</option>
                            {breeds.map((breed) => (
                                <option key={breed.id} value={breed.name}>{breed.name}</option>
                            ))}
                        </select>
                        {errors.breed && <span> <br/> This field is required</span>}
                    </label>
                </div>

                <div>
                    <label>
                        Date of birth:
                        <input type="date" {...register('birthDate', {required: true, validate: validateDateOfBirth})}
                               defaultValue={pet.birthDate}/>
                        {errors.birthDate && <span> <br/> {errors.birthDate.message}</span>}
                    </label>
                </div>

                <div>
                    <label>
                        Photo:
                        <input type="file" {...register('image')} />
                    </label>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>

            </form>
            }
        </div>
    );
};

export default ModifyPetForm;
