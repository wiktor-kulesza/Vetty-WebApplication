import {useEffect, useState} from 'react';
import {Button, Card, Form, ListGroup} from 'react-bootstrap';
import * as constants from '../constants/constants';
import Comment from './comment';

const CommentSection = ({thread}) => {

    const [newComment, setNewComment] = useState('');
    const [threadToDisplay, setThreadToDisplay] = useState(thread);

    console.log("thread in comment section: ", thread);

    useEffect(() => {
        setThreadToDisplay(thread);
    }, [thread]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentDelete = async (commentId) => {
        const response = await fetch(constants.URL + constants.API_DELETE_COMMENT, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userEmail: localStorage.getItem('userEmail'),
                commentId: commentId,
            })
        });
        const commentFromResponse = await response.json();
        if (response.status === 200) {
            console.log("comment deleted: ", commentFromResponse);
            const filteredComments = thread.comments.filter(comment => comment.id !== commentId);
            console.log("filtered comments", filteredComments)
            setThreadToDisplay({...thread, comments: filteredComments});
        }
    };

    const handleAddComment = async () => {
        const response = await fetch(constants.URL + constants.API_ADD_COMMENT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userEmail: localStorage.getItem('userEmail'),
                text: newComment,
                threadId: threadToDisplay.id,
            })
        });
        const newThread = await response.json();
        if (response.status === 200) {
            console.log("new thread: ", newThread);
            setThreadToDisplay(newThread);
        }
    };

    return (
        <Card>
            <Card.Title className="mt-4">Comments</Card.Title>
            <ListGroup>
                {threadToDisplay.comments && threadToDisplay.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>
                        <Comment comment={comment} handleCommentDelete={handleCommentDelete}/>
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
        </Card>
    )
}

export default CommentSection;