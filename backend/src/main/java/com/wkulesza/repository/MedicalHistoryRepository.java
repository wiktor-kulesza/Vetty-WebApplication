package com.wkulesza.repository;

import com.wkulesza.entity.medicalhistory.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Integer> {
    List<MedicalHistory> findAllByPetOwnerEmail(String email);
}
