package com.example.entity.pet;

// Concrete factory class that implements the PetFactory interface
public class SpeciesPetFactory implements PetFactory {
    @Override
    public Pet createPet(String species) {
        if (species.equalsIgnoreCase("Dog")) {
            return new Dog();
        } else if (species.equalsIgnoreCase("Cat")) {
            return new Cat();
        } else {
            throw new IllegalArgumentException("Unknown species: " + species);
        }
    }
}
