package com.ishaan.project.services;

import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ishaan.project.dto.AppointmentDTO;
import com.ishaan.project.dto.AppointmentHistoryDTO;
import com.ishaan.project.dto.AvailableTimeIntervalDTO;
import com.ishaan.project.dto.MyAppointmentDTO;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.PatientDTO;
import com.ishaan.project.dto.PreviousAppointmentDTO;
import com.ishaan.project.entities.Appointment;
import com.ishaan.project.entities.MedicalDocument;
import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.entities.Prescription;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.enums.AppointmentStatus;
import com.ishaan.project.enums.Gender;
import com.ishaan.project.repositories.AppointmentRepository;
import com.ishaan.project.repositories.MedicalDocumentRepository;
import com.ishaan.project.repositories.PatientProfileRepository;
import com.ishaan.project.repositories.PrescriptionRepository;
import com.ishaan.project.repositories.ProviderProfileRepository;
import com.ishaan.project.repositories.UserProfileRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private PatientProfileRepository patientProfileRepository;

	@Autowired
	private ProviderProfileRepository providerProfileRepository;

	@Autowired
	private UserProfileRepository userProfileRepository;

	@Autowired
	private MedicalDocumentRepository medicalDocumentRepository;

	@Autowired
	private PrescriptionRepository prescriptionRepository;

	public Appointment bookAppointment(Appointment appointment) {
		System.out.println("appointment service");
		System.out.println(appointment);

		Integer patientID = appointment.getPatientProfile().getPatientID();

		Integer providerID = appointment.getProviderProfile().getProviderID();
		LocalDateTime startTime = appointment.getStartTime();
		LocalDateTime endTime = appointment.getEndTime();
		if (endTime.isBefore(startTime)) {
			throw new IllegalArgumentException("End time must be after start time.");
		}

		ProviderProfile provider = providerProfileRepository.findById(providerID)
				.orElseThrow(() -> new RuntimeException("Provider not found"));

		PatientProfile patient = patientProfileRepository.findById(patientID)
				.orElseThrow(() -> new RuntimeException("Patient not found"));

		if (!isProviderAvailable(provider, startTime, endTime)) {
			throw new RuntimeException("Provider is not available at the requested time.");
		}

		List<Appointment> overlappingAppointments = appointmentRepository.findOverlappingAppointments(providerID,
				startTime, endTime);
		if (!overlappingAppointments.isEmpty()) {
			throw new RuntimeException("Provider already has an appointment during the requested time.");
		}

		Appointment result = new Appointment();
		result.setPatientProfile(patient);
		result.setProviderProfile(provider);
		result.setStartTime(startTime);
		result.setEndTime(endTime);
		result.setStatus(appointment.getStatus());
		result.setDescription(appointment.getDescription());
		result.setEmergency(appointment.isEmergency());
		result.setDisease(appointment.getDisease());
		return appointmentRepository.save(result);
	}

	private boolean isProviderAvailable(ProviderProfile provider, LocalDateTime startTime, LocalDateTime endTime) {
		LocalTime start = startTime.toLocalTime();
		LocalTime end = endTime.toLocalTime();

		boolean availableDuringDay = !(start.isBefore(provider.getAvailableFrom())
				|| end.isAfter(provider.getAvailableTo()));

		return availableDuringDay;
	}

