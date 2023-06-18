package com.wkulesza.service;

import com.wkulesza.entity.Image;
import com.wkulesza.repository.ImageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ImageServiceTest {

    @Mock
    private ImageRepository imageRepository;

    @InjectMocks
    private ImageService imageService;

    private Image image;
    private MultipartFile multipartFile;

    @BeforeEach
    public void setUp() {
        image = new Image();
        image.setId(1);
        image.setName("test.jpg");
        image.setImage(new byte[]{1, 2, 3});

        multipartFile = new MockMultipartFile("test.jpg", "test.jpg", "image/jpeg", new byte[]{1, 2, 3});
    }

    @Test
    public void testGetImageById_ExistingId_ReturnsImage() {
        // Arrange
        Integer id = 1;
        when(imageRepository.findById(id)).thenReturn(Optional.of(image));

        // Act
        Image result = imageService.getImageById(id);

        // Assert
        assertEquals(image, result);
    }

    @Test
    public void testGetImageById_NonExistingId_ReturnsNull() {
        // Arrange
        Integer id = 1;
        when(imageRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Image result = imageService.getImageById(id);

        // Assert
        assertNull(result);
    }

    @Test
    public void testAddImage_ValidFile_UploadsImageAndReturnsId() throws IOException {
        // Arrange
        Image savedImage = new Image();
        savedImage.setId(1);
        savedImage.setName("test.jpg");
        savedImage.setImage(new byte[]{1, 2, 3});
        when(imageRepository.save(any(Image.class))).thenReturn(savedImage);

        // Act
        Integer result = imageService.addImage(multipartFile);

        // Assert
        assertEquals(savedImage.getId(), result);
        verify(imageRepository, times(1)).save(any(Image.class));
    }

    @Test
    public void testGetAllImages_ReturnsAllImages() {
        // Arrange
        List<Image> images = new ArrayList<>();
        images.add(image);
        when(imageRepository.findAll()).thenReturn(images);

        // Act
        List<Image> result = imageService.getAllImages();

        // Assert
        assertEquals(images, result);
    }

    @Test
    public void testDeleteImage_ValidId_DeletesImage() {
        // Arrange
        Integer id = 1;

        // Act
        imageService.deleteImage(id);

        // Assert
        verify(imageRepository, times(1)).deleteById(id);
    }
}
