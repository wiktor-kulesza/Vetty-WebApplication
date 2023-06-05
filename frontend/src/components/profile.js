import React from 'react';
import {Card, Container, Row} from 'react-bootstrap';
import PetList from './petList';
import {useParams} from 'react-router-dom';
import Image from "../assets/default-user-image.jpg";
import * as con from '../constants/constants';
import useFetch from '../services/use_fetch';

const ProfileView = () => {

    const {email} = useParams();
    const {data: user, error, isPending} = useFetch(con.URL + con.API_GET_USER_BY_EMAIL + email);
    console.log("user", user)

    return (
        <Container>
            {isPending && <div>Loading...</div>}
            {!isPending && !error && user &&
            (<Container>

                <Row className='mb-3'>
                    <Card>
                        <Card.Img variant="top" src={Image}
                                  style={{width: '100%', height: '200px', objectFit: 'cover'}}/>
                        <Card.Body>
                            <Card.Title> {user.name} {user.surname}</Card.Title>
                            <Card.Subtitle>{user.email}</Card.Subtitle>
                        </Card.Body>
                    </Card>

                </Row>
                <Row className='mb-3'>
                    <PetList passedEmail={user.email}/>
                </Row>
            </Container>)}
        </Container>

    );
};

export default ProfileView;