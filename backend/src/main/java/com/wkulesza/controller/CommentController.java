package com.wkulesza.controller;

import com.wkulesza.dto.CommentDto;
import com.wkulesza.dto.LikeDto;
import com.wkulesza.entity.Comment;
import com.wkulesza.entity.Like;
import com.wkulesza.service.CommentService;
import com.wkulesza.service.LikeService;
import com.wkulesza.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/api/comments")
@CrossOrigin(maxAge = 3600)
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final LikeService likeService;

    private final UserService userService;

    private final ModelMapper modelMapper;

    @PutMapping(path = "/like")
    public ResponseEntity<CommentDto> likeComment(@RequestBody LikeDto likeDto) {
        Like like = convertToEntity(likeDto);
        Comment updatedComment = commentService.likeComment(like);
        return ResponseEntity.ok(convertToDto(updatedComment));
    }

    private CommentDto convertToDto(Comment updatedComment) {
        CommentDto commentDto = modelMapper.map(updatedComment, CommentDto.class);
        if (commentDto.getLikes() == null) {
            commentDto.setLikes(new ArrayList<>());
        }
        commentDto.setNumberOfLikes(commentDto.getLikes().size());
        return commentDto;
    }

    private Like convertToEntity(LikeDto likeDto) {
        Like like = likeService.getLikeByCommentIdAndUserEmail(likeDto.getCommentId(), likeDto.getUserEmail());
        if (like == null) {
            like = Like.builder()
                    .comment(commentService.getCommentById(likeDto.getCommentId()))
                    .user(userService.getUserByEmail(likeDto.getUserEmail()).orElseThrow(IllegalArgumentException::new))
                    .build();
        }
        return like;
    }
}
