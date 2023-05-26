package com.wkulesza.repository;

import com.wkulesza.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Comment getCommentByThreadIdAndUserEmailAndText(Integer threadId, String userEmail, String text);
}
