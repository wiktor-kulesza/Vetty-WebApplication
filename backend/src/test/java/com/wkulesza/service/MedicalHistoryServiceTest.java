package com.wkulesza.service;

import com.wkulesza.entity.medicalhistory.*;
import com.wkulesza.repository.MedicalHistoryRepository;
import com.wkulesza.repository.TagRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
public class MedicalHistoryServiceTest {

    @Mock
    private MedicalHistoryRepository medicalHistoryRepository;

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private MedicalHistoryService medicalHistoryService;

    @Test
    public void testAddMedicalHistory_SavesMedicalHistoryWithTags() {
        // Arrange
        MedicalHistory medicalHistory = new MedicalHistory();
        Result result = new Result();
        BloodFactor bloodFactor = new BloodFactor();
        bloodFactor.setBloodFactorType(BloodFactorType.HCT);
        bloodFactor.setValue(1.0);
        medicalHistory.setResults(new ArrayList<>());
        result.setFactors(new ArrayList<>());
        result.getFactors().add(bloodFactor);
        medicalHistory.getResults().add(result);

        Tag tag = new Tag();
        tag.setValue("Test Tag");
        Set<Tag> tags = new HashSet<>();
        tags.add(tag);

        when(tagRepository.findByValue(anyString())).thenReturn(Optional.empty());
        when(tagRepository.save(any(Tag.class))).thenReturn(tag);
        when(medicalHistoryRepository.save(medicalHistory)).thenReturn(medicalHistory);

        // Act
        MedicalHistory resultMedicalHistory = medicalHistoryService.addMedicalHistory(medicalHistory);

        // Assert
        verify(medicalHistoryRepository, times(1)).save(medicalHistory);
    }

    @Test
    public void testDeleteMedicalHistory_DeletesMedicalHistoryById() {
        // Arrange
        Integer id = 1;

        // Act
        Integer resultId = medicalHistoryService.deleteMedicalHistory(id);

        // Assert
        verify(medicalHistoryRepository, times(1)).deleteById(id);
        assertEquals(id, resultId);
    }

    @Test
    public void testCreateBloodResults_CreatesResultWithBloodFactors() {
        // Arrange
        List<BloodFactor> bloodResults = List.of(new BloodFactor());

        // Act
        Result result = medicalHistoryService.createBloodResults(bloodResults);

        // Assert
        assertEquals(bloodResults, result.getFactors());
    }

    @Test
    public void testGetMedicalHistoriesByUserEmail_ReturnsMedicalHistories() {
        // Arrange
        String email = "user@example.com";
        List<MedicalHistory> expectedMedicalHistories = List.of(new MedicalHistory());
        when(medicalHistoryRepository.findAllByPetOwnerEmail(email)).thenReturn(expectedMedicalHistories);

        // Act
        List<MedicalHistory> result = medicalHistoryService.getMedicalHistoriesByUserEmail(email);

        // Assert
        assertEquals(expectedMedicalHistories, result);
    }

    @Test
    public void testGetMedicalHistoryById_ReturnsMedicalHistory() {
        // Arrange
        Integer id = 1;
        MedicalHistory expectedMedicalHistory = new MedicalHistory();
        when(medicalHistoryRepository.findById(id)).thenReturn(Optional.of(expectedMedicalHistory));

        // Act
        MedicalHistory result = medicalHistoryService.getMedicalHistoryById(id);

        // Assert
        assertEquals(expectedMedicalHistory, result);
    }

    @Test
    public void testGetAllMedicalHistories_ReturnsAllMedicalHistories() {
        // Arrange
        List<MedicalHistory> expectedMedicalHistories = List.of(new MedicalHistory());
        when(medicalHistoryRepository.findAll()).thenReturn(expectedMedicalHistories);

        // Act
        List<MedicalHistory> result = medicalHistoryService.getAllMedicalHistories();

        // Assert
        assertEquals(expectedMedicalHistories, result);
    }
}
