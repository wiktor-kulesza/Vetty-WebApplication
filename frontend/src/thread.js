import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Accordion, Button, Card, Container, Form, ListGroup} from 'react-bootstrap';
import useFetch from './proccess_data/use_fetch';
import * as con from './constants';
import PetMedicalHistoryResults from './petMedicalHistoryResults';

const Thread = () => {
    const {threadId} = useParams();

    const [thread, setThread] = useState(null);
    const {
        data,
        error
    } = useFetch(con.URL + con.API_GET_THREAD_BY_ID + threadId);

    useEffect(() => {
        setThread(data);
    }, [data]);


    const [isMedicalHistoryOpen, setIsMedicalHistoryOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const handleToggleMedicalHistory = () => {
        setIsMedicalHistoryOpen(!isMedicalHistoryOpen);
    };

    const handleAddComment = () => {
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    return (
        <Container>
            {thread && !error && (<Card>
                <Card.Body>
                    <Card.Title>{thread.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By: {thread.authorEmail}</Card.Subtitle>
                    <Card.Text>
                        {thread.content}
                    </Card.Text>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Medical History
                            </Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <strong>Pet:</strong> {thread.pet.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Date:</strong> {thread.medicalHistory.date}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Diagnosis:</strong> {thread.medicalHistory.diagnosis}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <strong>Details:</strong> {thread.medicalHistory.description}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button onClick={handleToggleMedicalHistory}>
                                            {isMedicalHistoryOpen ? 'Hide Results' : 'Show Results'}
                                        </Button>
                                    </ListGroup.Item>
                                    {isMedicalHistoryOpen && (
                                        <Container>
                                            <ListGroup.Item>
                                                <PetMedicalHistoryResults results={thread.medicalHistory.results}/>
                                            </ListGroup.Item>
                                        </Container>
                                    )}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <Card.Title className="mt-4">Comments</Card.Title>
                    <ListGroup>
                        {comments.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                {comment}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form className="mb-4">
                        <Form.Group controlId="commentForm">
                            <Form.Label>Add a comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newComment}
                                onChange={handleCommentChange}
                            />
                        </Form.Group>
                        <Button className="mb-4" variant="primary" onClick={handleAddComment}>
                            Add Comment
                        </Button>
                    </Form>
                </Card.Body>
            </Card>)}

        </Container>
    );
};

export default Thread;