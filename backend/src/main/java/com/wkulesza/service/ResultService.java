package com.wkulesza.service;

import com.wkulesza.entity.medicalhistory.BloodFactor;
import com.wkulesza.entity.medicalhistory.BloodFactorType;
import com.wkulesza.entity.medicalhistory.Result;
import com.wkulesza.exception.MedicalHistoryCreationException;
import com.wkulesza.repository.BloodFactorRepository;
import com.wkulesza.repository.ResultRepository;
import com.wkulesza.util.FileUtil;
import com.wkulesza.util.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Log4j2
public class ResultService {
    private final ResultRepository resultRepository;

    private final BloodFactorRepository bloodFactorRepository;

    public Result createBloodResultsFromFile(MultipartFile multipartFile) throws MedicalHistoryCreationException {
        ITesseract instance = new Tesseract();
        instance.setDatapath("backend/src/main/resources/tess4j/tessdata");
        File file = FileUtil.convertToFile(multipartFile);
        try {
            String tagsWithValues = StringUtil.findBloodTagsWithValues(instance.doOCR(file));
            List<BloodFactor> results = createBloodResults(tagsWithValues);
            FileUtil.deleteFile(file);
            Result result = new Result();
            result.setFactors(results);
            results.forEach(bloodFactor -> bloodFactor.setResult(result));
            return result;
        } catch (TesseractException e) {
            throw new MedicalHistoryCreationException("Error while creating medical history", e);
        }

    }

    private List<BloodFactor> createBloodResults(String inputAfterRegex) throws MedicalHistoryCreationException {
        List<BloodFactor> bloodFactors = new ArrayList<>();
        if (inputAfterRegex == null || inputAfterRegex.isEmpty())
            return bloodFactors;
        String[] lines = inputAfterRegex.split("\\r?\\n");
        for (String line : lines) {
            String[] parts = line.trim().split("\\s+");
            if (parts.length == 2) {
                String name = parts[0];
                Double value = Double.parseDouble(parts[1].replace(",", "."));
                bloodFactors.add(createBloodFactor(name, value));
            } else if (parts.length == 3) {
                String name = parts[0] + " " + parts[1];
                Double value = Double.parseDouble(parts[2].replace(",", "."));
                bloodFactors.add(createBloodFactor(name, value));
            } else {
                throw new MedicalHistoryCreationException("Name of blood factor is not correct");
            }
        }
        return bloodFactors;

    }

    private BloodFactor createBloodFactor(String name, Double value) throws MedicalHistoryCreationException {
        try {
            BloodFactorType factor;
            if (StringUtil.enumNames.contains(name))
                factor = BloodFactorType.valueOfFullName(name);
            else
                factor = BloodFactorType.valueOf(name);
            return BloodFactor.builder()
                    .bloodFactorType(factor)
                    .value(value)
                    .build();
        } catch (NumberFormatException e) {
            throw new MedicalHistoryCreationException("Error while creating medical history", e);
        }
    }

    public Result addBloodResults(Result result) {
        return resultRepository.save(result);
    }


    public Integer deleteBloodResults(Integer id) {
        resultRepository.deleteById(id);
        return id;
    }
}
