package com.wkulesza.service;

import com.wkulesza.entity.Breed;
import com.wkulesza.repository.BreedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BreedService {
    private final BreedRepository breedRepository;

    public Boolean validateBreed(String breedName) {
        return breedRepository.existsByName(breedName);
    }

    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    public Breed getBreedById(Integer id) {
        return breedRepository.findById(id).orElse(null);
    }

    public Breed getBreedByName(String name) {
        return breedRepository.findByName(name).orElse(null);
    }
}
