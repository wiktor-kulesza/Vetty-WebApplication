package com.wkulesza.service;

import com.wkulesza.dto.PetDto;
import com.wkulesza.entity.Sex;
import com.wkulesza.entity.pet.Dog;
import com.wkulesza.entity.pet.Pet;
import com.wkulesza.repository.PetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class PetServiceTest {

    @Mock
    private PetRepository petRepository;

    @Mock
    private BreedService breedService;

    @Mock
    private ImageService imageService;

    @InjectMocks
    private PetService petService;

    private Pet pet;

    @BeforeEach
    public void setup() {
        pet = new Dog();
        pet.setId(1);
        pet.setName("Max");
        pet.setSex(Sex.MALE);
    }

    @Test
    public void testGetAllPets_ReturnsAllPets() {
        // Arrange
        List<Pet> expectedPets = List.of(pet);
        when(petRepository.findAll()).thenReturn(expectedPets);

        // Act
        List<Pet> result = petService.getAllPets();

        // Assert
        assertEquals(expectedPets, result);
    }

    @Test
    public void testGetPetById_ReturnsPetById() {
        // Arrange
        Integer id = 1;
        when(petRepository.findById(id)).thenReturn(Optional.of(pet));

        // Act
        Optional<Pet> result = petService.getPetById(id);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(pet, result.get());
    }

    @Test
    public void testGetPetById_ReturnsEmptyOptionalForNonExistingPet() {
        // Arrange
        Integer id = 1;
        when(petRepository.findById(id)).thenReturn(Optional.empty());

        // Act
        Optional<Pet> result = petService.getPetById(id);

        // Assert
        assertTrue(result.isEmpty());
    }

    @Test
    public void testAddPet_ReturnsSavedPet() {
        // Arrange
        when(petRepository.save(pet)).thenReturn(pet);

        // Act
        Pet result = petService.addPet(pet);

        // Assert
        assertEquals(pet, result);
    }

    @Test
    public void testRemovePet_RemovesPetById() {
        // Arrange
        Integer id = 1;
        when(petRepository.findById(id)).thenReturn(Optional.of(pet));

        // Act
        Integer result = petService.removePet(id);

        // Assert
        verify(petRepository, times(1)).delete(pet);
        assertEquals(id, result);
    }

    @Test
    public void testRemovePet_ThrowsExceptionForNonExistingPet() {
        // Arrange
        Integer id = 1;
        when(petRepository.findById(id)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> petService.removePet(id));
    }

    @Test
    public void testGetAllPetsByUserEmail_ReturnsPetsByUserEmail() {
        // Arrange
        String email = "user@example.com";
        List<Pet> expectedPets = List.of(pet);
        when(petRepository.findAllByOwnerEmail(email)).thenReturn(expectedPets);

        // Act
        List<Pet> result = petService.getAllPetsByUserEmail(email);

        // Assert
        assertEquals(expectedPets, result);
    }

    @Test
    public void testModifyPet_ModifiesPetWithValidData() {
        // Arrange
        Integer id = 1;
        PetDto petDto = new PetDto();
        petDto.setId(id);
        petDto.setName("Buddy");
        petDto.setSex("MALE");

        when(petRepository.findById(id)).thenReturn(Optional.of(pet));
        when(breedService.getBreedByName(anyString())).thenReturn(null);
        when(imageService.getImageById(anyInt())).thenReturn(null);
        when(petRepository.save(pet)).thenReturn(pet);

        // Act
        Pet result = petService.modifyPet(id, petDto);

        // Assert
        verify(petRepository, times(1)).save(pet);
        assertEquals(pet, result);
        assertEquals(petDto.getName(), result.getName());
        assertEquals(Sex.MALE, result.getSex());
    }

    @Test
    public void testModifyPet_ThrowsExceptionForMismatchedIds() {
        // Arrange
        Integer id = 1;
        PetDto petDto = new PetDto();
        petDto.setId(2);

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> petService.modifyPet(id, petDto));
    }

    @Test
    public void testModifyPet_ThrowsExceptionForNonExistingPet() {
        // Arrange
        Integer id = 1;
        PetDto petDto = new PetDto();
        petDto.setId(id);

        when(petRepository.findById(id)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(IllegalArgumentException.class, () -> petService.modifyPet(id, petDto));
    }
}
