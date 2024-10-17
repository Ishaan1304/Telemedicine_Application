package com.ishaan.project.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.Appointment;
import com.ishaan.project.enums.AppointmentStatus;
import com.ishaan.project.enums.Gender;

import jakarta.transaction.Transactional;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
	@Query("SELECT a FROM Appointment a WHERE a.providerProfile.providerID = :providerID AND "
			+ "((a.startTime <= :endTime AND a.endTime >= :startTime))")
	List<Appointment> findOverlappingAppointments(@Param("providerID") Integer providerID,
			@Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);

	List<Appointment> findByPatientProfilePatientIDAndStartTimeAfterOrderByStartTimeAsc(int patientID,
			LocalDateTime now);

	List<Appointment> findByProviderProfileProviderIDAndStartTimeAfterOrderByStartTimeAsc(int providerID,
			LocalDateTime now);

	Appointment findById(int appointmentID);

	Appointment deleteById(int appointmentID);

	@Query("SELECT a FROM Appointment a WHERE a.providerProfile.providerID = :providerID ORDER BY a.startTime DESC")
	List<Appointment> findAllByProviderID(@Param("providerID") Integer providerID);

	List<Appointment> findByStartTimeAfter(LocalDateTime now);

	List<Appointment> findAllByOrderByStartTimeDesc();

	@Modifying
	@Transactional
	@Query("DELETE FROM Appointment a WHERE a.providerProfile.providerID = :providerId")
	void deleteByProviderProfileId(@Param("providerId") Integer providerId);

	@Modifying
	@Transactional
	@Query("DELETE FROM Appointment a WHERE a.patientProfile.patientID = :patientId")
	void deleteByPatientProfileId(@Param("patientId") Integer patientId);

	List<Appointment> findByProviderProfileProviderIDAndStartTimeBetween(Integer providerID, LocalDateTime startOfDay,
			LocalDateTime endOfDay);

	// Page<Appointment> findByProviderProfileProviderIDAndStartTimeAfter(Integer
	// providerID, LocalDateTime now, Pageable pageable);

//	@Query("SELECT a FROM Appointment a " + "WHERE a.providerProfile.providerID = :providerID "
//			+ "AND a.startTime > :now " + "AND (a.status = com.ishaan.project.enums.AppointmentStatus.BOOKED "
//			+ "OR a.status = com.ishaan.project.enums.AppointmentStatus.RESCHEDULED) " + "ORDER BY a.startTime")
//	Page<Appointment> findUpcomingAppointmentsByProviderID(@Param("providerID") Integer providerID,
//			@Param("now") LocalDateTime now, Pageable pageable);

	@Query("SELECT a FROM Appointment a " + "WHERE a.providerProfile.providerID = :providerID "
			+ "AND a.startTime > :now " + "AND (a.status = com.ishaan.project.enums.AppointmentStatus.BOOKED "
			+ "OR a.status = com.ishaan.project.enums.AppointmentStatus.RESCHEDULED) "
			+ "AND (CONCAT(LOWER(a.patientProfile.user.firstName), ' ', LOWER(a.patientProfile.user.lastName)) "
			+ "LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " + "ORDER BY a.startTime")
	Page<Appointment> findUpcomingAppointmentsByProviderID(@Param("providerID") Integer providerID,
			@Param("now") LocalDateTime now, @Param("searchTerm") String searchTerm, Pageable pageable);

	@Query("SELECT COUNT(a) FROM Appointment a " + "WHERE a.providerProfile.providerID = :providerID "
			+ "AND a.startTime > :now " + "AND (a.status = com.ishaan.project.enums.AppointmentStatus.BOOKED "
			+ "OR a.status = com.ishaan.project.enums.AppointmentStatus.RESCHEDULED)")
	Long countUpcomingAppointmentsByProviderID(@Param("providerID") Integer providerID,
			@Param("now") LocalDateTime now);

	@Query("SELECT COUNT(DISTINCT a.patientProfile.patientID) FROM Appointment a WHERE a.providerProfile.providerID = :providerID")
	Long countDistinctPatientsByProvider(@Param("providerID") Integer providerID);

	@Query("SELECT COUNT(DISTINCT a.patientProfile.patientID) FROM Appointment a WHERE a.providerProfile.providerID = :providerID AND DATE(a.startTime) = :date")
	Long countPatientsTodayByProvider(@Param("providerID") Integer providerID, @Param("date") LocalDate date);

	@Query("SELECT a FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
		       + "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :search, '%')) "
		       + "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :search, '%'))) "
		       + "AND a.startTime = (SELECT MAX(a2.startTime) FROM Appointment a2 WHERE a2.patientProfile.patientID = a.patientProfile.patientID) "
		       + "ORDER BY a.startTime DESC")
		Page<Appointment> findPatientsOfProviderByUserID(
		        @Param("userID") int userID, 
		        @Param("search") String search, 
		        Pageable pageable);


	@Query("SELECT COUNT(DISTINCT a.patientProfile.user.userID) FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
		     + "ORDER BY a.startTime DESC")
	long countPatientsOfProviderByUserID(@Param("userID") int userID);
	
	
	
	
	
	
	
	
	
	
