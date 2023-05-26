package com.wkulesza.entity.statistic;

import lombok.*;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Builder
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Immutable // This annotation is important for Spring Data to know that this is a view and not a table
@Table(name = "`BREED_STATISTICS`") // Replace with the actual view name
@Subselect("select uuid() as id, bs.* from BREED_STATISTICS bs")
public class BreedStatistic implements Serializable {
    @Id
    private String id;

    @Column(name = "breed_name")
    private String breedName;

    @Column(name = "factor")
    private String factor;

    @Column(name = "average_value")
    private Double averageValue;

}