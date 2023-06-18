package com.wkulesza.service;

import com.wkulesza.entity.Breed;
import com.wkulesza.repository.BreedRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class BreedServiceTest {

    @Mock
    private BreedRepository breedRepository;

    @InjectMocks
    private BreedService breedService;

    @Test
    public void testValidateBreed_ExistingBreed_ReturnsTrue() {
        // Arrange
        String breedName = "Bulldog";
        when(breedRepository.existsByName(breedName)).thenReturn(true);

        // Act
        Boolean result = breedService.validateBreed(breedName);

        // Assert
        assertTrue(result);
    }

    @Test
    public void testValidateBreed_NonExistingBreed_ReturnsFalse() {
        // Arrange
        String breedName = "Poodle";
        when(breedRepository.existsByName(breedName)).thenReturn(false);

        // Act
        Boolean result = breedService.validateBreed(breedName);

        // Assert
        assertFalse(result);
    }

    @Test
    public void testGetAllBreeds_ReturnsAllBreeds() {
        // Arrange
        Breed breed1 = new Breed();
        Breed breed2 = new Breed();
        List<Breed> expectedBreeds = Arrays.asList(breed1, breed2);
        when(breedRepository.findAll()).thenReturn(expectedBreeds);

        // Act
        List<Breed> result = breedService.getAllBreeds();

        // Assert
        assertEquals(expectedBreeds, result);
    }

    @Test
    public void testGetBreedById_ExistingId_ReturnsBreed() {
        // Arrange
        int breedId = 1;
        Breed expectedBreed = new Breed();
        when(breedRepository.findById(breedId)).thenReturn(Optional.of(expectedBreed));

        // Act
        Breed result = breedService.getBreedById(breedId);

        // Assert
        assertEquals(expectedBreed, result);
    }

    @Test
    public void testGetBreedById_NonExistingId_ReturnsNull() {
        // Arrange
        int breedId = 1;
        when(breedRepository.findById(breedId)).thenReturn(Optional.empty());

        // Act
        Breed result = breedService.getBreedById(breedId);

        // Assert
        assertNull(result);
    }

    @Test
    public void testGetBreedByName_ExistingName_ReturnsBreed() {
        // Arrange
        String breedName = "Bulldog";
        Breed expectedBreed = new Breed();
        when(breedRepository.findByName(breedName)).thenReturn(Optional.of(expectedBreed));

        // Act
        Breed result = breedService.getBreedByName(breedName);

        // Assert
        assertEquals(expectedBreed, result);
    }

    @Test
    public void testGetBreedByName_NonExistingName_ReturnsNull() {
        // Arrange
        String breedName = "Poodle";
        when(breedRepository.findByName(breedName)).thenReturn(Optional.empty());

        // Act
        Breed result = breedService.getBreedByName(breedName);

        // Assert
        assertNull(result);
    }
}
