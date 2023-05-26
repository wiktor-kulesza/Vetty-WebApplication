package com.wkulesza.service;

import com.wkulesza.entity.statistic.BreedStatistic;
import com.wkulesza.entity.statistic.PetStatistic;
import com.wkulesza.repository.BreedStatisticRepository;
import com.wkulesza.repository.PetStatisticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StatisticService {

    private final BreedStatisticRepository breedStatisticRepository;

    private final PetStatisticRepository petStatisticRepository;

    public List<BreedStatistic> getBreedStatistics(String breedName) {
        return breedStatisticRepository.findAllByBreedName(breedName);
    }

    public List<PetStatistic> getPetStatisticsByPetId(Integer petId) {
        return petStatisticRepository.findAllByPetId(petId);
    }
}
