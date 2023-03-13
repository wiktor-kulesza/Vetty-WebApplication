package com.example.service;

import com.example.entity.Pet;
import com.example.repository.PetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;


    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getAllPetsByUserId(Integer userId) {
        return petRepository.findAllByOwnerId(userId);
    }

    public Optional<Pet> getPetById(Integer id) {
        return petRepository.findById(id);
    }

    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet removePet(Integer id) {
        if (petRepository.existsById(id)) {
            Pet pet = petRepository.findById(id).get();
            petRepository.deleteById(id);
            return pet;
        } else {
            throw new IllegalArgumentException("No pet with id " + id + " exists.");
        }

    }

    public List<Pet> getAllPetsByUserEmail(String email) {
        return petRepository.findAllByOwnerEmail(email);
    }
}
