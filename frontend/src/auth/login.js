import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode'
// import bcrypt from "bcryptjs-react";
import * as constants from '../constants';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // const hashedPassword = bcrypt.hashSync(password)
            await axios.post(constants.URL + constants.API_LOGIN, {}, {params: {email: email, password: password}})
                .then(response => {
                    console.log(response);
                    const token = response.data;
                    const decoded = jwt(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userEmail', decoded.sub);
                    console.log(decoded);
                    console.log(localStorage.getItem('token'));
                    console.log(localStorage.getItem('userEmail'));
                })


            navigate(-1);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-div'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange}/>
                </div>
                <div className='form-div'>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>.
            </p>
        </div>
    );
};

export default Login;