package com.example.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Getter
@Setter
@SuperBuilder
@RequiredArgsConstructor
@Entity
@DiscriminatorValue("Cat")
public class Cat extends Pet {
}
