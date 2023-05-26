package com.wkulesza.repository;

import com.wkulesza.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Integer> {
    Like findByThreadIdAndUserEmail(Integer threadId, String authorEmail);

    Like findByCommentIdAndUserEmail(Integer commentId, String userEmail);
}
