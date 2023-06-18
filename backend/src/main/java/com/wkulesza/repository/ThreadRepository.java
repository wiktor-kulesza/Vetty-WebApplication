package com.wkulesza.repository;

import com.wkulesza.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ThreadRepository extends JpaRepository<Thread, Integer> {

    List<Thread> findAllByOrderByMedicalHistoryDateDesc();

    List<Thread> findAllByMedicalHistoryPetId(Integer petId);

    @Query("SELECT DISTINCT t FROM Thread t " +
            "JOIN t.medicalHistory mh " +
            "JOIN mh.tags tag " +
            "JOIN mh.pet pet " +
            "JOIN pet.breed breed " +
            "WHERE tag.value IN :tagValues " +
            "AND pet.class IN :species " +
            "AND breed.name IN :breeds " +
            "AND TIMESTAMPDIFF(YEAR, pet.birthDate, CURRENT_DATE) >= :minAge " +
            "AND TIMESTAMPDIFF(YEAR, pet.birthDate, CURRENT_DATE) <= :maxAge ")
    List<Thread> findThreadsByCriteria(@Param("species") List<String> species,
                                       @Param("breeds") List<String> breeds,
                                       @Param("tagValues") List<String> tagValues,
                                       @Param("minAge") Integer minAge,
                                       @Param("maxAge") Integer maxAge);

}
