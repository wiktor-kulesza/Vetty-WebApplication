import React, {useState} from 'react';
import {Accordion, Button, Card, Form, ListGroup} from 'react-bootstrap';

const ThreadView = () => {
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
        <Card>
            <Card.Body>
                <Card.Title>Thread Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Thread Author (email)</Card.Subtitle>
                <Card.Text>
                    Thread Content
                </Card.Text>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Medical History
                        </Accordion.Header>
                        <Accordion.Body>
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Pet:</strong> Pet Name
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Date:</strong> Medical History Date
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Diagnosis:</strong> Medical History Diagnosis
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button onClick={handleToggleMedicalHistory}>
                                        {isMedicalHistoryOpen ? 'Hide Description' : 'Show Description'}
                                    </Button>
                                </ListGroup.Item>
                                {isMedicalHistoryOpen && (
                                    <ListGroup.Item>
                                        Medical History Description and Results
                                    </ListGroup.Item>
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
                <Form className="mt-4">
                    <Form.Group controlId="commentForm">
                        <Form.Label>Add a comment</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={newComment}
                            onChange={handleCommentChange}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddComment}>
                        Add Comment
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ThreadView;