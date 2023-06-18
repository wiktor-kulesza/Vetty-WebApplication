package com.wkulesza.service;

import com.wkulesza.dto.SearchDto;
import com.wkulesza.entity.Thread;
import com.wkulesza.entity.*;
import com.wkulesza.entity.medicalhistory.Tag;
import com.wkulesza.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class ThreadService {

    private final ThreadRepository threadRepository;

    private final LikeRepository likeRepository;

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final PetRepository petRepository;

    private final BreedRepository breedRepository;

    private final TagRepository tagRepository;

    public List<Thread> getAllThreads() {
        return threadRepository.findAllByOrderByMedicalHistoryDateDesc();
    }

    public Thread addThread(Thread thread) {
        if (thread.getLikes() == null) {
            thread.setLikes(new ArrayList<>());
        }
        return threadRepository.save(thread);
    }

    public Thread getThreadById(Integer id) {
        return threadRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    public Thread likeThread(Like like) {
        Thread thread = like.getThread();
        if (thread.getLikes().contains(like)) {
            thread.getLikes().remove(like);
            likeRepository.delete(like);
        } else {
            thread.getLikes().add(like);
        }
        return threadRepository.save(thread);
    }

    public Thread commentThread(Comment comment, Integer threadId, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(IllegalArgumentException::new);
        comment.setUser(user);
        Thread thread = getThreadById(threadId);
        thread.getComments().add(comment);
        comment.setThread(thread);
        return threadRepository.save(thread);
    }

    public Thread deleteComment(Comment comment) {
        Thread thread = comment.getThread();
        thread.getComments().remove(comment);
        commentRepository.delete(comment);
        return threadRepository.save(thread);
    }

    public List<Thread> searchThreads(SearchDto searchDto) {
        if (searchDto.getTags() == null || searchDto.getTags().isEmpty()) {
            searchDto.setTags(tagRepository.findAll().stream().map(Tag::getValue).collect(Collectors.toList()));
        }
        if (searchDto.getBreeds() == null || searchDto.getBreeds().isEmpty()) {
            searchDto.setBreeds(breedRepository.findAll().stream().map(Breed::getName).collect(Collectors.toList()));
        }
        if (searchDto.getSpecies() == null || searchDto.getSpecies().isEmpty()) {
            searchDto.setSpecies(Arrays.asList("Dog", "Cat"));
        }
        if (searchDto.getMinAge() == null) {
            searchDto.setMinAge(0);
        }
        if (searchDto.getMaxAge() == null) {
            searchDto.setMaxAge(100);
        }
        return threadRepository.findThreadsByCriteria(
                searchDto.getSpecies(),
                searchDto.getBreeds(),
                searchDto.getTags(),
                searchDto.getMinAge(),
                searchDto.getMaxAge());
    }

    public List<Thread> getThreadsByPetId(Integer id) {
        return threadRepository.findAllByMedicalHistoryPetId(id);
    }
}
