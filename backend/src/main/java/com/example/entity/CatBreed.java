package com.example.entity;

import com.fasterxml.jackson.annotation.JsonTypeName;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("cat")
@JsonTypeName("cat")
public class CatBreed extends Breed {
    // cat breed properties
}
