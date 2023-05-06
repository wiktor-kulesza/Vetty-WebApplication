package com.example.controller;

import com.example.constants.PetConstants;
import com.example.dto.ImageDto;
import com.example.dto.MedicalHistoryDto;
import com.example.dto.PetDetailsDto;
import com.example.dto.ThreadDto;
import com.example.entity.Thread;
import com.example.entity.User;
import com.example.entity.medicalhistory.MedicalHistory;
import com.example.entity.pet.Cat;
import com.example.entity.pet.Dog;
import com.example.entity.pet.Pet;
import com.example.exception.ThreadCreationException;
import com.example.service.MedicalHistoryService;
import com.example.service.PetService;
import com.example.service.ThreadService;
import com.example.service.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/threads")
@RequiredArgsConstructor
public class ThreadController {

    private final ModelMapper modelMapper;

    private final ThreadService threadService;

    private final MedicalHistoryService medicalHistoryService;

    private final UserService userService;

    private final PetService petService;

    @CrossOrigin
    @GetMapping(value = "/all")
    public ResponseEntity<List<ThreadDto>> getAllThreads() {
        List<Thread> threads = threadService.getAllThreads();
        List<ThreadDto> threadsDto = new ArrayList<>();
        for (Thread thread : threads) {
            ThreadDto threadDto = convertToDto(thread);
            threadsDto.add(threadDto);
        }
        return ResponseEntity.ok(threadsDto);
    }

    @CrossOrigin
    @GetMapping(value = "/{id}")
    public ResponseEntity<ThreadDto> getThreadById(@PathVariable Integer id) {
        Thread thread = threadService.getThreadById(id);
        ThreadDto threadDto = convertToDto(thread);
        return ResponseEntity.ok(threadDto);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<ThreadDto> addThread(@RequestBody ThreadDto threadDto) throws ThreadCreationException {
        Thread thread = convertToEntity(threadDto);
        Thread createdThread = threadService.addThread(thread);
        return ResponseEntity.ok(convertToDto(createdThread));
    }

    private Thread convertToEntity(ThreadDto threadDto) throws ThreadCreationException {
        MedicalHistory medicalHistory = medicalHistoryService.getMedicalHistoryById(threadDto.getMedicalHistoryId());
        if (medicalHistory == null) {
            throw new ThreadCreationException("Medical history for thread not found");
        }
        Optional<User> author = userService.getUserByEmail(threadDto.getAuthorEmail());
        if (author.isEmpty()) {
            throw new ThreadCreationException("Author for thread not found");
        }
        return Thread.builder()
                .title(threadDto.getTitle())
                .content(threadDto.getContent())
                .comments(new ArrayList<>())
                .medicalHistory(medicalHistory)
                .author(author.get())
                .build();
    }

    private ThreadDto convertToDto(Thread thread) {
        ThreadDto threadDto = modelMapper.map(thread, ThreadDto.class);
        threadDto.setAuthorEmail(thread.getAuthor().getEmail());
        threadDto.setMedicalHistory(modelMapper.map(thread.getMedicalHistory(), MedicalHistoryDto.class));
        threadDto.setPet(addPetDetails(thread));
        return threadDto;
    }

    private PetDetailsDto addPetDetails(Thread thread) {
        Pet pet = thread.getMedicalHistory().getPet();
        PetDetailsDto petDetails = modelMapper.map(pet, PetDetailsDto.class);
        if (pet instanceof HibernateProxy) {
            Hibernate.initialize(pet);
            pet = (Pet) ((HibernateProxy) pet).getHibernateLazyInitializer().getImplementation();
        }
        if (pet instanceof Dog)
            petDetails.setSpecies(PetConstants.DOG);
        else if (pet instanceof Cat)
            petDetails.setSpecies(PetConstants.CAT);
        if (pet.getImage() != null && pet.getImage().getImage() != null) {
            petDetails.getImage().setId(pet.getImage().getId());
            petDetails.getImage().setName(pet.getImage().getName());
            petDetails.setImage(new ImageDto());
            petDetails.getImage().setImageBase64(Base64.getEncoder().encodeToString(pet.getImage().getImage()));
            petDetails.getImage().setImage(null);
        }
        return petDetails;
    }
}
