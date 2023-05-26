package com.wkulesza.controller;

import com.wkulesza.converter.PetStatisticConverter;
import com.wkulesza.dto.statistic.PetStatisticDto;
import com.wkulesza.entity.statistic.BreedStatistic;
import com.wkulesza.entity.statistic.PetStatistic;
import com.wkulesza.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(maxAge = 3600)
@RequestMapping(path = "/api/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;


    @PostMapping(value = "/breed")
    @CrossOrigin
    public ResponseEntity<List<BreedStatistic>> getStatisticsForBreed(@RequestParam String breedName) {
        List<BreedStatistic> statistics = statisticService.getBreedStatistics(breedName);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping(value = "/pet/{petId}")
    @CrossOrigin
    public ResponseEntity<List<PetStatisticDto>> getStatisticsForPet(@PathVariable Integer petId) {
        List<PetStatistic> statistics = statisticService.getPetStatisticsByPetId(petId);
        List<PetStatisticDto> petStatisticDtos = PetStatisticConverter.convert(statistics);
        return ResponseEntity.ok(petStatisticDtos);
    }

}
