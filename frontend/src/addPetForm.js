import {useForm} from 'react-hook-form';
import * as constants from './constants';
import {useEffect, useState} from 'react';
import useFetch from './proccess_data/use_fetch';
import {useNavigate} from 'react-router-dom';
import ValidateImage from './data_validation/validateImage';

const AddPetForm = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [sex, setSex] = useState('MALE');

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

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
                sex: sex,
                breedName: data.breedName,
                birthDate: data.birthDate,
                ownerEmail: localStorage.getItem('userEmail'),
                imageId: imageId
            })
        })
            .then(response => {
                console.log(response);
                navigate(constants.HOME);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const onSubmit = (data) => {
        console.log(data.image)
        if (window.confirm("Are you sure you want to add pet?")) {
            if (data.image[0] && data.image[0] !== undefined) {
                const blob = new Blob([data.image[0]], {type: "image/jpeg"});
                console.log("BLOB")
                console.log(blob);
                const formData = new FormData();
                formData.append("image", blob);
                console.log("imgage post")
                console.log(token);
                fetch(constants.URL + constants.API_ADD_IMAGE, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-div'>
                <label htmlFor="species">Species:</label>
                <label>
                    <select {...register('species', {required: true})}>
                        <option value="">Select a species</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                    {errors.breed && <span> <br/> This field is required</span>}
                </label>
            </div>
            <div className='form-div'>
                <label>
                    <input
                        type="radio"
                        name="sex"
                        value="MALE"
                        checked={sex === 'MALE'}
                        onChange={handleSexChange}
                    />
                    Male
                </label>
                <label>
                    <input
                        type="radio"
                        name="sex"
                        value="FEMALE"
                        checked={sex === 'FEMALE'}
                        onChange={handleSexChange}
                    />
                    Female
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
                        validate: ValidateImage,
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