//	@Query("SELECT a FROM Appointment a " +
//	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
//	           "AND a.providerProfile.providerID = :providerID " +
//	           "AND a.startTime > CURRENT_TIMESTAMP " +
//	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
//	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%')))")
//	    Page<Appointment> findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(
//	            @Param("startingDate") LocalDateTime startingDate,
//	            @Param("endingDate") LocalDateTime endingDate,
//	            @Param("providerID") Integer providerID,
//	            @Param("searchString") String searchString,
//	            Pageable pageable);
	
	
	
	
//	@Query("SELECT a FROM Appointment a " +
//	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
//	           "AND a.providerProfile.providerID = :providerID " +
//	           "AND a.startTime > CURRENT_TIMESTAMP " +
//	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
//	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%'))) " +
//	           "AND (a.emergency = true OR (:includeEmergency = false AND a.emergency = false)) ")
//	    Page<Appointment> findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(
//	            @Param("startingDate") LocalDateTime startingDate,
//	            @Param("endingDate") LocalDateTime endingDate,
//	            @Param("providerID") Integer providerID,
//	            @Param("searchString") String searchString,
//	            @Param("includeEmergency") boolean includeEmergency,
//	            Pageable pageable);
	
	
	@Query("SELECT a FROM Appointment a " +
	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
	           "AND a.providerProfile.providerID = :providerID " +
	           "AND a.startTime > CURRENT_TIMESTAMP " +
	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%'))) " +
	           "AND (a.emergency = true OR (:includeEmergency = false AND a.emergency = false)) " +
	           "AND (:status IS NULL OR :status = '' OR a.status = :status)")
	Page<Appointment> findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(
	        @Param("startingDate") LocalDateTime startingDate,
	        @Param("endingDate") LocalDateTime endingDate,
	        @Param("providerID") Integer providerID,
	        @Param("searchString") String searchString,
	        @Param("includeEmergency") boolean includeEmergency,
	        @Param("status") AppointmentStatus status,
	        Pageable pageable);
	
	
	
	@Query("SELECT COUNT(a) FROM Appointment a " +
	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
	           "AND a.providerProfile.providerID = :providerID " +
	           "AND a.startTime > CURRENT_TIMESTAMP " +
	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%'))) " +
	           "AND (a.emergency = true OR (:includeEmergency = false AND a.emergency = false)) " +
	           "AND (:status IS NULL OR :status = '' OR a.status = :status)")
	Long countUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(
	        @Param("startingDate") LocalDateTime startingDate,
	        @Param("endingDate") LocalDateTime endingDate,
	        @Param("providerID") Integer providerID,
	        @Param("searchString") String searchString,
	        @Param("includeEmergency") boolean includeEmergency,
	        @Param("status") AppointmentStatus status);

	@Query("SELECT a FROM Appointment a WHERE a.patientProfile.patientID = :patientID AND a.status = 'COMPLETED'")
    List<Appointment> findCompletedAppointmentsByPatientId(@Param("patientID") Integer patientID);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	@Query("SELECT a FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
		       + "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) OR :firstName IS NULL) "
		       + "AND (a.patientProfile.gender = :gender OR :gender IS NULL) "
		       + "AND (a.patientProfile.allergies LIKE CONCAT('%', :allergies, '%') OR :allergies IS NULL) "
		       + "AND a.startTime = (SELECT MAX(a2.startTime) FROM Appointment a2 WHERE a2.patientProfile.patientID = a.patientProfile.patientID) "
		       + "ORDER BY a.startTime DESC")
		Page<Appointment> findLatestAppointmentsForPatientsByProviderUserId(
		        @Param("userID") Integer userID,
		        @Param("firstName") String firstName,
		        @Param("gender") Gender gender,
		        @Param("allergies") String allergies,
		        Pageable pageable);
	
	
	
	
	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
		       + "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) OR :firstName IS NULL) "
		       + "AND (a.patientProfile.gender = :gender OR :gender IS NULL) "
		       + "AND (a.patientProfile.allergies LIKE CONCAT('%', :allergies, '%') OR :allergies IS NULL) "
		       + "AND a.startTime = (SELECT MAX(a2.startTime) FROM Appointment a2 WHERE a2.patientProfile.patientID = a.patientProfile.patientID)")
		long countLatestAppointmentsForPatientsByProviderUserId(
		        @Param("userID") Integer userID,
		        @Param("firstName") String firstName,
		        @Param("gender") Gender gender,
		        @Param("allergies") String allergies);
	
	
	
