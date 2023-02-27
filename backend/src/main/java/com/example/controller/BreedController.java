package com.example.controller;

import com.example.entity.Breed;
import com.example.service.BreedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/breeds")
@RequiredArgsConstructor
public class BreedController {

    private final BreedService breedService;

    @CrossOrigin
    @GetMapping(path = "/all")
    public ResponseEntity<List<Breed>> getAllBreeds() {
        return ResponseEntity.ok(breedService.getAllBreeds());
    }

}
