package com.ishaan.project.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.*;
import com.ishaan.project.enums.Gender;

import jakarta.transaction.Transactional;

public interface ProviderProfileRepository extends JpaRepository<ProviderProfile, Integer> {
	public ProviderProfile findById(int id);

	public ProviderProfile deleteById(int id);

	ProviderProfile findByUser_UserID(Integer userID);

	@Modifying
	@Transactional
	@Query("DELETE FROM ProviderProfile p WHERE p.user.userID = :userId")
	void deleteByUserId(@Param("userId") Integer userId);

//	@Query("SELECT p FROM ProviderProfile p JOIN p.user u WHERE " + "(:cityName IS NULL OR u.cityName = :cityName) AND "
//			+ "(:specialty IS NULL OR p.specialty = :specialty) AND " + "(:gender IS NULL OR p.gender = :gender) AND "
//			+ "(:disease IS NULL OR p.treatedDiseases LIKE %:disease%)")
//	Page<ProviderProfile> findProviders(@Param("cityName") String cityName, @Param("specialty") String specialty,
//			@Param("gender") Gender gender, @Param("disease") String disease, Pageable pageable);

	@Query("SELECT p FROM ProviderProfile p WHERE " + "(:cityName IS NULL OR p.user.cityName = :cityName) AND "
			+ "(:specialty IS NULL OR p.specialty = :specialty) AND " + "(:gender IS NULL OR p.gender = :gender) AND "
			+ "(:disease IS NULL OR p.treatedDiseases LIKE %:disease%) AND "
			+ "(:firstName IS NULL OR p.user.firstName LIKE %:firstName%)")
	Page<ProviderProfile> findProviders(@Param("cityName") String cityName, @Param("specialty") String specialty,
			@Param("gender") Gender gender, @Param("disease") String disease, @Param("firstName") String firstName,
			Pageable pageable);

	@Query("SELECT COUNT(p) FROM ProviderProfile p WHERE " + "(:cityName IS NULL OR p.user.cityName = :cityName) AND "
			+ "(:specialty IS NULL OR p.specialty = :specialty) AND " + "(:gender IS NULL OR p.gender = :gender) AND "
			+ "(:disease IS NULL OR p.treatedDiseases LIKE %:disease%) AND "
			+ "(:firstName IS NULL OR p.user.firstName LIKE %:firstName%)")
	Long countFilteredProviders(@Param("cityName") String cityName, @Param("specialty") String specialty,
			@Param("gender") Gender gender, @Param("disease") String disease, @Param("firstName") String firstName);

	@Query("SELECT p FROM ProviderProfile p "
			+ "WHERE (:name IS NULL OR p.user.firstName LIKE %:name% OR p.user.lastName LIKE %:name%) "
			+ "AND (:cityName IS NULL OR p.user.cityName LIKE %:cityName%) ")
	Page<ProviderProfile> searchProviders(@Param("name") String name, @Param("cityName") String cityName,
			Pageable pageable);
	
	
	long count();

}
