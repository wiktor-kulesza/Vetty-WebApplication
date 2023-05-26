package com.wkulesza.util;

import com.wkulesza.entity.medicalhistory.BloodFactorType;

import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class StringUtil {
    public static List<String> enumTypes = Arrays.asList(Arrays.stream(BloodFactorType.values()).map(BloodFactorType::name).toArray(String[]::new));
    public static List<String> enumNames = Arrays.asList(Arrays.stream(BloodFactorType.values()).map(BloodFactorType::getFullName).toArray(String[]::new));

    public static String findBloodTagsWithValues(String input) {
        String regex = "(?m)^(" + String.join("|", enumTypes) + "|" + String.join("|", enumNames) + ")\\s+(-?\\d+(?:[,.]\\d+)?|\\d*[,.]\\d+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        StringBuilder builder = new StringBuilder();
        int startIndex = 0;
        while (matcher.find(startIndex)) {
            builder.append(matcher.group()).append(System.lineSeparator());
            startIndex = matcher.end();
        }
        return builder.toString();
    }
}
