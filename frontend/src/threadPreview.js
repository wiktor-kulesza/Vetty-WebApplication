import React from 'react';
import {Link} from 'react-router-dom';
import {Card, Col, Container, Image, Row} from 'react-bootstrap';
import * as constants from './constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import DefaultImage from "./assets/default-pet-image.jpg";


const ThreadPreview = ({thread}) => {
    const petDetails = thread.pet;
    const petImage = thread.pet.image.imageBase64

    // Truncate the content to max 3 lines with ellipsis
    const truncatedContent = thread.content
        .split('\n')
        .slice(0, 3)
        .join('\n');
    const ellipsis = thread.content.split('\n').length > 3 ? '...' : '';

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {petImage &&
                            <Image className="rounded-circle me-3"
                                   style={{width: '60px', height: '60px'}}
                                   src={petImage ? `data:image/jpeg;base64,${(petImage)}` : DefaultImage}
                                   alt={petDetails.name}/>}
                            <Card.Title>{thread.title}</Card.Title>
                            <Row className='justify-content-left'>
                                <Card.Text>
                                    {petDetails && (
                                        <small className="text-muted">
                                            {petDetails.species} - {petDetails.breedName} - {petDetails.name} - {petDetails.sex.toLowerCase()}
                                        </small>
                                    )}
                                </Card.Text>
                            </Row>
                            <Card.Text>
                                {truncatedContent}
                                {ellipsis}
                            </Card.Text>
                            <Row>
                                <Col xs="auto">
                                    <FontAwesomeIcon icon={faThumbsUp}/> {3}
                                </Col>
                                <Col xs="auto">
                                    <FontAwesomeIcon icon={faComment}/> {thread.comments.length}
                                </Col>
                            </Row>
                            <Link to={constants.THREAD + thread.id} className="stretched-link"/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ThreadPreview;