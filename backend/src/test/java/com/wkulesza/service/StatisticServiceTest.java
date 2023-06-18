package com.wkulesza.service;

import com.wkulesza.entity.statistic.BreedStatistic;
import com.wkulesza.entity.statistic.PetStatistic;
import com.wkulesza.repository.BreedStatisticRepository;
import com.wkulesza.repository.PetStatisticRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
public class StatisticServiceTest {

    @Mock
    private BreedStatisticRepository breedStatisticRepository;

    @Mock
    private PetStatisticRepository petStatisticRepository;

    @InjectMocks
    private StatisticService statisticService;

    @Test
    public void testGetBreedStatistics_ReturnsBreedStatistics() {
        // Arrange
        String breedName = "Labrador";
        BreedStatistic breedStatistic = new BreedStatistic();
        when(breedStatisticRepository.findAllByBreedName(breedName)).thenReturn(Arrays.asList(breedStatistic));

        // Act
        List<BreedStatistic> result = statisticService.getBreedStatistics(breedName);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(breedStatistic, result.get(0));
        verify(breedStatisticRepository, times(1)).findAllByBreedName(breedName);
    }

    @Test
    public void testGetPetStatisticsByPetId_ReturnsPetStatistics() {
        // Arrange
        Integer petId = 1;
        PetStatistic petStatistic = new PetStatistic();
        when(petStatisticRepository.findAllByPetId(petId)).thenReturn(Arrays.asList(petStatistic));

        // Act
        List<PetStatistic> result = statisticService.getPetStatisticsByPetId(petId);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(petStatistic, result.get(0));
        verify(petStatisticRepository, times(1)).findAllByPetId(petId);
    }
}
