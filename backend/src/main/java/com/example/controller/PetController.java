package com.example.controller;

import com.example.constants.PetConstants;
import com.example.dto.PetDto;
import com.example.entity.Cat;
import com.example.entity.Dog;
import com.example.entity.Pet;
import com.example.exception.PetToDtoConvertionException;
import com.example.service.BreedService;
import com.example.service.PetService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    private final BreedService breedService;

    private final UserService userService;

    private final ModelMapper modelMapper;

    @GetMapping(path = "/all")
    public ResponseEntity<List<PetDto>> getAllPets() throws PetToDtoConvertionException {
        List<Pet> pets = petService.getAllPets();
        List<PetDto> petsDto = new ArrayList<>();
        for (Pet pet : pets) {
            PetDto petDto = convertToDto(pet);
            petsDto.add(petDto);
        }
        return ResponseEntity.ok(petsDto);
    }

    @CrossOrigin
    @GetMapping(path = "/user/{id}")
    public ResponseEntity<List<PetDto>> getAllPetsByUserId(@PathVariable Integer id) throws PetToDtoConvertionException {
        List<Pet> pets = petService.getAllPetsByUserId(id);
        List<PetDto> petsDto = new ArrayList<>();
        for (Pet pet : pets) {
            PetDto petDto = convertToDto(pet);
            petsDto.add(petDto);
        }
        return ResponseEntity.ok(petsDto);
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public ResponseEntity<PetDto> getPetById(@PathVariable Integer id) throws PetToDtoConvertionException {
        Pet pet = petService.getPetById(id).orElse(null);
        PetDto petDto = convertToDto(pet);
        return ResponseEntity.ok(petDto);
    }

    @CrossOrigin
    @PutMapping(value = "/{id}")
    public ResponseEntity<Pet> modifyPet(@PathVariable Integer id, @RequestBody PetDto petDto) throws IOException {
        if (!Objects.equals(id, petDto.getId())) {
            throw new IllegalArgumentException("IDs don't match");
        }
        Pet pet = convertToEntity(petDto);
        pet.setId(id);
        return ResponseEntity.ok(petService.addPet(pet));
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Pet> deletePet(@PathVariable Integer id) {
        return ResponseEntity.ok(petService.removePet(id));
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody PetDto petDto) throws IOException {
        Pet pet = convertToEntity(petDto);
        return ResponseEntity.ok(petService.addPet(pet));
    }

    private PetDto convertToDto(Pet pet) throws PetToDtoConvertionException {
        PetDto petDto = modelMapper.map(pet, PetDto.class);
        petDto.setOwnerId(pet.getOwner().getId());
        if (pet instanceof Dog)
            petDto.setSpecies(PetConstants.DOG);
        else if (pet instanceof Cat)
            petDto.setSpecies(PetConstants.CAT);
        else
            throw new PetToDtoConvertionException("Pet is not a dog or a cat");
        return petDto;
    }

    private Pet convertToEntity(PetDto petDto) throws IOException {
        // TODO: add image adding and validation
        if (!breedService.validateBreed(petDto.getBreedName()) || !userService.validateUser(petDto.getOwnerId()))
            throw new IllegalArgumentException("Invalid arguments (breed or user)");
        Pet pet;
        if (petDto.getSpecies().equalsIgnoreCase(PetConstants.DOG)) {
            pet = Dog.builder()
                    .name(petDto.getName())
                    .birthDate(petDto.getBirthDate())
                    .breed(breedService.getBreedByName(petDto.getBreedName()))
                    .owner(userService.getUserById(petDto.getOwnerId()).orElse(null))
                    .build();
        } else if (petDto.getSpecies().equalsIgnoreCase(PetConstants.CAT))
            pet = Cat.builder()
                    .name(petDto.getName())
                    .birthDate(petDto.getBirthDate())
                    .breed(breedService.getBreedByName(petDto.getBreedName()))
                    .owner(userService.getUserById(petDto.getOwnerId()).orElse(null))
                    .build();
        else
            throw new IllegalArgumentException("Species is not a dog or a cat");
        if (petDto.getImage() != null)
            pet.setImage(petDto.getImage().getBytes());
        return pet;
    }
}