//	public List<Appointment> getUpcomingAppointmentsForPatient(int patientID) {
//		LocalDateTime now = LocalDateTime.now();
//		return appointmentRepository.findByPatientProfilePatientIDAndStartTimeAfterOrderByStartTimeAsc(patientID, now);
//	}
	
	
	public List<MyAppointmentDTO> getUpcomingAppointmentsForPatientDTO(int patientID) {
		LocalDateTime now = LocalDateTime.now();
		//List<Appointment> list= appointmentRepository.findByPatientProfilePatientIDAndStartTimeAfterOrderByStartTimeAsc(patientID, now);
		
		List<AppointmentStatus> statuses = Arrays.asList(AppointmentStatus.BOOKED, AppointmentStatus.RESCHEDULED);
		List<Appointment> list = appointmentRepository.findByPatientProfilePatientIDAndStartTimeAfterAndStatusIn(patientID, now, statuses);
		
		List<MyAppointmentDTO> result=new ArrayList<>();
		
		for(Appointment app:list)
		{
			MyAppointmentDTO myAppDTO=new MyAppointmentDTO();
			myAppDTO.setAppointment(app);
			
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(app.getProviderProfile().getUser().getUserID()) == null) {
				myAppDTO.setUserPic("");
			} else {
				myAppDTO.setUserPic(userProfileRepository
						.findMostRecentProfilePicByUserId(app.getProviderProfile().getUser().getUserID()).getProfilePic());
			}
			
			result.add(myAppDTO);
		}
		
		return result;
	}

	public List<Appointment> getUpcomingAppointmentsForProvider(int providerID) {
		LocalDateTime now = LocalDateTime.now();
		return appointmentRepository.findByProviderProfileProviderIDAndStartTimeAfterOrderByStartTimeAsc(providerID,
				now);
	}

	public PaginationResponseDTO<Appointment> getUpcomingAppointmentsForProvider(int providerID, int pageNumber,
			int pageSize, String sort, String search) {
		LocalDateTime now = LocalDateTime.now();
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
		Page<Appointment> pagePost = appointmentRepository.findUpcomingAppointmentsByProviderID(providerID, now, search,
				pageable);
		List<Appointment> result = pagePost.getContent();
		long totalRecords = appointmentRepository.countUpcomingAppointmentsByProviderID(providerID, now);
		PaginationResponseDTO<Appointment> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}

