package com.wkulesza.controller;

import com.wkulesza.constants.PetConstants;
import com.wkulesza.dto.*;
import com.wkulesza.entity.Comment;
import com.wkulesza.entity.Like;
import com.wkulesza.entity.Thread;
import com.wkulesza.entity.User;
import com.wkulesza.entity.medicalhistory.MedicalHistory;
import com.wkulesza.entity.pet.Cat;
import com.wkulesza.entity.pet.Dog;
import com.wkulesza.entity.pet.Pet;
import com.wkulesza.exception.CommentCreationException;
import com.wkulesza.exception.ThreadCreationException;
import com.wkulesza.security.JwtTokenProvider;
import com.wkulesza.service.*;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/threads")
@RequiredArgsConstructor
public class ThreadController {

    private final ModelMapper modelMapper;

    private final ThreadService threadService;

    private final MedicalHistoryService medicalHistoryService;

    private final UserService userService;

    private final LikeService likeService;

    private final CommentService commentService;

    private final JwtTokenProvider jwtTokenProvider;

    @CrossOrigin
    @GetMapping(value = "/all")
    public ResponseEntity<List<ThreadDto>> getAllThreads() {
        List<Thread> threads = threadService.getAllThreads();
        List<ThreadDto> threadsDto = threads.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(threadsDto);
    }

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public ResponseEntity<ThreadDto> getThreadById(@PathVariable Integer id) {
        Thread thread = threadService.getThreadById(id);
        ThreadDto threadDto = convertToDto(thread);
        return ResponseEntity.ok(threadDto);
    }

    @CrossOrigin
    @GetMapping(value = "/pet/{id}")
    public ResponseEntity<List<ThreadDto>> getThreadsByPetId(@PathVariable Integer id) {
        List<Thread> threads = threadService.getThreadsByPetId(id);
        List<ThreadDto> threadsDto = threads.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(threadsDto);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<ThreadDto> addThread(@RequestBody ThreadDto threadDto) throws ThreadCreationException {
        Thread thread = convertToEntity(threadDto);
        Thread createdThread = threadService.addThread(thread);
        return ResponseEntity.ok(convertToDto(createdThread));
    }

    @CrossOrigin
    @PutMapping(value = "/like")
    public ResponseEntity<ThreadDto> likeThread(@RequestBody LikeDto likeDto) {
        Like like = convertToEntity(likeDto);
        Thread thread = threadService.likeThread(like);
        return ResponseEntity.ok(convertToDto(thread));
    }

    @CrossOrigin
    @PutMapping(value = "/comment")
    public ResponseEntity<ThreadDto> commentThread(@RequestBody CommentDto commentDto) throws CommentCreationException {
        try {
            Comment comment = Comment.builder().text(commentDto.getText()).build();
            Thread commentedThread = threadService.commentThread(comment, commentDto.getThreadId(), commentDto.getUserEmail());
            return ResponseEntity.ok(convertToDto(commentedThread));
        } catch (Exception e) {
            throw new CommentCreationException("Comment could not be created");
        }
    }

    @CrossOrigin
    @DeleteMapping(value = "/comment")
    public ResponseEntity<ThreadDto> deleteComment(@RequestBody CommentDto commentDto, HttpServletRequest request) throws CommentCreationException {
        try {
            String token = jwtTokenProvider.resolveToken(request);
            String userEmail = jwtTokenProvider.getUsername(token);
            if (!commentDto.getUserEmail().equals(userEmail)) {
                return ResponseEntity.status(403).build();
            }
            Comment comment = convertToEntity(commentDto);
            Thread commentedThread = threadService.deleteComment(comment);
            return ResponseEntity.ok(convertToDto(commentedThread));
        } catch (Exception e) {
            throw new CommentCreationException("Comment could not be deleted");
        }
    }

    @CrossOrigin
    @PostMapping(value = "/search")
    public ResponseEntity<List<ThreadDto>> searchThreads(@RequestBody SearchDto searchDto) {
        List<Thread> threads = threadService.searchThreads(searchDto);
        List<ThreadDto> threadsDto = threads.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(threadsDto);
    }

    private Comment convertToEntity(CommentDto commentDto) {
        Comment comment;
        if (commentDto.getCommentId() != null) {
            comment = commentService.getCommentById(commentDto.getCommentId());
        } else {
            comment = commentService.getCommentByThreadIdAndUserEmailAndText(commentDto.getThreadId(), commentDto.getUserEmail(), commentDto.getText());

        }
        if (comment == null) {
            comment = Comment.builder()
                    .thread(threadService.getThreadById(commentDto.getThreadId()))
                    .user(userService.getUserByEmail(commentDto.getUserEmail()).orElseThrow(IllegalArgumentException::new))
                    .text(commentDto.getText())
                    .build();
        }
        return comment;
    }

    private Like convertToEntity(LikeDto likeDto) {
        Like like = likeService.getLikeByThreadIdAndUserEmail(likeDto.getThreadId(), likeDto.getUserEmail());
        if (like == null) {
            like = Like.builder()
                    .thread(threadService.getThreadById(likeDto.getThreadId()))
                    .user(userService.getUserByEmail(likeDto.getUserEmail()).orElseThrow(IllegalArgumentException::new))
                    .build();
        }
        return like;
    }


    private Thread convertToEntity(ThreadDto threadDto) throws ThreadCreationException {
        MedicalHistory medicalHistory = medicalHistoryService.getMedicalHistoryById(threadDto.getMedicalHistoryId());
        if (medicalHistory == null) {
            throw new ThreadCreationException("Medical history for thread not found");
        }
        Optional<User> author = userService.getUserByEmail(threadDto.getAuthorEmail());
        if (author.isEmpty()) {
            throw new ThreadCreationException("Author for thread not found");
        }
        return Thread.builder()
                .title(threadDto.getTitle())
                .content(threadDto.getContent())
                .comments(new ArrayList<>())
                .medicalHistory(medicalHistory)
                .author(author.get())
                .build();
    }

    private ThreadDto convertToDto(Thread thread) {
        ThreadDto threadDto = modelMapper.map(thread, ThreadDto.class);
        for (CommentDto commentDto : threadDto.getComments()) {
            if (commentDto.getLikes() == null) {
                commentDto.setLikes(new ArrayList<>());
            }
            commentDto.setNumberOfLikes(commentDto.getLikes().size());
        }
        threadDto.setAuthorEmail(thread.getAuthor().getEmail());
        threadDto.setMedicalHistory(modelMapper.map(thread.getMedicalHistory(), MedicalHistoryDto.class));
        threadDto.setPet(addPetDetails(thread));
        return threadDto;
    }

    private PetDetailsDto addPetDetails(Thread thread) {
        Pet pet = thread.getMedicalHistory().getPet();
        PetDetailsDto petDetails = modelMapper.map(pet, PetDetailsDto.class);
        if (pet instanceof HibernateProxy) {
            Hibernate.initialize(pet);
            pet = (Pet) ((HibernateProxy) pet).getHibernateLazyInitializer().getImplementation();
        }
        if (pet instanceof Dog)
            petDetails.setSpecies(PetConstants.DOG);
        else if (pet instanceof Cat)
            petDetails.setSpecies(PetConstants.CAT);
        if (pet.getImage() != null && pet.getImage().getImage() != null) {
            petDetails.getImage().setId(pet.getImage().getId());
            petDetails.getImage().setName(pet.getImage().getName());
            petDetails.setImage(new ImageDto());
            petDetails.getImage().setImageBase64(Base64.getEncoder().encodeToString(pet.getImage().getImage()));
            petDetails.getImage().setImage(null);
        }
        return petDetails;
    }
}
