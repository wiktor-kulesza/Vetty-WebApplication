package com.example.controller;

import com.example.dto.MedicalHistoryDto;
import com.example.entity.medicalhistory.MedicalHistory;
import com.example.entity.medicalhistory.Result;
import com.example.exception.MedicalHistoryToDtoConvertionException;
import com.example.service.MedicalHistoryService;
import com.example.service.PetService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/medical-history")
@RequiredArgsConstructor
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;

    private final PetService petService;

    private final ModelMapper modelMapper;

    @CrossOrigin
    @GetMapping(value = "/all")
    public ResponseEntity<List<MedicalHistoryDto>> getAllMedicalHistories() {
        List<MedicalHistory> medicalHistories = medicalHistoryService.getAllMedicalHistories();
        List<MedicalHistoryDto> medicalHistoryDtos = new ArrayList<>();
        for (MedicalHistory medicalHistory : medicalHistories) {
            medicalHistoryDtos.add(modelMapper.map(medicalHistory, MedicalHistoryDto.class));
        }
        return ResponseEntity.ok(medicalHistoryDtos);
    }

    @CrossOrigin
    @PostMapping(value = "/user")
    public ResponseEntity<List<MedicalHistoryDto>> getMedicalHistoriesByUserEmail(@RequestBody String email) {
        List<MedicalHistory> medicalHistories = medicalHistoryService.getMedicalHistoriesByUserEmail(email);
        List<MedicalHistoryDto> medicalHistoryDtos = new ArrayList<>();
        for (MedicalHistory medicalHistory : medicalHistories) {
            medicalHistoryDtos.add(modelMapper.map(medicalHistory, MedicalHistoryDto.class));
        }
        return ResponseEntity.ok(medicalHistoryDtos);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<MedicalHistory> addMedicalHistory(@RequestBody MedicalHistoryDto medicalHistoryDto) throws MedicalHistoryToDtoConvertionException {
        MedicalHistory medicalHistory = convertToEntity(medicalHistoryDto);
        MedicalHistory savedMedicalHistory = medicalHistoryService.addMedicalHistory(medicalHistory);

        return ResponseEntity.ok(savedMedicalHistory);
    }

    private MedicalHistory convertToEntity(MedicalHistoryDto medicalHistoryDto) throws MedicalHistoryToDtoConvertionException {
        MedicalHistory medicalHistory = MedicalHistory.builder()
                .id(medicalHistoryDto.getId())
                .results(medicalHistoryDto.getResults())
                .date(medicalHistoryDto.getDate())
                .description(medicalHistoryDto.getDescription())
                .diagnosis(medicalHistoryDto.getDiagnosis())
                .isPublic(medicalHistoryDto.getIsPublic())
                .build();
        if (medicalHistoryDto.getBloodResults() != null && !medicalHistoryDto.getBloodResults().isEmpty()) {
            if (medicalHistory.getResults() == null) {
                ArrayList<Result> results = new ArrayList<>();
                results.add(medicalHistoryService.createBloodResults(medicalHistoryDto.getBloodResults()));
                medicalHistory.setResults(results);
            } else
                medicalHistory.getResults().add(medicalHistoryService.createBloodResults(medicalHistoryDto.getBloodResults()));
        }
        if (medicalHistoryDto.getPetId() != null) {
            medicalHistory.setPet(petService.getPetById(medicalHistoryDto.getPetId())
                    .orElseThrow(() -> new MedicalHistoryToDtoConvertionException("Pet with id " + medicalHistoryDto.getPetId() + " not found")));
        }
        return medicalHistory;
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteBloodResults(@PathVariable Integer id) {
        return ResponseEntity.ok(medicalHistoryService.deleteMedicalHistory(id));
    }

}