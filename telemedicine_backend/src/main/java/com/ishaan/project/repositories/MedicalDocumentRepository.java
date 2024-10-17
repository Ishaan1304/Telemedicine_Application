package com.ishaan.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ishaan.project.entities.MedicalDocument;


public interface MedicalDocumentRepository extends JpaRepository<MedicalDocument,Integer> {
	@Query("SELECT m.documentName FROM MedicalDocument m where m.user.userID=:userID")
    public List<String> findAllDocumentNames(@Param("userID") Integer userID);
	
	
	
	 @Query("SELECT md FROM MedicalDocument md WHERE md.appointment.appointmentID = :appointmentID")
	 List<MedicalDocument> findByAppointmentId(@Param("appointmentID") Integer appointmentID);
	
}
