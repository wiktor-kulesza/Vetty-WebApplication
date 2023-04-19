import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode'
// import bcrypt from "bcryptjs-react";
import * as constants from '../constants';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Form} from 'react-bootstrap';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();


        function handleGoBack() {
            // If the previous page is the same as the current page,
            // navigate to the default page instead
            const defaultPath = constants.LOGIN;
            const previousPath = window.location.pathname;
            const currentPath = (previousPath === defaultPath) ? constants.HOME : previousPath;
            navigate(currentPath);
        }

        try {
            // const hashedPassword = bcrypt.hashSync(password)
            await axios.post(constants.URL + constants.API_LOGIN, {}, {params: {email: email, password: password}})
                .then(response => {
                    console.log(response);
                    const token = response.data;
                    const decoded = jwt(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userEmail', decoded.sub);
                })

            handleGoBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='mb-3 '>
            <Form onSubmit={handleSubmit}>
                <div className='row-12 col-md-6'>
                    <div className='row-12'>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="e.g.john@gmail.com"
                                onChange={(event) => setEmail(event.target.value)}
                                required/>
                        </Form.Group>
                    </div>
                    <div className='row-12'>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={(event) => setPassword(event.target.value)}
                                required/>
                        </Form.Group>
                    </div>
                    <Button type="submit">Login</Button>
                </div>
                <div className='row-12'>
                    <p>
                        Don't have an account? <Link to="/signup">Sign up</Link>.
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default Login;