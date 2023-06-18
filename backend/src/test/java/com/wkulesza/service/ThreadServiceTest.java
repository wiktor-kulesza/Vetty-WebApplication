package com.wkulesza.service;

import com.wkulesza.dto.SearchDto;
import com.wkulesza.entity.Thread;
import com.wkulesza.entity.*;
import com.wkulesza.entity.medicalhistory.Tag;
import com.wkulesza.repository.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ThreadServiceTest {

    @Mock
    private ThreadRepository threadRepository;

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PetRepository petRepository;

    @Mock
    private BreedRepository breedRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private ThreadService threadService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllThreads() {
        // Mock the repository's response
        List<Thread> mockThreads = new ArrayList<>();
        mockThreads.add(new Thread());
        Mockito.when(threadRepository.findAllByOrderByMedicalHistoryDateDesc()).thenReturn(mockThreads);

        // Call the service method
        List<Thread> result = threadService.getAllThreads();

        // Verify the result
        Assertions.assertEquals(mockThreads, result);
    }

    @Test
    public void testAddThread() {
        // Create a mock thread
        Thread mockThread = new Thread();

        // Mock the repository's save method
        Mockito.when(threadRepository.save(mockThread)).thenReturn(mockThread);

        // Call the service method
        Thread result = threadService.addThread(mockThread);

        // Verify the result
        Assertions.assertEquals(mockThread, result);
        Assertions.assertNotNull(result.getLikes());
        Assertions.assertTrue(result.getLikes().isEmpty());
    }

    @Test
    public void testGetThreadById() {
        // Create a mock thread
        Thread mockThread = new Thread();
        mockThread.setId(1);

        // Mock the repository's findById method
        Mockito.when(threadRepository.findById(1)).thenReturn(Optional.of(mockThread));

        // Call the service method
        Thread result = threadService.getThreadById(1);

        // Verify the result
        Assertions.assertEquals(mockThread, result);
    }

    @Test
    public void testLikeThread() {
        Thread thread = new Thread();
        Like like = new Like();
        like.setThread(thread);
        thread.setLikes(new ArrayList<>());

        Mockito.when(likeRepository.save(like)).thenReturn(like);
        Mockito.when(threadRepository.save(thread)).thenReturn(thread);

        Thread result = threadService.likeThread(like);

        Assertions.assertTrue(result.getLikes().contains(like));

        Mockito.verify(threadRepository, Mockito.times(1)).save(thread);
    }

    @Test
    public void testCommentThread() {
        Comment comment = new Comment();
        Integer threadId = 1;
        String userEmail = "user@example.com";

        User user = new User();
        Thread thread = new Thread();

        Mockito.when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(user));
        Mockito.when(threadRepository.findById(threadId)).thenReturn(Optional.of(thread));
        Mockito.when(threadRepository.save(thread)).thenReturn(thread);

        Thread result = threadService.commentThread(comment, threadId, userEmail);

        Assertions.assertTrue(result.getComments().contains(comment));
        Assertions.assertEquals(thread, comment.getThread());
        Assertions.assertEquals(user, comment.getUser());

        Mockito.verify(threadRepository, Mockito.times(1)).save(thread);
    }

    @Test
    public void testDeleteComment() {
        Comment comment = new Comment();
        Thread thread = new Thread();
        thread.getComments().add(comment);
        comment.setThread(thread);

        Mockito.when(threadRepository.save(thread)).thenReturn(thread);

        Thread result = threadService.deleteComment(comment);

        Assertions.assertFalse(result.getComments().contains(comment));

        Mockito.verify(commentRepository, Mockito.times(1)).delete(comment);
        Mockito.verify(threadRepository, Mockito.times(1)).save(thread);
    }

    @Test
    public void testSearchThreads() {
        SearchDto searchDto = new SearchDto();

        // Set up mock repositories
        Tag tag1 = new Tag();
        tag1.setValue("tag1");
        Tag tag2 = new Tag();
        tag1.setValue("tag2");
        Tag tag3 = new Tag();
        tag1.setValue("tag3");
        List<Tag> tags = Arrays.asList(
                tag1,
                tag2,
                tag3
        );
        Mockito.when(tagRepository.findAll()).thenReturn(tags);

        Breed breed1 = new Breed();
        breed1.setName("breed1");
        Breed breed2 = new Breed();
        breed1.setName("breed2");
        Breed breed3 = new Breed();
        breed1.setName("breed3");
        List<Breed> breeds = Arrays.asList(
                breed1,
                breed2,
                breed3
        );
        Mockito.when(breedRepository.findAll()).thenReturn(breeds);

        List<Thread> expectedThreads = new ArrayList<>();
        Mockito.when(threadRepository.findThreadsByCriteria(
                Mockito.anyList(),
                Mockito.anyList(),
                Mockito.anyList(),
                Mockito.anyInt(),
                Mockito.anyInt()
        )).thenReturn(expectedThreads);

        List<Thread> result = threadService.searchThreads(searchDto);

        Assertions.assertEquals(expectedThreads, result);
        Assertions.assertEquals(tags.stream().map(Tag::getValue).collect(Collectors.toList()), searchDto.getTags());
        Assertions.assertEquals(breeds.stream().map(Breed::getName).collect(Collectors.toList()), searchDto.getBreeds());
        Assertions.assertEquals(Arrays.asList("Dog", "Cat"), searchDto.getSpecies());
        Assertions.assertEquals(0, searchDto.getMinAge());
        Assertions.assertEquals(100, searchDto.getMaxAge());

        Mockito.verify(tagRepository, Mockito.times(1)).findAll();
        Mockito.verify(breedRepository, Mockito.times(1)).findAll();
        Mockito.verify(threadRepository, Mockito.times(1)).findThreadsByCriteria(
                searchDto.getSpecies(),
                searchDto.getBreeds(),
                searchDto.getTags(),
                searchDto.getMinAge(),
                searchDto.getMaxAge()
        );
    }

    @Test
    public void testGetThreadsByPetId() {
        Integer petId = 1;

        List<Thread> expectedThreads = new ArrayList<>();
        Mockito.when(threadRepository.findAllByMedicalHistoryPetId(petId)).thenReturn(expectedThreads);

        List<Thread> result = threadService.getThreadsByPetId(petId);

        Assertions.assertEquals(expectedThreads, result);

        Mockito.verify(threadRepository, Mockito.times(1)).findAllByMedicalHistoryPetId(petId);
    }

}
