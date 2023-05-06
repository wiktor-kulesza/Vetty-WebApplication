package com.example.entity;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("dog")
@JsonTypeName("dog")
public class DogBreed extends Breed {
    // dog breed properties
}