//	public PaginationResponseDTO<AppointmentDTO> getUpcomingAppointmentsForProvider(int providerID, int pageNumber,
//			int pageSize, String sort, String search, String startDate, String endDate, String emergency) {
//		LocalDateTime now = LocalDateTime.now();
//		if (startDate == null || startDate.isEmpty()) {
//			System.out.println("without ----------");
//			startDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE);
//		}
//
//		if (endDate == null || endDate.isEmpty()) {
//			System.out.println("without =========");
//			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
//		}
//		System.out.println("without parsing");
//		System.out.println(startDate);
//		System.out.println(endDate);
//
//		LocalDate startDateD = LocalDate.parse(startDate);
//		LocalDateTime startDateTime = startDateD.atStartOfDay();
//
//		LocalDate endDateD = LocalDate.parse(endDate);
//		LocalDateTime endDateTime = endDateD.atStartOfDay();
//
//		System.out.println("-----------------------------=========================");
//		System.out.println(startDateTime);
//		System.out.println(endDateTime);
//		System.out.println(emergency);
//
//		System.out.println("-----------------------------=========================");
//		boolean isEmergency;
//		if (emergency.equalsIgnoreCase("true")) {
//			isEmergency = true;
//		} else {
//			isEmergency = false;
//		}
//
//		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
//		Page<Appointment> pagePost = appointmentRepository
//				.findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(startDateTime, endDateTime,
//						providerID, search, isEmergency, pageable);
//		
//		List<Appointment> result = pagePost.getContent();
//
//		List<AppointmentDTO> finalResult = new ArrayList<AppointmentDTO>();
//
//		for (Appointment a : result) {
//			AppointmentDTO app = new AppointmentDTO();
//			app.setAppointmentID(a.getAppointmentID());
//			app.setDescription(a.getDescription());
//			app.setEmergency(a.isEmergency());
//			app.setEndTime(a.getEndTime());
//			app.setPatientProfile(a.getPatientProfile());
//
//			if (userProfileRepository
//					.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()) == null) {
//				app.setProfilePic("");
//			} else {
//				app.setProfilePic(userProfileRepository
//						.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()).getProfilePic());
//			}
//
//			app.setProviderProfile(a.getProviderProfile());
//			app.setStartTime(a.getStartTime());
//			app.setStatus(a.getStatus());
//			finalResult.add(app);
//		}
//
//		long totalRecords = appointmentRepository.countUpcomingAppointmentsByProviderID(providerID, now);
//		PaginationResponseDTO<AppointmentDTO> paginationResponseDTO = new PaginationResponseDTO<>(finalResult,
//				totalRecords);
//		return paginationResponseDTO;
//	}

	public PaginationResponseDTO<AppointmentDTO> getUpcomingAppointmentsForProvider(int providerID, int pageNumber,
			int pageSize, String sort, String search, String startDate, String endDate, String emergency,
			String status) {
		LocalDateTime now = LocalDateTime.now();
		if (startDate == null || startDate.isEmpty()) {
			System.out.println("without ----------");
			startDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		if (endDate == null || endDate.isEmpty()) {
			System.out.println("without =========");
			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}
		System.out.println("without parsing");
		System.out.println(startDate);
		System.out.println(endDate);

		LocalDate startDateD = LocalDate.parse(startDate);
		LocalDateTime startDateTime = startDateD.atStartOfDay();

		LocalDate endDateD = LocalDate.parse(endDate);
		LocalDateTime endDateTime = endDateD.atStartOfDay();

		System.out.println("-----------------------------=========================");
		System.out.println(startDateTime);
		System.out.println(endDateTime);
		System.out.println(emergency);
		System.out.println(status);

		System.out.println("-----------------------------=========================");
		boolean isEmergency;
		if (emergency.equalsIgnoreCase("true")) {
			isEmergency = true;
		} else {
			isEmergency = false;
		}

		AppointmentStatus appStatus = null;
		if (status != null && !status.isEmpty()) {
			appStatus = AppointmentStatus.valueOf(status.toUpperCase());
		}

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
		Page<Appointment> pagePost = appointmentRepository
				.findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(startDateTime, endDateTime,
						providerID, search, isEmergency, appStatus, pageable);
		List<Appointment> result = pagePost.getContent();

		List<AppointmentDTO> finalResult = new ArrayList<AppointmentDTO>();

		for (Appointment a : result) {
			AppointmentDTO app = new AppointmentDTO();
			app.setAppointmentID(a.getAppointmentID());
			app.setDescription(a.getDescription());
			app.setEmergency(a.isEmergency());
			app.setEndTime(a.getEndTime());
			app.setPatientProfile(a.getPatientProfile());

			if (userProfileRepository
					.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()) == null) {
				app.setProfilePic("");
			} else {
				app.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()).getProfilePic());
			}

			app.setProviderProfile(a.getProviderProfile());
			app.setStartTime(a.getStartTime());
			app.setStatus(a.getStatus());
			finalResult.add(app);
		}

		long totalRecords = appointmentRepository.countUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContains(
				startDateTime, endDateTime, providerID, search, isEmergency, appStatus);
		PaginationResponseDTO<AppointmentDTO> paginationResponseDTO = new PaginationResponseDTO<>(finalResult,
				totalRecords);
		return paginationResponseDTO;
	}
	
	
	
	
	public PaginationResponseDTO<AppointmentDTO> getUpcomingAppointmentsForProviderAdmin(int pageNumber,
			int pageSize, String sort, String search, String startDate, String endDate, String emergency,
			String status) {
		LocalDateTime now = LocalDateTime.now();
		if (startDate == null || startDate.isEmpty()) {
			System.out.println("without ----------");
			startDate = now.format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		if (endDate == null || endDate.isEmpty()) {
			System.out.println("without =========");
			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}
		System.out.println("without parsing");
		System.out.println(startDate);
		System.out.println(endDate);

		LocalDate startDateD = LocalDate.parse(startDate);
		LocalDateTime startDateTime = startDateD.atStartOfDay();

		LocalDate endDateD = LocalDate.parse(endDate);
		LocalDateTime endDateTime = endDateD.atStartOfDay();

		System.out.println("-----------------------------=========================");
		System.out.println(startDateTime);
		System.out.println(endDateTime);
		System.out.println(emergency);
		System.out.println(status);

		System.out.println("-----------------------------=========================");
		boolean isEmergency;
		if (emergency.equalsIgnoreCase("true")) {
			isEmergency = true;
		} else {
			isEmergency = false;
		}

		AppointmentStatus appStatus = null;
		if (status != null && !status.isEmpty()) {
			appStatus = AppointmentStatus.valueOf(status.toUpperCase());
		}

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
		Page<Appointment> pagePost = appointmentRepository
				.findUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContainsADMIN(startDateTime, endDateTime,
						 search, isEmergency, appStatus, pageable);
		List<Appointment> result = pagePost.getContent();

		List<AppointmentDTO> finalResult = new ArrayList<AppointmentDTO>();

		for (Appointment a : result) {
			AppointmentDTO app = new AppointmentDTO();
			app.setAppointmentID(a.getAppointmentID());
			app.setDescription(a.getDescription());
			app.setEmergency(a.isEmergency());
			app.setEndTime(a.getEndTime());
			app.setPatientProfile(a.getPatientProfile());

			if (userProfileRepository
					.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()) == null) {
				app.setProfilePic("");
			} else {
				app.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(a.getPatientProfile().getUser().getUserID()).getProfilePic());
			}

			app.setProviderProfile(a.getProviderProfile());
			app.setStartTime(a.getStartTime());
			app.setStatus(a.getStatus());
			finalResult.add(app);
		}

		long totalRecords = appointmentRepository.countUpcomingByStartTimeBetweenAndProviderIdAndPatientNameContainsADMIN(
				startDateTime, endDateTime,  search, isEmergency, appStatus);
		PaginationResponseDTO<AppointmentDTO> paginationResponseDTO = new PaginationResponseDTO<>(finalResult,
				totalRecords);
		return paginationResponseDTO;
	}

	public PaginationResponseDTO<Appointment> findPatientsByProviderUserIdAndName(int userID, int pageNumber,
			int pageSize, String sort, String search) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sort));
		Page<Appointment> pagePost = appointmentRepository.findPatientsOfProviderByUserID(userID, search, pageable);
		List<Appointment> result = pagePost.getContent();
		long totalRecords = appointmentRepository.countPatientsOfProviderByUserID(userID);
		PaginationResponseDTO<Appointment> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}

	public Appointment deleteAppointment(int appointmentID) {
		Appointment result = appointmentRepository.findById(appointmentID);
		if (result == null)
			throw new RuntimeException("Invalid Appointment ID");
		result.setStatus(AppointmentStatus.CANCELLED);
		appointmentRepository.save(result);
		return result;
	}

	public Appointment updateAppointment(int id, Appointment updatedAppointment) {
		updatedAppointment.setAppointmentID(id);
		Integer appointmentID = updatedAppointment.getAppointmentID();
		Appointment existingAppointment = appointmentRepository.findById(appointmentID)
				.orElseThrow(() -> new RuntimeException("Appointment not found"));

		Integer providerID = updatedAppointment.getProviderProfile().getProviderID();
		LocalDateTime startTime = updatedAppointment.getStartTime();
		LocalDateTime endTime = updatedAppointment.getEndTime();

		if (endTime.isBefore(startTime)) {
			throw new IllegalArgumentException("End time must be after start time.");
		}

		ProviderProfile provider = providerProfileRepository.findById(providerID)
				.orElseThrow(() -> new RuntimeException("Provider not found"));

		PatientProfile patient = patientProfileRepository
				.findById(updatedAppointment.getPatientProfile().getPatientID())
				.orElseThrow(() -> new RuntimeException("Patient not found"));

		if (!isProviderAvailable(provider, startTime, endTime)) {
			throw new RuntimeException("Provider is not available at the requested time.");
		}

		List<Appointment> overlappingAppointments = appointmentRepository.findOverlappingAppointments(providerID,
				startTime, endTime);

		overlappingAppointments.removeIf(a -> a.getAppointmentID().equals(appointmentID));

		if (!overlappingAppointments.isEmpty()) {
			throw new RuntimeException("Provider already has an appointment during the requested time.");
		}

		existingAppointment.setPatientProfile(patient);
		existingAppointment.setProviderProfile(provider);
		existingAppointment.setStartTime(startTime);
		existingAppointment.setEndTime(endTime);
		existingAppointment.setStatus(AppointmentStatus.RESCHEDULED);

		return appointmentRepository.save(existingAppointment);
	}

	public List<Appointment> getAppointmentsByProviderID(Integer providerID) {
		return appointmentRepository.findAllByProviderID(providerID);
	}

	public List<Appointment> getAllAppointments() {
		return appointmentRepository.findAllByOrderByStartTimeDesc();
	}

	public List<Appointment> getUpcomingAppointments() {
		LocalDateTime now = LocalDateTime.now();
		return appointmentRepository.findByStartTimeAfter(now);
	}

	public List<Appointment> getAppointmentsByProviderAndToday(Integer providerID) {
		LocalDate today = LocalDate.now();
		LocalDateTime startOfDay = today.atStartOfDay();
		LocalDateTime endOfDay = today.atTime(23, 59, 59);

		return appointmentRepository.findByProviderProfileProviderIDAndStartTimeBetween(providerID, startOfDay,
				endOfDay);
	}
