package com.wkulesza.repository;

import com.wkulesza.entity.statistic.PetStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetStatisticRepository extends JpaRepository<PetStatistic, String> {
    List<PetStatistic> findAllByPetId(Integer petId);
}
