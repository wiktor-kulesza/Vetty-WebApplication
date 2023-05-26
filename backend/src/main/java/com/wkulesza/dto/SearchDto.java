package com.wkulesza.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Getter
public class SearchDto {

    private List<String> species;

    private List<String> breeds;

    private Integer minAge;

    private Integer maxAge;

    private List<String> tags;
}
