package com.wkulesza.service;

import com.wkulesza.entity.Comment;
import com.wkulesza.entity.Like;
import com.wkulesza.repository.CommentRepository;
import com.wkulesza.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final LikeRepository likeRepository;

    public Comment getCommentByThreadIdAndUserEmailAndText(Integer threadId, String userEmail, String text) {
        return commentRepository.getCommentByThreadIdAndUserEmailAndText(threadId, userEmail, text);
    }

    public Comment likeComment(Like like) {
        Comment comment = like.getComment();
        if (comment.getLikes().contains(like)) {
            comment.getLikes().remove(like);
            likeRepository.delete(like);
        } else {
            comment.getLikes().add(like);
        }
        return commentRepository.save(comment);
    }

    public Comment getCommentById(Integer commentId) {
        return commentRepository.findById(commentId).orElseThrow(IllegalArgumentException::new);
    }
}
