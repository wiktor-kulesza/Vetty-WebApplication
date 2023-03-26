package com.example.repository;

import com.example.entity.medicalhistory.BloodFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodFactorRepository extends JpaRepository<BloodFactor, Integer> {
}
