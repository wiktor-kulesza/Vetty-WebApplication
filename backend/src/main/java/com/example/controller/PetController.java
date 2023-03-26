package com.example.controller;

import com.example.constants.PetConstants;
import com.example.dto.PetDto;
import com.example.entity.Sex;
import com.example.entity.pet.Cat;
import com.example.entity.pet.Dog;
import com.example.entity.pet.Pet;
import com.example.entity.pet.SpeciesPetFactory;
import com.example.exception.PetToDtoConvertionException;
import com.example.service.BreedService;
import com.example.service.ImageService;
import com.example.service.PetService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Locale;


@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/pets")
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    private final BreedService breedService;

    private final UserService userService;

    private final ImageService imageService;

    private final ModelMapper modelMapper;

    private final SpeciesPetFactory petFactory = new SpeciesPetFactory();

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
    @GetMapping(path = "/user/{email}")
    public ResponseEntity<List<PetDto>> getAllPetsByUserId(@PathVariable String email) throws PetToDtoConvertionException {
        List<Pet> pets = petService.getAllPetsByUserEmail(email);
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
    public ResponseEntity<Pet> modifyPet(@PathVariable Integer id, @RequestBody PetDto petDto) {
        return ResponseEntity.ok(petService.modifyPet(id, petDto));
    }

    @CrossOrigin
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Integer> deletePet(@PathVariable Integer id) {
        return ResponseEntity.ok(petService.removePet(id));
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody PetDto petDto) {
        Pet pet = convertToEntity(petDto);
        return ResponseEntity.ok(petService.addPet(pet));
    }

    private PetDto convertToDto(Pet pet) throws PetToDtoConvertionException {
        PetDto petDto = modelMapper.map(pet, PetDto.class);
        if (pet.getImage() != null && pet.getImage().getImage() != null) {
            petDto.getImage().setImageBase64(Base64.getEncoder().encodeToString(petDto.getImage().getImage()));
            petDto.getImage().setImage(null);
        }
        if (pet instanceof Dog)
            petDto.setSpecies(PetConstants.DOG);
        else if (pet instanceof Cat)
            petDto.setSpecies(PetConstants.CAT);
        else
            throw new PetToDtoConvertionException("Pet is not a dog or a cat");
        return petDto;
    }

    private Pet convertToEntity(PetDto petDto) {
        // TODO: add image validation and refactor with abstract factory pattern
        if (!breedService.validateBreed(petDto.getBreedName()) || !userService.validateUser(petDto.getOwnerEmail()))
            throw new IllegalArgumentException("Invalid arguments (breed or user)");
        Pet pet = petFactory.createPet(petDto.getSpecies());
        pet.setName(petDto.getName());
        pet.setSex(Sex.valueOf(petDto.getSex().toUpperCase(Locale.ROOT)));
        pet.setBirthDate(petDto.getBirthDate());
        pet.setBreed(breedService.getBreedByName(petDto.getBreedName()));
        pet.setOwner(userService.getUserByEmail(petDto.getOwnerEmail()).orElse(null));
        if (petDto.getImageId() != null)
            pet.setImage(imageService.getImageById(petDto.getImageId()));
        return pet;
    }

}
