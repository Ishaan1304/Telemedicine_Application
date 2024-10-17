package com.ishaan.project.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.PatientProfile;

import jakarta.transaction.Transactional;

public interface PatientProfileRepository extends JpaRepository<PatientProfile, Integer> {
	public PatientProfile findById(int id);

	public PatientProfile deleteById(int id);

	PatientProfile findByUser_UserID(Integer userID);

	@Modifying
	@Transactional
	@Query("DELETE FROM PatientProfile p WHERE p.user.userID = :userId")
	void deleteByUserId(@Param("userId") Integer userId);

	@Query("SELECT p FROM PatientProfile p "
			+ "WHERE (:name IS NULL OR p.user.firstName LIKE %:name% OR p.user.lastName LIKE %:name%) "
			+ "AND (:cityName IS NULL OR p.user.cityName LIKE %:cityName%) "
			+ "AND (:dateOfBirth IS NULL OR p.dateOfBirth = :dateOfBirth)")
	Page<PatientProfile> searchPatients(@Param("name") String name, @Param("cityName") String cityName,
			@Param("dateOfBirth") LocalDate dateOfBirth, Pageable pageable);
	
	 long count();
}
