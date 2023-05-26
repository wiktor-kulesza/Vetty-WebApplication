package com.wkulesza.repository;

import com.wkulesza.entity.medicalhistory.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

}
