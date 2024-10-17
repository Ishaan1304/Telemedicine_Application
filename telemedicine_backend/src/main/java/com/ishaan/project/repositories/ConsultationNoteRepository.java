package com.ishaan.project.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.ConsultationNote;

import jakarta.transaction.Transactional;

public interface ConsultationNoteRepository extends JpaRepository<ConsultationNote, Integer> {
	List<ConsultationNote> findByPatientProfile_PatientIDAndProviderProfile_ProviderID(Integer patientID,
			Integer providerID);

	@Modifying
	@Transactional
	@Query("DELETE FROM ConsultationNote c WHERE c.providerProfile.providerID = :providerId")
	void deleteByProviderProfileId(@Param("providerId") Integer providerId);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM ConsultationNote c WHERE c.patientProfile.patientID = :patientId")
	void deleteByPatientProfileId(@Param("patientId") Integer patientId);
	
	@Query("SELECT cn FROM ConsultationNote cn WHERE cn.patientProfile.id = :patientId AND cn.providerProfile.id = :providerId ORDER BY cn.dateTime DESC LIMIT 1")
    Optional<ConsultationNote> findMostRecentConsultationNote(@Param("patientId") Integer patientId, @Param("providerId") Integer providerId);

}
