package com.wkulesza.entity;

import com.wkulesza.entity.medicalhistory.MedicalHistory;
import com.wkulesza.entity.pet.Cat;
import com.wkulesza.entity.pet.Pet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Date;
import java.util.Iterator;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class PetTest {
    @Mock
    private List<MedicalHistory> medicalHistories;

    private Pet pet;
    String dateString = "2023-06-16";

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        pet = Cat.builder()
                .id(1)
                .name("Tom")
                .sex(Sex.MALE)
                .birthDate(Date.valueOf(dateString))
                .medicalHistories(medicalHistories)
                .build();
    }

    @Test
    public void testRemoveMedicalHistories() {
        MedicalHistory medicalHistory1 = mock(MedicalHistory.class);
        MedicalHistory medicalHistory2 = mock(MedicalHistory.class);

        when(medicalHistories.iterator()).thenReturn(mock(Iterator.class));
        when(medicalHistories.iterator().hasNext()).thenReturn(true, true, false);
        when(medicalHistories.iterator().next()).thenReturn(medicalHistory1, medicalHistory2);

        pet.removeMedicalHistories();

        verify(medicalHistory1, times(1)).removeAllTags();
        verify(medicalHistory1, times(1)).setPet(null);
        verify(medicalHistory2, times(1)).removeAllTags();
        verify(medicalHistory2, times(1)).setPet(null);
        verify(medicalHistories, times(3)).iterator();
        verify(medicalHistories.iterator(), times(3)).hasNext();
        verify(medicalHistories.iterator(), times(2)).next();

        assertEquals(0, pet.getMedicalHistories().size());
    }
}