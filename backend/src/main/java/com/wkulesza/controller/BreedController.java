package com.wkulesza.controller;

import com.wkulesza.entity.Breed;
import com.wkulesza.service.BreedService;
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
