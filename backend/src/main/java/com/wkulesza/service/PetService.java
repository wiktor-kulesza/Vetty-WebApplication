package com.wkulesza.service;

import com.wkulesza.dto.PetDto;
import com.wkulesza.entity.Image;
import com.wkulesza.entity.Sex;
import com.wkulesza.entity.pet.Pet;
import com.wkulesza.repository.PetRepository;
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
        Pet pet = petRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        return removePet(pet);
    }

    private Integer removePet(Pet pet) {
        pet.removeMedicalHistories();
        petRepository.delete(pet);
        return pet.getId();
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
        pet.setName(petDto.getName());
        pet.setBreed(breedService.getBreedByName(petDto.getBreedName()));
        pet.setBirthDate(petDto.getBirthDate());
        if (petDto.getImageId() != null) {
            Image newImage = imageService.getImageById(petDto.getImageId());
            if (pet.getImage() != null && !pet.getImage().equals(newImage)) {
                pet.setImage(null);
            }
            pet.setImage(newImage);
        } else {
            pet.setImage(null);
        }
        petRepository.save(pet);
        return pet;
    }
}
