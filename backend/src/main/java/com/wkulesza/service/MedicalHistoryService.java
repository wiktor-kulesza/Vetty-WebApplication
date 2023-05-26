package com.wkulesza.service;

import com.wkulesza.constants.TagConstants;
import com.wkulesza.entity.medicalhistory.BloodFactor;
import com.wkulesza.entity.medicalhistory.MedicalHistory;
import com.wkulesza.entity.medicalhistory.Result;
import com.wkulesza.entity.medicalhistory.Tag;
import com.wkulesza.repository.MedicalHistoryRepository;
import com.wkulesza.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;

    private final TagRepository tagRepository;

    public MedicalHistory addMedicalHistory(MedicalHistory medicalHistory) {
        medicalHistory.getResults().forEach(result -> result.setMedicalHistory(medicalHistory));
        Set<Tag> tags = createTags(medicalHistory);
        addTags(medicalHistory, tags);
        return medicalHistoryRepository.save(medicalHistory);
    }

    private void addTags(MedicalHistory medicalHistory, Set<Tag> tags) {
        Set<Tag> newTags = new HashSet<>();
        for (Tag tag : tags) {
            Tag existingTag = tagRepository.findByValue(tag.getValue()).orElse(null);
            newTags.add(Objects.requireNonNullElse(existingTag, tag));
        }
        medicalHistory.setTags(newTags);
    }

    private Set<Tag> createTags(MedicalHistory medicalHistory) {
        Set<Tag> tags = new HashSet<>();
        for (Result result : medicalHistory.getResults()) {
            for (BloodFactor factor : result.getFactors()) {
                tags.add(createTag(factor));
            }
        }
        return tags;
    }

    private Tag createTag(BloodFactor factor) {
        String value;
        if (factor.isHigh()) {
            value = factor.getBloodFactorType() + " " + TagConstants.HYPOTHYROIDISM;
        } else if (factor.isLow()) {
            value = factor.getBloodFactorType() + " " + TagConstants.HYPERTHYROIDISM;
        } else {
            value = factor.getBloodFactorType() + " " + TagConstants.NORMAL;
        }
        Tag tag = new Tag();
        tag.setValue(value);
        return tag;
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

    public List<MedicalHistory> getMedicalHistoriesByUserEmail(String email) {
        return medicalHistoryRepository.findAllByPetOwnerEmail(email);
    }

    public MedicalHistory getMedicalHistoryById(Integer id) {
        return medicalHistoryRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }

    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryRepository.findAll();
    }
}
