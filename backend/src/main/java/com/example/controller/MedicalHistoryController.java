package com.example.controller;

import com.example.dto.MedicalHistoryDto;
import com.example.entity.medicalhistory.MedicalHistory;
import com.example.exception.MedicalHistoryToDtoConvertionException;
import com.example.service.MedicalHistoryService;
import com.example.service.PetService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/medical-history")
@RequiredArgsConstructor
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;

    private final PetService petService;

    private final ModelMapper modelMapper;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<MedicalHistory> addMedicalHistory(@RequestBody MedicalHistoryDto medicalHistoryDto) throws MedicalHistoryToDtoConvertionException {
        MedicalHistory medicalHistory = convertToEntity(medicalHistoryDto);
        MedicalHistory savedMedicalHistory = medicalHistoryService.addMedicalHistory(medicalHistory);
        savedMedicalHistory.setTags(medicalHistoryService.createTagsForHistory(medicalHistory));
        return ResponseEntity.ok(savedMedicalHistory);
    }

    private MedicalHistory convertToEntity(MedicalHistoryDto medicalHistoryDto) throws MedicalHistoryToDtoConvertionException {
        MedicalHistory medicalHistory = MedicalHistory.builder()
                .id(medicalHistoryDto.getId())
                .bloodResults(medicalHistoryDto.getBloodResults())
                .date(medicalHistoryDto.getDate())
                .description(medicalHistoryDto.getDescription())
                .diagnosis(medicalHistoryDto.getDiagnosis())
                .build();
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