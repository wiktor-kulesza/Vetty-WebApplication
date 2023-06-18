package com.wkulesza.service;

import com.wkulesza.entity.Like;
import com.wkulesza.repository.LikeRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class LikeServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @InjectMocks
    private LikeService likeService;

    @Test
    public void testGetLikeByThreadIdAndUserEmail_ReturnsLike() {
        // Arrange
        Integer threadId = 1;
        String authorEmail = "user@example.com";
        Like expectedLike = new Like();
        when(likeRepository.findByThreadIdAndUserEmail(threadId, authorEmail)).thenReturn(expectedLike);

        // Act
        Like result = likeService.getLikeByThreadIdAndUserEmail(threadId, authorEmail);

        // Assert
        assertEquals(expectedLike, result);
    }

    @Test
    public void testSave_CallsSaveMethodInRepository() {
        // Arrange
        Like like = new Like();

        // Act
        likeService.save(like);

        // Assert
        verify(likeRepository, times(1)).save(like);
    }

    @Test
    public void testGetLikeByCommentIdAndUserEmail_ReturnsLike() {
        // Arrange
        Integer commentId = 1;
        String userEmail = "user@example.com";
        Like expectedLike = new Like();
        when(likeRepository.findByCommentIdAndUserEmail(commentId, userEmail)).thenReturn(expectedLike);

        // Act
        Like result = likeService.getLikeByCommentIdAndUserEmail(commentId, userEmail);

        // Assert
        assertEquals(expectedLike, result);
    }
}