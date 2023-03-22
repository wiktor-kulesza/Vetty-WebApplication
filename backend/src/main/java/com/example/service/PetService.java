package com.example.service;

import com.example.dto.PetDto;
import com.example.entity.Sex;
import com.example.entity.pet.Pet;
import com.example.repository.PetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PetService {

    private final PetRepository petRepository;

    private final BreedService breedService;

    private final ImageService imageService;


    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Optional<Pet> getPetById(Integer id) {
        return petRepository.findById(id);
    }

    public Pet addPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Integer removePet(Integer id) {
        petRepository.deleteById(id);
        return id;
    }

    public List<Pet> getAllPetsByUserEmail(String email) {
        return petRepository.findAllByOwnerEmail(email);
    }

    public Pet modifyPet(Integer id, PetDto petDto) {
        if (!Objects.equals(id, petDto.getId())) {
            throw new IllegalArgumentException("IDs don't match");
        }
        Optional<Pet> petOptional = petRepository.findById(id);
        if (petOptional.isEmpty()) {
            throw new IllegalArgumentException("Pet with id " + id + " doesn't exist");
        }
        Pet pet = petOptional.get();
        pet.setSex(Sex.valueOf(petDto.getSex()));
        pet.setBreed(breedService.getBreedByName(petDto.getBreedName()));
        pet.setBirthDate(petDto.getBirthDate());
        if (petDto.getImageId() != null) {
            pet.setImage(imageService.getImageById(petDto.getImageId()));
        }
        petRepository.save(pet);
        return pet;
    }
}
