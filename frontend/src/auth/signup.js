import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as constants from '../constants';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Form} from 'react-bootstrap';


const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const salt = bcrypt.genSaltSync(constants.SALT);
        // const hashedPassword = bcrypt.hashSync(password);

        try {
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
        <div className="mb-3">
            <Form onSubmit={handleSubmit}>
                <div className='row-12 col-md-6'>
                    <div className='row gx-4'>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(event) => setName(event.target.value)}
                                    required/>
                            </Form.Group>
                        </div>
                        <div className='col'>
                            <Form.Group className="mb-3" controlId="surname">
                                <Form.Label>Surname:</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(event) => setSurname(event.target.value)}
                                    required/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row-12'>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
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
                                required
                                minLength={constants.MIN_PASSWORD_LENGTH}
                                maxLength={constants.MAX_PASSWORD_LENGTH}
                                m/>
                        </Form.Group>
                    </div>
                    <Button type="submit">Sign up</Button>
                </div>
            </Form>
            <div className='row-12'>
                <p>
                    Already have an account? <Link to="/login">Login</Link>.
                </p>
            </div>
        </div>
    );
};

export default Signup;