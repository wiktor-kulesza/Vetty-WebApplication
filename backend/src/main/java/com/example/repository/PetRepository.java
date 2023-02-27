package com.example.repository;

import com.example.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findAllByOwnerId(Integer id);

    List<Pet> getAllByOwnerId(Integer id);
}
