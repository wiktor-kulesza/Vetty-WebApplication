package com.wkulesza.entity.statistic;

import lombok.*;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Date;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Immutable // This annotation is important for Spring Data to know that this is a view and not a table
@Table(name = "`COMPLEX_STATISTICS`") // Replace with the actual view name
@Subselect("select uuid() as id, cs.* from COMPLEX_STATISTICS cs")
public class PetStatistic implements Serializable {

    @Id
    private String id;

    @Column(name = "pet_id")
    private Integer petId;

    @Column(name = "date")
    private Date date;

    @Column(name = "breed_name")
    private String breedName;

    @Column(name = "factor")
    private String factor;

    @Column(name = "average_value")
    private Double averageValue;

    @Column(name = "breed_average_value")
    private Double breedAverageValue;

}