//
//	public List<AvailableTimeIntervalDTO> getAvailableTimeIntervals(Integer providerID, LocalDateTime dayStart,
//			LocalDateTime dayEnd) {
//		List<Appointment> appointments = getAppointmentsByProviderAndToday(providerID);
//		Collections.sort(appointments, (a1, a2) -> a1.getStartTime().compareTo(a2.getStartTime()));
//
//		List<AvailableTimeIntervalDTO> availableIntervals = new ArrayList<>();
//		LocalDateTime currentStart = dayStart;
//
//		for (Appointment appointment : appointments) {
//			LocalDateTime appointmentStart = appointment.getStartTime();
//			LocalDateTime appointmentEnd = appointment.getEndTime();
//
//			if (appointmentStart.isAfter(currentStart)) {
//				availableIntervals.add(new AvailableTimeIntervalDTO(currentStart, appointmentStart));
//			}
//
//			currentStart = appointmentEnd.isAfter(currentStart) ? appointmentEnd : currentStart;
//		}
//
//		if (currentStart.isBefore(dayEnd)) {
//			availableIntervals.add(new AvailableTimeIntervalDTO(currentStart, dayEnd));
//		}
//
//		return availableIntervals;
//	}
	
	
	
	public List<Appointment> getAppointmentsByProviderAndDate(Integer providerID, LocalDate date) {
	    LocalDateTime startOfDay = date.atStartOfDay();
	    LocalDateTime endOfDay = date.atTime(23, 59, 59);

	    return appointmentRepository.findByProviderProfileProviderIDAndStartTimeBetween(providerID, startOfDay, endOfDay);
	}
	
	
	public List<AvailableTimeIntervalDTO> getAvailableTimeIntervals(Integer providerID, LocalDateTime dayStart,LocalDateTime dayEnd,LocalDate date) {
	    
	    List<Appointment> appointments = getAppointmentsByProviderAndDate(providerID, date);
	    Collections.sort(appointments, (a1, a2) -> a1.getStartTime().compareTo(a2.getStartTime()));

	    List<AvailableTimeIntervalDTO> availableIntervals = new ArrayList<>();
	    LocalDateTime currentStart = dayStart;

	    for (Appointment appointment : appointments) {
	        LocalDateTime appointmentStart = appointment.getStartTime();
	        LocalDateTime appointmentEnd = appointment.getEndTime();

	        if (appointmentStart.isAfter(currentStart)) {
	            availableIntervals.add(new AvailableTimeIntervalDTO(currentStart, appointmentStart));
	        }

	        currentStart = appointmentEnd.isAfter(currentStart) ? appointmentEnd : currentStart;
	    }

	    if (currentStart.isBefore(dayEnd)) {
	        availableIntervals.add(new AvailableTimeIntervalDTO(currentStart, dayEnd));
	    }

	    return availableIntervals;
	}

	public Long getDistinctPatientCountByProvider(Integer providerID) {
		return appointmentRepository.countDistinctPatientsByProvider(providerID);
	}

	public Long getPatientsCountTodayByProvider(Integer providerID) {
		return appointmentRepository.countPatientsTodayByProvider(providerID, LocalDate.now());
	}

	public void completedAppointment(Integer appointmentID) {
		Appointment result = appointmentRepository.findById(appointmentID)
				.orElseThrow(() -> new RuntimeException("Invalid Id.."));
		result.setStatus(AppointmentStatus.COMPLETED);
		appointmentRepository.save(result);
	}

	public List<Appointment> getCompletedAppointmentsByPatientId(Integer patientID) {
		return appointmentRepository.findCompletedAppointmentsByPatientId(patientID);
	}

	public List<PreviousAppointmentDTO> getCompletedAppointmentsByPatientIdDTO(Integer patientID) {
		List<Appointment> appointments = appointmentRepository.findCompletedAppointmentsByPatientId(patientID);

		List<PreviousAppointmentDTO> result = new ArrayList<>();
		for (Appointment appointment : appointments) {

			PreviousAppointmentDTO previousAppointmentDTO = new PreviousAppointmentDTO();
			previousAppointmentDTO.setAppointmentID(appointment.getAppointmentID());
			previousAppointmentDTO.setPatientProfile(appointment.getPatientProfile());
			previousAppointmentDTO.setProviderProfile(appointment.getProviderProfile());
			previousAppointmentDTO.setStartTime(appointment.getStartTime());
			previousAppointmentDTO.setEndTime(appointment.getEndTime());
			previousAppointmentDTO.setStatus(appointment.getStatus());
			previousAppointmentDTO.setEmergency(appointment.isEmergency());
			previousAppointmentDTO.setDescription(appointment.getDescription());

			List<MedicalDocument> medicalDocuments = medicalDocumentRepository
					.findByAppointmentId(appointment.getAppointmentID());
			previousAppointmentDTO.setDocuments(medicalDocuments);

			List<Prescription> prescriptions = this.prescriptionRepository
					.findByAppointmentId(appointment.getAppointmentID());
			previousAppointmentDTO.setPrescriptions(prescriptions);

			result.add(previousAppointmentDTO);
		}
		return result;
	}

	public PaginationResponseDTO<PatientDTO> getLatestAppointmentsForPatients(Integer userID, String firstName,
			String gender, String allergies, int pageNumber, int pageSize) {

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("startTime").descending());

		Gender genderEnum = (gender != null && !gender.isEmpty()) ? Gender.valueOf(gender.toUpperCase()) : null;

		Page<Appointment> pagePost = appointmentRepository.findLatestAppointmentsForPatientsByProviderUserId(userID,
				firstName, genderEnum, allergies, pageable);

		List<Appointment> list = pagePost.getContent();

		List<PatientDTO> result = new ArrayList<>();

		for (Appointment appointment : list) {
			PatientDTO patientDTO = new PatientDTO();
			patientDTO.setAddress(appointment.getPatientProfile().getUser().getAddress());
			patientDTO.setAllergies(appointment.getPatientProfile().getAllergies());
			patientDTO.setFirstName(appointment.getPatientProfile().getUser().getFirstName());
			patientDTO.setGender(appointment.getPatientProfile().getGender());
			patientDTO.setLastName(appointment.getPatientProfile().getUser().getLastName());
			patientDTO.setPhone(appointment.getPatientProfile().getUser().getPhone());
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID()) == null) {
				patientDTO.setProfilePic("");
			} else {
				patientDTO.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID())
						.getProfilePic());
			}
			patientDTO.setStartTime(appointment.getStartTime());
			result.add(patientDTO);
		}

		long totalRecords = appointmentRepository.countLatestAppointmentsForPatientsByProviderUserId(userID, firstName,
				genderEnum, allergies);

		PaginationResponseDTO<PatientDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;

	}

	public PaginationResponseDTO<PatientDTO> getLatestAppointmentsForPatientsDisease(Integer userID, String firstName,
			String gender, String allergies, String disease, int pageNumber, int pageSize) {

		System.out.println("Service --------->");
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("startTime").descending());

		Gender genderEnum = (gender != null && !gender.isEmpty()) ? Gender.valueOf(gender.toUpperCase()) : null;

		Page<Appointment> pagePost = appointmentRepository.findLatestAppointmentsForPatientsByProviderUserIdDisease(
				userID, firstName, genderEnum, allergies, disease, pageable);

		List<Appointment> list = pagePost.getContent();

		List<PatientDTO> result = new ArrayList<>();

		for (Appointment appointment : list) {
			PatientDTO patientDTO = new PatientDTO();
			patientDTO.setAddress(appointment.getPatientProfile().getUser().getAddress());
			patientDTO.setAllergies(appointment.getPatientProfile().getAllergies());
			patientDTO.setFirstName(appointment.getPatientProfile().getUser().getFirstName());
			patientDTO.setGender(appointment.getPatientProfile().getGender());
			patientDTO.setLastName(appointment.getPatientProfile().getUser().getLastName());
			patientDTO.setPhone(appointment.getPatientProfile().getUser().getPhone());
			patientDTO.setDisease(appointment.getDisease());
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID()) == null) {
				patientDTO.setProfilePic("");
			} else {
				patientDTO.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID())
						.getProfilePic());
			}
			patientDTO.setStartTime(appointment.getStartTime());
			result.add(patientDTO);
		}

		long totalRecords = appointmentRepository.countLatestAppointmentsForPatientsByProviderUserIdDisease(userID,
				firstName, genderEnum, allergies, disease);

		PaginationResponseDTO<PatientDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;

	}

	public PaginationResponseDTO<AppointmentHistoryDTO> getAppointmentHistory(Integer userId, String startDate,
			String endDate, String disease, AppointmentStatus status, String fullName, int pageNumber, int pageSize) {
		LocalDateTime now = LocalDateTime.now();
		if (startDate == null || startDate.isEmpty()) {
			startDate = now.plusYears(-100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		if (endDate == null || endDate.isEmpty()) {
			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		LocalDate startDateD = LocalDate.parse(startDate);
		LocalDateTime startDateTime = startDateD.atStartOfDay();

		LocalDate endDateD = LocalDate.parse(endDate);
		LocalDateTime endDateTime = endDateD.atStartOfDay();

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("startTime").descending());
		Page<Appointment> pagePost = appointmentRepository.findAppointmentHistory(userId, startDateTime, endDateTime,
				disease, status, fullName, pageable);
		List<Appointment> list = pagePost.getContent();

		List<AppointmentHistoryDTO> result = new ArrayList<>();

		for (Appointment appointment : list) {
			AppointmentHistoryDTO appointmentHistoryDTO = new AppointmentHistoryDTO();
			appointmentHistoryDTO.setAppointmentID(appointment.getAppointmentID());
			appointmentHistoryDTO.setPatientProfile(appointment.getPatientProfile());
			appointmentHistoryDTO.setProviderProfile(appointment.getProviderProfile());
			appointmentHistoryDTO.setStartTime(appointment.getStartTime());
			appointmentHistoryDTO.setEndTime(appointment.getEndTime());
			appointmentHistoryDTO.setStatus(appointment.getStatus());
			appointmentHistoryDTO.setEmergency(appointment.isEmergency());
			appointmentHistoryDTO.setDescription(appointment.getDescription());
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID()) == null) {
				appointmentHistoryDTO.setProfilePic("");
			} else {
				appointmentHistoryDTO.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(appointment.getPatientProfile().getUser().getUserID())
						.getProfilePic());
			}
			appointmentHistoryDTO.setDisease(appointment.getDisease());
			result.add(appointmentHistoryDTO);
		}

		long totalRecords = appointmentRepository.countAppointmentHistory(userId, startDateTime, endDateTime, disease,
				status, fullName);

		PaginationResponseDTO<AppointmentHistoryDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}
	
	
	
	
	
	public PaginationResponseDTO<AppointmentHistoryDTO> getAppointmentHistoryofPatient(Integer userId, String startDate,
			String endDate, String disease, AppointmentStatus status, String fullName, int pageNumber, int pageSize) {
		LocalDateTime now = LocalDateTime.now();
		if (startDate == null || startDate.isEmpty()) {
			startDate = now.plusYears(-100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		if (endDate == null || endDate.isEmpty()) {
			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		LocalDate startDateD = LocalDate.parse(startDate);
		LocalDateTime startDateTime = startDateD.atStartOfDay();

		LocalDate endDateD = LocalDate.parse(endDate);
		LocalDateTime endDateTime = endDateD.atStartOfDay();

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("startTime").descending());
		Page<Appointment> pagePost = appointmentRepository.findAppointmentHistoryofPatient(userId, startDateTime, endDateTime,
				disease, status, fullName, pageable);
		List<Appointment> list = pagePost.getContent();

		List<AppointmentHistoryDTO> result = new ArrayList<>();

		for (Appointment appointment : list) {
			AppointmentHistoryDTO appointmentHistoryDTO = new AppointmentHistoryDTO();
			appointmentHistoryDTO.setAppointmentID(appointment.getAppointmentID());
			appointmentHistoryDTO.setPatientProfile(appointment.getPatientProfile());
			appointmentHistoryDTO.setProviderProfile(appointment.getProviderProfile());
			appointmentHistoryDTO.setStartTime(appointment.getStartTime());
			appointmentHistoryDTO.setEndTime(appointment.getEndTime());
			appointmentHistoryDTO.setStatus(appointment.getStatus());
			appointmentHistoryDTO.setEmergency(appointment.isEmergency());
			appointmentHistoryDTO.setDescription(appointment.getDescription());
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(appointment.getProviderProfile().getUser().getUserID()) == null) {
				appointmentHistoryDTO.setProfilePic("");
			} else {
				appointmentHistoryDTO.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(appointment.getProviderProfile().getUser().getUserID())
						.getProfilePic());
			}
			System.out.println(appointmentHistoryDTO.getProfilePic());
			appointmentHistoryDTO.setDisease(appointment.getDisease());
			result.add(appointmentHistoryDTO);
		}

		long totalRecords = appointmentRepository.countAppointmentHistoryofPatient(userId, startDateTime, endDateTime, disease,
				status, fullName);

		PaginationResponseDTO<AppointmentHistoryDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}
	
	
	
	
	public PaginationResponseDTO<AppointmentHistoryDTO> getAppointmentHistoryAdmin(String startDate,
			String endDate, String disease, AppointmentStatus status, String fullName, int pageNumber, int pageSize) {
		LocalDateTime now = LocalDateTime.now();
		if (startDate == null || startDate.isEmpty()) {
			startDate = now.plusYears(-100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		if (endDate == null || endDate.isEmpty()) {
			endDate = now.plusYears(100).format(DateTimeFormatter.ISO_LOCAL_DATE);
		}

		LocalDate startDateD = LocalDate.parse(startDate);
		LocalDateTime startDateTime = startDateD.atStartOfDay();

		LocalDate endDateD = LocalDate.parse(endDate);
		LocalDateTime endDateTime = endDateD.atStartOfDay();

		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("startTime").descending());
		Page<Appointment> pagePost = appointmentRepository.findAppointmentHistoryAdmin( startDateTime, endDateTime,
				disease, status, fullName, pageable);
		List<Appointment> list = pagePost.getContent();

		List<AppointmentHistoryDTO> result = new ArrayList<>();

		for (Appointment appointment : list) {
			AppointmentHistoryDTO appointmentHistoryDTO = new AppointmentHistoryDTO();
			appointmentHistoryDTO.setAppointmentID(appointment.getAppointmentID());
			appointmentHistoryDTO.setPatientProfile(appointment.getPatientProfile());
			appointmentHistoryDTO.setProviderProfile(appointment.getProviderProfile());
			appointmentHistoryDTO.setStartTime(appointment.getStartTime());
			appointmentHistoryDTO.setEndTime(appointment.getEndTime());
			appointmentHistoryDTO.setStatus(appointment.getStatus());
			appointmentHistoryDTO.setEmergency(appointment.isEmergency());
			appointmentHistoryDTO.setDescription(appointment.getDescription());
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(appointment.getProviderProfile().getUser().getUserID()) == null) {
				appointmentHistoryDTO.setProfilePic("");
			} else {
				appointmentHistoryDTO.setProfilePic(userProfileRepository
						.findMostRecentProfilePicByUserId(appointment.getProviderProfile().getUser().getUserID())
						.getProfilePic());
			}
			System.out.println(appointmentHistoryDTO.getProfilePic());
			appointmentHistoryDTO.setDisease(appointment.getDisease());
			result.add(appointmentHistoryDTO);
		}

		long totalRecords = pagePost.getTotalElements();

		PaginationResponseDTO<AppointmentHistoryDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}
	
	
	public long getAppointmentCount() {
        return appointmentRepository.count();
    }
	
	public long getCountOfUpcomingAppointments() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        return appointmentRepository.countUpcomingAppointments(currentDateTime, Arrays.asList(AppointmentStatus.BOOKED, AppointmentStatus.RESCHEDULED));
    }

}
