package com.example.service;

import com.example.constants.TagConstants;
import com.example.entity.medicalhistory.BloodFactor;
import com.example.entity.medicalhistory.MedicalHistory;
import com.example.entity.medicalhistory.Result;
import com.example.entity.medicalhistory.Tag;
import com.example.repository.MedicalHistoryRepository;
import com.example.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;

    private final TagRepository tagRepository;

    public List<Tag> createTagsForHistory(MedicalHistory medicalHistory) {
        List<Tag> tags = new ArrayList<>();
        for (Result result : medicalHistory.getResults()) {
            for (BloodFactor factor : result.getFactors()) {
                tags.add(createTag(factor, medicalHistory));
            }
        }
        return tags;
    }

    private Tag createTag(BloodFactor factor, MedicalHistory medicalHistory) {
        String value;
        if (factor.isHigh()) {
            value = factor.getBloodFactorType() + " " + TagConstants.HYPOTHYROIDISM;
        } else if (factor.isLow()) {
            value = factor.getBloodFactorType() + " " + TagConstants.HYPERTHYROIDISM;
        } else {
            value = factor.getBloodFactorType() + " " + TagConstants.NORMAL;
        }
        Optional<Tag> searchedTag = tagRepository.findByValue(value);
        if (searchedTag.isPresent()) {
            searchedTag.get().getMedicalHistoryList().add(medicalHistory);
            return searchedTag.get();
        } else {
            Tag tag = new Tag();
            tag.setValue(value);
            tag.getMedicalHistoryList().add(medicalHistory);
            tagRepository.save(tag);
            return tag;
        }
    }

    public MedicalHistory addMedicalHistory(MedicalHistory medicalHistory) {
        medicalHistory.setTags(createTagsForHistory(medicalHistory));
        medicalHistory.getResults().forEach(result -> result.setMedicalHistory(medicalHistory));
        return medicalHistoryRepository.save(medicalHistory);
    }

    public Integer deleteMedicalHistory(Integer id) {
        medicalHistoryRepository.deleteById(id);
        return id;
    }

    public Result createBloodResults(List<BloodFactor> bloodResults) {
        Result result = Result.builder().factors(bloodResults).build();
        bloodResults.forEach(factor -> factor.setResult(result));
        return result;
    }
}
