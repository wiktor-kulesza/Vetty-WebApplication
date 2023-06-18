package com.wkulesza.service;

import com.wkulesza.entity.medicalhistory.Tag;
import com.wkulesza.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagService tagService;

    @Test
    public void testGetAllTags_ReturnsAllTags() {
        // Arrange
        Tag tag1 = new Tag();
        Tag tag2 = new Tag();
        when(tagRepository.findAll()).thenReturn(Arrays.asList(tag1, tag2));

        // Act
        List<Tag> result = tagService.getAllTags();

        // Assert
        assertEquals(2, result.size());
        assertEquals(tag1, result.get(0));
        assertEquals(tag2, result.get(1));
        verify(tagRepository, times(1)).findAll();
    }
}
