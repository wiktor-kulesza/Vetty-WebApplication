package com.example.repository;

import com.example.entity.Breed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BreedRepository extends JpaRepository<Breed, Integer> {
    Boolean existsByName(String breedName);

    Optional<Breed> findByName(String name);

}
