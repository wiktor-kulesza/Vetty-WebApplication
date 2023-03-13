import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as constants from '../constants';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import bcrypt from "bcryptjs-react";

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleNameChange = (event) => setName(event.target.value);
    const handleSurnameChange = (event) => setSurname(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const salt = bcrypt.genSaltSync(constants.SALT);
        const hashedPassword = bcrypt.hashSync(password);

        try {
            console.log("XD");
            const response = await axios.post(constants.URL + constants.API_REGISTER, {
                name,
                surname,
                email,
                password: password,
                roles: ["ROLE_CLIENT"]
            });
            console.log(response);
            const token = response.data;
            const decoded = jwt_decode(token);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', decoded.userId);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="signup">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-div'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange}/>
                </div>
                <div className='form-div'>
                    <label htmlFor="surname">Surname:</label>
                    <input type="text" id="suname" value={surname} onChange={handleSurnameChange}/>
                </div>
                <div className='form-div'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className='form-div'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <button type="submit">Sign up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>.
            </p>
        </div>
    );
};

export default Signup;