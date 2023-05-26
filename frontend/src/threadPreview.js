import {useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row} from 'react-bootstrap';
import * as constants from './constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import DefaultImage from "./assets/default-pet-image.jpg";
import {useNavigate} from "react-router-dom";


const ThreadPreview = ({thread}) => {
    const navigate = useNavigate();
    const [threadToDisplay, setThreadToDisplay] = useState(thread);
    const petDetails = threadToDisplay.pet;
    const petImage = threadToDisplay.pet.image.imageBase64

    useEffect(() => {
        setThreadToDisplay(thread);
    }, [thread]);

    // Truncate the content to max 3 lines with ellipsis
    const truncatedContent = threadToDisplay.content
        .split('\n')
        .slice(0, 3)
        .join('\n');
    const ellipsis = threadToDisplay.content.split('\n').length > 3 ? '...' : '';

    const handleLikeClick = async () => {
        const response = await fetch(constants.URL + constants.API_LIKE_THREAD, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userEmail: localStorage.getItem('userEmail'),
                threadId: threadToDisplay.id
            })
        });
        const newThread = await response.json();
        setThreadToDisplay(newThread);
    }

    const handleCardBodyClick = () => {
        navigate(constants.THREAD + threadToDisplay.id);
    }


    return (
        <Container>
            <Row>
                <Col>
                    <Card className='thread-preview'>
                        {threadToDisplay && (
                            <Card.Body onClick={handleCardBodyClick}>
                                {petImage &&
                                <Image className="rounded-circle me-3"
                                       style={{width: '60px', height: '60px'}}
                                       src={petImage ? `data:image/jpeg;base64,${(petImage)}` : DefaultImage}
                                       alt={petDetails.name}/>}
                                <Card.Title>{threadToDisplay.title}</Card.Title>
                                <Row className='justify-content-left'>
                                    <Card.Text>
                                        {petDetails && (
                                            <small className="text-muted">
                                                {petDetails.species} - {petDetails.breedName.toLowerCase()} - {petDetails.name} - {petDetails.sex.toLowerCase()}
                                            </small>
                                        )}
                                    </Card.Text>
                                </Row>
                                <Card.Text>
                                    {truncatedContent}
                                    {ellipsis}
                                </Card.Text>
                            </Card.Body>
                        )}
                        {threadToDisplay && (
                            <Card.Footer>
                                <Row>
                                    <Col xs="auto">
                                        <FontAwesomeIcon icon={faThumbsUp}
                                                         onClick={handleLikeClick}/> {thread.likes && threadToDisplay.likes.length}
                                    </Col>
                                    <Col xs="auto">
                                        <FontAwesomeIcon icon={faComment} onClick={event => {
                                            event.preventDefault();
                                            navigate(constants.THREAD + threadToDisplay.id);
                                        }}/> {threadToDisplay.comments.length}
                                    </Col>
                                </Row>
                            </Card.Footer>)}

                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ThreadPreview;