//	@Query("SELECT a FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
//	        + "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) OR :firstName IS NULL) "
//	        + "AND (a.patientProfile.gender = :gender OR :gender IS NULL) "
//	        + "AND (a.patientProfile.allergies LIKE CONCAT('%', :allergies, '%') OR :allergies IS NULL) "
//	        + "AND (LOWER(a.disease) LIKE LOWER(CONCAT('%', :disease, '%')) OR :disease IS NULL) "
//	        + "AND a.startTime = (SELECT MAX(a2.startTime) FROM Appointment a2 WHERE a2.patientProfile.patientID = a.patientProfile.patientID) "
//	        + "ORDER BY a.startTime DESC")
//	Page<Appointment> findLatestAppointmentsForPatientsByProviderUserIdDisease(
//	        @Param("userID") Integer userID,
//	        @Param("firstName") String firstName,
//	        @Param("gender") Gender gender,
//	        @Param("allergies") String allergies,
//	        @Param("disease") String disease,
//	        Pageable pageable);
	
	
	@Query("SELECT a FROM Appointment a " +
		       "WHERE a.providerProfile.user.userID = :userID " +
		       "AND a.startTime IN (" +
		       "  SELECT MAX(a2.startTime) " +
		       "  FROM Appointment a2 " +
		       "  WHERE a2.providerProfile.user.userID = :userID " +
		       "  GROUP BY a2.patientProfile.patientID" +
		       ") " +
		       "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) OR :firstName IS NULL) " +
		       "AND (a.patientProfile.gender = :gender OR :gender IS NULL) " +
		       "AND (LOWER(a.patientProfile.allergies) LIKE LOWER(CONCAT('%', :allergies, '%')) OR :allergies IS NULL) " +
		       "AND (LOWER(a.disease) LIKE LOWER(CONCAT('%', :disease, '%')) OR :disease IS NULL) " +
		       "ORDER BY a.startTime DESC")
	Page<Appointment> findLatestAppointmentsForPatientsByProviderUserIdDisease(
	        @Param("userID") Integer userID,
	        @Param("firstName") String firstName,
	        @Param("gender") Gender gender,
	        @Param("allergies") String allergies,
	        @Param("disease") String disease,
	        Pageable pageable);


	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.providerProfile.user.userID = :userID "
	        + "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) OR :firstName IS NULL) "
	        + "AND (a.patientProfile.gender = :gender OR :gender IS NULL) "
	        + "AND (a.patientProfile.allergies LIKE CONCAT('%', :allergies, '%') OR :allergies IS NULL) "
	        + "AND (LOWER(a.disease) LIKE LOWER(CONCAT('%', :disease, '%')) OR :disease IS NULL) "
	        + "AND a.startTime = (SELECT MAX(a2.startTime) FROM Appointment a2 WHERE a2.patientProfile.patientID = a.patientProfile.patientID)")
	Long countLatestAppointmentsForPatientsByProviderUserIdDisease(
	        @Param("userID") Integer userID,
	        @Param("firstName") String firstName,
	        @Param("gender") Gender gender,
	        @Param("allergies") String allergies,
	        @Param("disease") String disease);
	
	
	
	
	
	@Query("SELECT a FROM Appointment a " +
	           "WHERE a.providerProfile.user.userID = :userId " +
	           "AND (:startDate IS NULL AND :endDate IS NULL OR a.startTime BETWEEN :startDate AND :endDate) " +
	           "AND (:disease IS NULL OR a.disease LIKE %:disease%) " +
	           "AND (:status IS NULL OR a.status = :status) " +
	           "AND (:fullName IS NULL OR (CONCAT(a.patientProfile.user.firstName, ' ', a.patientProfile.user.lastName) LIKE %:fullName%))")
	Page<Appointment> findAppointmentHistory(
	        @Param("userId") Integer userId,
	        @Param("startDate") LocalDateTime startDate,
	        @Param("endDate") LocalDateTime endDate,
	        @Param("disease") String disease,
	        @Param("status") AppointmentStatus status,
	        @Param("fullName") String fullName,
	        Pageable pageable);
	
	
	
	@Query("SELECT COUNT(a) FROM Appointment a " +
	           "WHERE a.providerProfile.user.userID = :userId " +
	           "AND (:startDate IS NULL AND :endDate IS NULL OR a.startTime BETWEEN :startDate AND :endDate) " +
	           "AND (:disease IS NULL OR a.disease LIKE %:disease%) " +
	           "AND (:status IS NULL OR a.status = :status) " +
	           "AND (:fullName IS NULL OR (CONCAT(a.patientProfile.user.firstName, ' ', a.patientProfile.user.lastName) LIKE %:fullName%))")
	long countAppointmentHistory(
	        @Param("userId") Integer userId,
	        @Param("startDate") LocalDateTime startDate,
	        @Param("endDate") LocalDateTime endDate,
	        @Param("disease") String disease,
	        @Param("status") AppointmentStatus status,
	        @Param("fullName") String fullName);
	
	
	
	
	
	@Query("SELECT a FROM Appointment a " +
	           "WHERE a.patientProfile.user.userID = :userId " +
	           "AND (:startDate IS NULL AND :endDate IS NULL OR a.startTime BETWEEN :startDate AND :endDate) " +
	           "AND (:disease IS NULL OR a.disease LIKE %:disease%) " +
	           "AND (:status IS NULL OR a.status = :status) " +
	           "AND (:fullName IS NULL OR (CONCAT(a.providerProfile.user.firstName, ' ', a.providerProfile.user.lastName) LIKE %:fullName%))")
	Page<Appointment> findAppointmentHistoryofPatient(
	        @Param("userId") Integer userId,
	        @Param("startDate") LocalDateTime startDate,
	        @Param("endDate") LocalDateTime endDate,
	        @Param("disease") String disease,
	        @Param("status") AppointmentStatus status,
	        @Param("fullName") String fullName,
	        Pageable pageable);
	
	
	@Query("SELECT COUNT(a) FROM Appointment a " +
	           "WHERE a.patientProfile.user.userID = :userId " +
	           "AND (:startDate IS NULL AND :endDate IS NULL OR a.startTime BETWEEN :startDate AND :endDate) " +
	           "AND (:disease IS NULL OR a.disease LIKE %:disease%) " +
	           "AND (:status IS NULL OR a.status = :status) " +
	           "AND (:fullName IS NULL OR (CONCAT(a.providerProfile.user.firstName, ' ', a.providerProfile.user.lastName) LIKE %:fullName%))")
	long countAppointmentHistoryofPatient(
	        @Param("userId") Integer userId,
	        @Param("startDate") LocalDateTime startDate,
	        @Param("endDate") LocalDateTime endDate,
	        @Param("disease") String disease,
	        @Param("status") AppointmentStatus status,
	        @Param("fullName") String fullName);
	
	
	
	
	@Query("SELECT a FROM Appointment a " +
	           "WHERE" +
	           "(:startDate IS NULL AND :endDate IS NULL OR a.startTime BETWEEN :startDate AND :endDate) " +
	           "AND (:disease IS NULL OR a.disease LIKE %:disease%) " +
	           "AND (:status IS NULL OR a.status = :status) " +
	           "AND (:fullName IS NULL OR (CONCAT(a.providerProfile.user.firstName, ' ', a.providerProfile.user.lastName) LIKE %:fullName%))")
	Page<Appointment> findAppointmentHistoryAdmin(
	        @Param("startDate") LocalDateTime startDate,
	        @Param("endDate") LocalDateTime endDate,
	        @Param("disease") String disease,
	        @Param("status") AppointmentStatus status,
	        @Param("fullName") String fullName,
	        Pageable pageable);
	
	


	List<Appointment> findByPatientProfilePatientIDAndStartTimeAfterAndStatusIn(
	        Integer patientID, LocalDateTime now, List<AppointmentStatus> statuses);
	
	
	
	
	
	
	
	
	@Query("SELECT a FROM Appointment a " +
	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
	           "AND a.startTime > CURRENT_TIMESTAMP " +
	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%'))) " +
	           "AND (a.emergency = true OR (:includeEmergency = false AND a.emergency = false)) " +
	           "AND (:status IS NULL OR :status = '' OR a.status = :status)")
	Page<Appointment> findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContainsADMIN(
	        @Param("startingDate") LocalDateTime startingDate,
	        @Param("endingDate") LocalDateTime endingDate,
	        @Param("searchString") String searchString,
	        @Param("includeEmergency") boolean includeEmergency,
	        @Param("status") AppointmentStatus status,
	        Pageable pageable);
	
	
	
	@Query("SELECT COUNT(a) FROM Appointment a " +
	           "WHERE a.startTime BETWEEN :startingDate AND :endingDate " +
	           "AND a.startTime > CURRENT_TIMESTAMP " +
	           "AND (LOWER(a.patientProfile.user.firstName) LIKE LOWER(CONCAT('%', :searchString, '%')) " +
	           "OR LOWER(a.patientProfile.user.lastName) LIKE LOWER(CONCAT('%', :searchString, '%'))) " +
	           "AND (a.emergency = true OR (:includeEmergency = false AND a.emergency = false)) " +
	           "AND (:status IS NULL OR :status = '' OR a.status = :status)")
	Long countUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContainsADMIN(
	        @Param("startingDate") LocalDateTime startingDate,
	        @Param("endingDate") LocalDateTime endingDate,
	        @Param("searchString") String searchString,
	        @Param("includeEmergency") boolean includeEmergency,
	        @Param("status") AppointmentStatus status);
	
	
	
	long count();
	
	@Query("SELECT COUNT(a) FROM Appointment a WHERE a.startTime > :currentDateTime AND a.status IN :statuses")
    long countUpcomingAppointments(@Param("currentDateTime") LocalDateTime currentDateTime,
                                    @Param("statuses") List<AppointmentStatus> statuses);
}
