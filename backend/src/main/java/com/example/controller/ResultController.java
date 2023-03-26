package com.example.controller;

import com.example.dto.ResultDto;
import com.example.entity.medicalhistory.Result;
import com.example.exception.MedicalHistoryCreationException;
import com.example.service.ResultService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/result")
@RequiredArgsConstructor
public class ResultController {

    private final ModelMapper modelMapper;

    private final ResultService resultService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<ResultDto> getBloodResultsFromFile(@RequestParam("results") MultipartFile file) throws MedicalHistoryCreationException {
        Result result = resultService.createBloodResultsFromFile(file);
        return ResponseEntity.ok(modelMapper.map(result, ResultDto.class));
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Integer> deleteBloodResults(@PathVariable Integer id) {
        return ResponseEntity.ok(resultService.deleteBloodResults(id));
    }

}
