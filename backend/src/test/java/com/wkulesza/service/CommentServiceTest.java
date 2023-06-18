package com.wkulesza.service;

import com.wkulesza.entity.Comment;
import com.wkulesza.entity.Like;
import com.wkulesza.repository.CommentRepository;
import com.wkulesza.repository.LikeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
public class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private LikeRepository likeRepository;

    @InjectMocks
    private CommentService commentService;

    private Comment commentWithNoLikes;
    private Comment commentWithLikes;
    private Like like;

    @BeforeEach
    public void setUp() {
        commentWithNoLikes = new Comment();
        commentWithLikes = new Comment();
        commentWithNoLikes.setLikes(new ArrayList<>());
        like = new Like();
        like.setComment(commentWithLikes);
        commentWithLikes.setLikes(Collections.singletonList(like));
    }

    @Test
    public void testGetCommentByThreadIdAndUserEmailAndText_ReturnsComment() {
        // Arrange
        Integer threadId = 1;
        String userEmail = "user@example.com";
        String text = "Test comment";
        when(commentRepository.getCommentByThreadIdAndUserEmailAndText(threadId, userEmail, text))
                .thenReturn(commentWithNoLikes);

        // Act
        Comment result = commentService.getCommentByThreadIdAndUserEmailAndText(threadId, userEmail, text);

        // Assert
        assertEquals(commentWithNoLikes, result);
    }

    @Test
    public void testGetCommentById_ExistingId_ReturnsComment() {
        // Arrange
        Integer commentId = 1;
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(commentWithNoLikes));

        // Act
        Comment result = commentService.getCommentById(commentId);

        // Assert
        assertEquals(commentWithNoLikes, result);
    }

    @Test
    public void testGetCommentById_NonExistingId_ThrowsException() {
        // Arrange
        Integer commentId = 1;
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> commentService.getCommentById(commentId));
    }
}
