package com.wkulesza.entity;

import com.wkulesza.entity.pet.Cat;
import com.wkulesza.entity.pet.Dog;
import com.wkulesza.entity.pet.Pet;
import com.wkulesza.entity.pet.SpeciesPetFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class SpeciesPetFactoryTest {

    @Test
    public void testCreatePet_Dog() {
        // Arrange
        SpeciesPetFactory factory = new SpeciesPetFactory();

        // Act
        Pet pet = factory.createPet("Dog");

        // Assert
        Assertions.assertTrue(pet instanceof Dog);
    }

    @Test
    public void testCreatePet_Cat() {
        // Arrange
        SpeciesPetFactory factory = new SpeciesPetFactory();

        // Act
        Pet pet = factory.createPet("Cat");

        // Assert
        Assertions.assertTrue(pet instanceof Cat);
    }

    @Test
    public void testCreatePet_UnknownSpecies() {
        // Arrange
        SpeciesPetFactory factory = new SpeciesPetFactory();
        String unknownSpecies = "Bird";

        // Act & Assert
        Assertions.assertThrows(IllegalArgumentException.class, () -> factory.createPet(unknownSpecies));
    }
}