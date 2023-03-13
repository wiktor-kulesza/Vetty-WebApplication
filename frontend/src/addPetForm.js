import {useForm} from 'react-hook-form';
import useFetch from './use_fetch';
import * as constants from './constants';
import {useEffect, useState} from 'react';

const AddPetForm = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token');
        if (tokenFromLocalStorage !== token) {
            setToken(tokenFromLocalStorage);
        }
    }, [token]);

    const {data: breeds} = useFetch(constants.URL + constants.API_GET_ALL_BREEDS);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const validateImage = (value) => {
        if (!value[0]) {
            return true;
        }
        const image = value[0];
        const imageSize = image.size / 1024 / 1024; // in MB
        const allowedTypes = ["image/jpeg", "image/png"];
        const isAllowedType = allowedTypes.includes(image.type);
        const isAllowedSize = imageSize <= 10;

        if (!isAllowedType) {
            return "Only JPG or PNG image types are allowed";
        }
        if (!isAllowedSize) {
            return "Image size should be less than 10MB";
        }
        return true;
    };

    const postPet = (imageId, data) => {
        fetch(constants.URL + constants.API_ADD_PET, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                species: data.species,
                name: data.name,
                breedName: data.breedName,
                birthDate: data.birthDate,
                ownerId: 1,
                imageId: imageId
            })
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onSubmit = (data) => {
        console.log(data.image)
        if (data.image[0] && data.image[0] !== undefined) {
            const blob = new Blob([data.image[0]], {type: "image/jpeg"});
            console.log("BLOB")
            console.log(blob);
            const formData = new FormData();
            formData.append("image", blob);
            console.log("imgage post")
            console.log(token);
            fetch(constants.URL + constants.API_ADD_IMAGE, {
                Authorization: `Bearer ${token}`,
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((imageId) => {
                    postPet(imageId, data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            postPet(null, data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-div'>
                <label htmlFor="species">Species:</label>
                <label>
                    Species:
                    <select {...register('species', {required: true})}>
                        <option value="">Select a species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                    {errors.breed && <span> <br/> This field is required</span>}
                </label>
            </div>
            <div className='form-div'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    maxLength="16"
                    pattern="[A-Za-z]+"
                    {...register('name', {required: true})}
                />
                {errors.name && <span>This field is required</span>}
            </div>
            <div>
                <label>
                    Breed:
                    <select {...register('breedName', {required: true})}>
                        <option value="">Select a breed</option>
                        {breeds && breeds.map((breed) => (
                            <option key={breed.id} value={breed.name}>{breed.name}</option>
                        ))}
                    </select>
                    {errors.breed && <span> <br/> This field is required</span>}
                </label>
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    {...register('image', {
                        validate: validateImage,
                    })}
                />
                {errors.image?.types?.maxSize && <p>Image is too big (maximum size is 10MB)</p>}
                {errors.image?.types?.fileType && <p>Image must be a JPEG, PNG file</p>}
            </div>
            <div>
                <label htmlFor="birthDate">Birth Date:</label>
                <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    max={new Date().toISOString().split('T')[0]}
                    {...register('birthDate', {required: true})}
                />
                {errors.birthDate && <span>This field is required</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddPetForm;