package com.wkulesza.service;

import com.wkulesza.entity.medicalhistory.Result;
import com.wkulesza.exception.MedicalHistoryCreationException;
import com.wkulesza.repository.BloodFactorRepository;
import com.wkulesza.repository.ResultRepository;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.TesseractException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
public class ResultServiceTest {

    @Mock
    private ResultRepository resultRepository;

    @Mock
    private BloodFactorRepository bloodFactorRepository;

    @InjectMocks
    private ResultService resultService;

    private MockMultipartFile multipartFile;

    @BeforeEach
    public void setup() {
        multipartFile = new MockMultipartFile("file", "test.pdf", "application/pdf", "Test Content".getBytes());
    }

    @Test
    public void testCreateBloodResultsFromFile_ThrowsExceptionOnOCRFailure() throws TesseractException {
        // Arrange
        ITesseract instanceMock = mock(ITesseract.class);
        when(instanceMock.doOCR(any(File.class))).thenThrow(TesseractException.class);


        // Act and Assert
        assertThrows(MedicalHistoryCreationException.class,
                () -> resultService.createBloodResultsFromFile(multipartFile));
    }

    @Test
    public void testAddBloodResults_AddsBloodResultsToRepository() {
        // Arrange
        Result result = new Result();

        // Act
        Result savedResult = resultService.addBloodResults(result);

        // Assert
        verify(resultRepository, times(1)).save(result);
    }

    @Test
    public void testDeleteBloodResults_DeletesBloodResultsFromRepository() {
        // Arrange
        Integer id = 1;

        // Act
        Integer deletedId = resultService.deleteBloodResults(id);

        // Assert
        assertEquals(id, deletedId);
        verify(resultRepository, times(1)).deleteById(id);
    }
}
