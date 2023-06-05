import {useEffect, useState} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import * as constants from '../constants/constants';


const Comment = ({comment, handleCommentDelete}) => {

    const [commentToDisplay, setCommentToDisplay] = useState(comment);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isYourComment, setIsYourComment] = useState(false);
    const [liked, setLiked] = useState(commentToDisplay.likes.some(like => like.userEmail === localStorage.getItem('userEmail')));

    console.log("comment in comment.js: ", comment);

    const handleLike = async () => {
        const response = await fetch(constants.URL + constants.API_LIKE_COMMENT, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                userEmail: localStorage.getItem('userEmail'),
                commentId: commentToDisplay.commentId,
            })
        });
        const newComment = await response.json();
        setCommentToDisplay(newComment);

    };

    const handleDelete = (commentId) => {
        handleCommentDelete(commentId);
    };

    useEffect(() => {
        setIsYourComment(commentToDisplay.userEmail === localStorage.getItem('userEmail'));
    }, [commentToDisplay, token]);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('token')]);

    useEffect(() => {
        setCommentToDisplay(comment);
    }, [comment]);

    useEffect(() => {
        setLiked(commentToDisplay.likes.some(like => like.userEmail === localStorage.getItem('userEmail')));
    }, [commentToDisplay]);

    return (
        <Container>
            <Card>
                <Card.Header>
                    {commentToDisplay.userEmail}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {commentToDisplay.text}
                    </Card.Text>
                    <Button variant="link" onClick={handleLike}>
                        <FontAwesomeIcon icon={faThumbsUp} color={liked ? "blue" : "gray"}/>{" "}
                        {commentToDisplay.numberOfLikes} {commentToDisplay.numberOfLikes === 1 ? "like" : "likes"}
                    </Button>
                    {isYourComment && (
                        <Button variant="link" onClick={() => handleDelete(comment.commentId)}>
                            <FontAwesomeIcon icon={faTrashAlt}/> Delete
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );

}

export default Comment;