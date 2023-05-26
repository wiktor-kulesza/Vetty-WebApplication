package com.wkulesza.service;

import com.wkulesza.entity.Like;
import com.wkulesza.repository.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;

    public Like getLikeByThreadIdAndUserEmail(Integer threadId, String authorEmail) {
        return likeRepository.findByThreadIdAndUserEmail(threadId, authorEmail);
    }

    public void save(Like like) {
        likeRepository.save(like);
    }

    public Like getLikeByCommentIdAndUserEmail(Integer commentId, String userEmail) {
        return likeRepository.findByCommentIdAndUserEmail(commentId, userEmail);
    }
}
