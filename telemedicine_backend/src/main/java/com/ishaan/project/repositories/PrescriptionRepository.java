package com.ishaan.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.Prescription;
import com.ishaan.project.entities.ProviderProfile;

import jakarta.transaction.Transactional;

public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {
	List<Prescription> findByPatientProfile_PatientID(Integer patientID);

	@Query("SELECT DISTINCT p.providerProfile FROM Prescription p WHERE p.patientProfile.patientID = :patientID")
	List<ProviderProfile> findDistinctProvidersByPatientId(@Param("patientID") Integer patientID);

	@Query("SELECT p FROM Prescription p WHERE p.providerProfile.providerID = :providerID")
	List<Prescription> findPrescriptionsByProviderId(@Param("providerID") Integer providerID);

	List<Prescription> findByProviderProfile_ProviderIDAndPatientProfile_PatientID(Integer providerID,
			Integer patientID);

	@Modifying
	@Transactional
	@Query("DELETE FROM Prescription p WHERE p.patientProfile.patientID = :patientId")
	void deleteByPatientProfileId(@Param("patientId") Integer patientId);

	@Modifying
	@Transactional
	@Query("DELETE FROM Prescription p WHERE p.providerProfile.providerID = :providerId")
	void deleteByProviderProfileId(@Param("providerId") Integer providerId);

	@Query("SELECT p FROM Prescription p WHERE p.providerProfile.providerID = :providerId GROUP BY p.appointment.appointmentID")
	List<Prescription> findPrescriptionsByProviderIdGroupedByAppointmentId(@Param("providerId") Integer providerId);
	
	
	
	@Query("SELECT p FROM Prescription p WHERE p.appointment.appointmentID = :appointmentID")
    List<Prescription> findByAppointmentId(Integer appointmentID);
}
