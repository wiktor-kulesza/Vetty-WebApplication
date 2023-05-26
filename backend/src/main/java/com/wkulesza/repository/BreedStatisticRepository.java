package com.wkulesza.repository;

import com.wkulesza.entity.statistic.BreedStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreedStatisticRepository extends JpaRepository<BreedStatistic, String> {

    List<BreedStatistic> findAllByBreedName(String breedName);
}
