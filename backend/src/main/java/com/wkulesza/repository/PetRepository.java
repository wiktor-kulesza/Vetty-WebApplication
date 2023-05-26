package com.wkulesza.repository;

import com.wkulesza.entity.pet.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {

    List<Pet> findAllByOwnerEmail(String email);
}
