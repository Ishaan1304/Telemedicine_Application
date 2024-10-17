package com.ishaan.project.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ishaan.project.dto.AppointmentDTO;
import com.ishaan.project.dto.AppointmentHistoryDTO;
import com.ishaan.project.dto.AvailableTimeIntervalDTO;
import com.ishaan.project.dto.MyAppointmentDTO;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.PatientDTO;
import com.ishaan.project.dto.PreviousAppointmentDTO;
import com.ishaan.project.dto.StartEndTimeDTO;
import com.ishaan.project.dto.TimeIntervalRequestDTO;
import com.ishaan.project.entities.Appointment;
import com.ishaan.project.enums.AppointmentStatus;
import com.ishaan.project.services.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
	@Autowired
	private AppointmentService appointmentService;

	@PostMapping("/book")
	public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
		System.out.println(appointment);
		try {
			System.out.println("--------book appointment--------");
			Appointment result = appointmentService.bookAppointment(appointment);
			return ResponseEntity.status(HttpStatus.CREATED).body(result);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}

//	@GetMapping("/upcoming/{patientID}")
//	public List<Appointment> getUpcomingAppointments(@PathVariable("patientID") int patientID) {
//		return appointmentService.getUpcomingAppointmentsForPatient(patientID);
//	}
	
	@GetMapping("/upcoming/{patientID}")
	public List<MyAppointmentDTO> getUpcomingAppointments(@PathVariable("patientID") int patientID) {
		return appointmentService.getUpcomingAppointmentsForPatientDTO(patientID);
	}

	@GetMapping("/upcomingProvider/{providerId}")
	public List<Appointment> getUpcomingAppointmentsForProvider(@PathVariable("providerId") int providerId) {
		return appointmentService.getUpcomingAppointmentsForProvider(providerId);
	}

	@GetMapping("/page/upcomingProvider/{providerId}")
	public ResponseEntity<PaginationResponseDTO<Appointment>> getUpcomingAppointmentsForProvider(
			@PathVariable("providerId") int providerId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = "startTime", required = false) String sort,
			@RequestParam(value = "search", defaultValue = "", required = false) String search) {
		PaginationResponseDTO<Appointment> result = appointmentService.getUpcomingAppointmentsForProvider(providerId,
				pageNumber, pageSize, sort, search);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

//	@GetMapping("/page/upcoming/{providerId}")
//	public ResponseEntity<PaginationResponseDTO<AppointmentDTO>> getUpcomingAppointmentsForProvider(
//			@PathVariable("providerId") int providerId,
//			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
//			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
//			@RequestParam(value = "sort", defaultValue = "startTime", required = false) String sort,
//			@RequestParam(value = "search", defaultValue = "", required = false) String search,
//			@RequestParam(value = "startDate", defaultValue = "", required = false) String startDate,
//			@RequestParam(value = "endDate", defaultValue = "", required = false) String endDate,
//			@RequestParam(value = "emergency", defaultValue = "", required = false) String emergency) {
//		System.out.println("controller");
//		PaginationResponseDTO<AppointmentDTO> result = appointmentService.getUpcomingAppointmentsForProvider(providerId,
//				pageNumber, pageSize, sort, search, startDate, endDate, emergency);
//		return ResponseEntity.status(HttpStatus.OK).body(result);
//	}

	@GetMapping("/page/upcoming/filter/{providerId}")
	public ResponseEntity<PaginationResponseDTO<AppointmentDTO>> getUpcomingAppointmentsForProvider(
			@PathVariable("providerId") int providerId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = "startTime", required = false) String sort,
			@RequestParam(value = "search", defaultValue = "", required = false) String search,
			@RequestParam(value = "startDate", defaultValue = "", required = false) String startDate,
			@RequestParam(value = "endDate", defaultValue = "", required = false) String endDate,
			@RequestParam(value = "emergency", defaultValue = "", required = false) String emergency,
			@RequestParam(value = "status", defaultValue = "", required = false) String status) {
		System.out.println("controller");
		PaginationResponseDTO<AppointmentDTO> result = appointmentService.getUpcomingAppointmentsForProvider(providerId,
				pageNumber, pageSize, sort, search, startDate, endDate, emergency, status);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	
	
	@GetMapping("/page/upcoming/filter/admin")
	public ResponseEntity<PaginationResponseDTO<AppointmentDTO>> getUpcomingAppointmentsForProviderAdmin(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = "startTime", required = false) String sort,
			@RequestParam(value = "search", defaultValue = "", required = false) String search,
			@RequestParam(value = "startDate", defaultValue = "", required = false) String startDate,
			@RequestParam(value = "endDate", defaultValue = "", required = false) String endDate,
			@RequestParam(value = "emergency", defaultValue = "", required = false) String emergency,
			@RequestParam(value = "status", defaultValue = "", required = false) String status) {
		System.out.println("controller");
		PaginationResponseDTO<AppointmentDTO> result = appointmentService.getUpcomingAppointmentsForProviderAdmin(
				pageNumber, pageSize, sort, search, startDate, endDate, emergency, status);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/page/users/{userId}")
	public ResponseEntity<PaginationResponseDTO<Appointment>> findPatientsByProviderUserIdAndName(
			@PathVariable("userId") int userId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "4", required = false) int pageSize,
			@RequestParam(value = "sort", defaultValue = "startTime", required = false) String sort,
			@RequestParam(value = "search", defaultValue = "", required = false) String search) {
		PaginationResponseDTO<Appointment> result = appointmentService.findPatientsByProviderUserIdAndName(userId,
				pageNumber, pageSize, sort, search);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@DeleteMapping("/delete/{id}")
	public Appointment deleteAppointment(@PathVariable("id") int id) {
		Appointment result = appointmentService.deleteAppointment(id);
		return result;
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Appointment> updateAppointment(@PathVariable("id") int id,
			@RequestBody Appointment updatedAppointment) {
		Appointment result = appointmentService.updateAppointment(id, updatedAppointment);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/getAll/{providerID}")
	public List<Appointment> getAppointmentsByProviderID(@PathVariable Integer providerID) {
		return appointmentService.getAppointmentsByProviderID(providerID);
	}

	@GetMapping("/getAll")
	public List<Appointment> getAllAppointments() {
		return appointmentService.getAllAppointments();
	}

	@GetMapping("/upcoming")
	public List<Appointment> getUpcomingAppointments() {
		return appointmentService.getUpcomingAppointments();
	}

	@GetMapping("/provider/{providerID}/today")
	public ResponseEntity<List<Appointment>> getAppointmentsByProviderAndToday(@PathVariable Integer providerID) {
		try {
			List<Appointment> appointments = appointmentService.getAppointmentsByProviderAndToday(providerID);
			if (appointments.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(appointments, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@PostMapping("/provider/{providerID}/available-times")
//	public ResponseEntity<List<AvailableTimeIntervalDTO>> getAvailableTimeIntervals(@PathVariable Integer providerID,
//			@RequestBody StartEndTimeDTO startEndTimeDTO) {
//		try {
//			LocalDateTime dayStart = startEndTimeDTO.getStart();
//			LocalDateTime dayEnd = startEndTimeDTO.getEnd();
//
//			List<AvailableTimeIntervalDTO> availableIntervals = appointmentService.getAvailableTimeIntervals(providerID,
//					dayStart, dayEnd);
//			return new ResponseEntity<>(availableIntervals, HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	
	@PostMapping("/provider/{providerID}/available-times")
	public ResponseEntity<List<AvailableTimeIntervalDTO>> getAvailableTimeIntervals(
	        @PathVariable Integer providerID,
	        @RequestBody TimeIntervalRequestDTO request) {
	    try {
	        LocalDate date = request.getDate();
	        LocalTime startTime = request.getStartTime();
	        LocalTime endTime = request.getEndTime();
	        LocalDateTime dayStart = LocalDateTime.of(date, startTime);
	        LocalDateTime dayEnd = LocalDateTime.of(date, endTime);
	        List<AvailableTimeIntervalDTO> availableIntervals = appointmentService.getAvailableTimeIntervals(providerID, dayStart, dayEnd,date);
	        return new ResponseEntity<>(availableIntervals, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@GetMapping("/patients/count/provider/{providerID}")
	public Long getDistinctPatientCountByProvider(@PathVariable Integer providerID) {
		return appointmentService.getDistinctPatientCountByProvider(providerID);
	}

	@GetMapping("/patients/today/count/provider/{providerID}")
	public Long getPatientsCountTodayByProvider(@PathVariable Integer providerID) {
		return appointmentService.getPatientsCountTodayByProvider(providerID);
	}

	@PutMapping("/done/{appointmentID}")
	public ResponseEntity<Void> completedAppointment(@PathVariable Integer appointmentID) {
		this.appointmentService.completedAppointment(appointmentID);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/completed/patient/{patientID}")
	public List<Appointment> getCompletedAppointmentsByPatientId(@PathVariable Integer patientID) {
		return appointmentService.getCompletedAppointmentsByPatientId(patientID);
	}

	@GetMapping("/completed/patient/previous/{patientID}")
	public ResponseEntity<List<PreviousAppointmentDTO>> getCompletedAppointmentsByPatientIdDTO(
			@PathVariable Integer patientID) {
		List<PreviousAppointmentDTO> result = appointmentService.getCompletedAppointmentsByPatientIdDTO(patientID);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

//	@GetMapping("/providers/{userID}/latestAppointments")
//	public ResponseEntity<PaginationResponseDTO<PatientDTO>> getLatestAppointments(
//	        @PathVariable Integer userID,
//	        @RequestParam(required = false) String firstName,
//	        @RequestParam(required = false) String gender,
//	        @RequestParam(required = false) String allergies,
//	        @RequestParam(defaultValue = "0") int pageNumber,
//	        @RequestParam(defaultValue = "2") int pageSize) {
//
//		PaginationResponseDTO<PatientDTO> appointments = appointmentService.getLatestAppointmentsForPatients(userID, firstName, gender, allergies, pageNumber, pageSize);
//	    if (appointments==null) {
//	        return ResponseEntity.noContent().build();
//	    }
//	    return ResponseEntity.ok(appointments);
//	}

	@GetMapping("/providers/{userID}/latestAppointments")
	public ResponseEntity<PaginationResponseDTO<PatientDTO>> getLatestAppointments(@PathVariable Integer userID,
			@RequestParam(required = false) String firstName, @RequestParam(required = false) String gender,
			@RequestParam(required = false) String allergies, @RequestParam(required = false) String disease,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "2") int pageSize) {
		System.out.println("Controller --------->");
		PaginationResponseDTO<PatientDTO> appointments = appointmentService.getLatestAppointmentsForPatientsDisease(
				userID, firstName, gender, allergies, disease, pageNumber, pageSize);
		if (appointments == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(appointments);
	}

	@GetMapping("/history/{userId}")
	public ResponseEntity<PaginationResponseDTO<AppointmentHistoryDTO>> getAppointmentHistory(
			@PathVariable Integer userId, @RequestParam(required = false) String startDate,
			@RequestParam(required = false) String endDate, @RequestParam(required = false) String disease,
			@RequestParam(required = false) AppointmentStatus status, @RequestParam(required = false) String fullName,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "5") int pageSize) {
		PaginationResponseDTO<AppointmentHistoryDTO> appointments = appointmentService.getAppointmentHistory(userId,
				startDate, endDate, disease, status, fullName, pageNumber, pageSize);
		if (appointments == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(appointments);
	}
	
	
	
	@GetMapping("/history/patient/{userId}")
	public ResponseEntity<PaginationResponseDTO<AppointmentHistoryDTO>> getAppointmentHistoryofPatient(
			@PathVariable Integer userId, @RequestParam(required = false) String startDate,
			@RequestParam(required = false) String endDate, @RequestParam(required = false) String disease,
			@RequestParam(required = false) AppointmentStatus status, @RequestParam(required = false) String fullName,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "5") int pageSize) {
		PaginationResponseDTO<AppointmentHistoryDTO> appointments = appointmentService.getAppointmentHistoryofPatient(userId,
				startDate, endDate, disease, status, fullName, pageNumber, pageSize);
		if (appointments == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(appointments);
	}
	
	
	@GetMapping("/history/admin")
	public ResponseEntity<PaginationResponseDTO<AppointmentHistoryDTO>> getAppointmentHistoryAdmin(
			@RequestParam(required = false) String startDate,
			@RequestParam(required = false) String endDate, @RequestParam(required = false) String disease,
			@RequestParam(required = false) AppointmentStatus status, @RequestParam(required = false) String fullName,
			@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "5") int pageSize) {
		PaginationResponseDTO<AppointmentHistoryDTO> appointments = appointmentService.getAppointmentHistoryAdmin(
				startDate, endDate, disease, status, fullName, pageNumber, pageSize);
		if (appointments == null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(appointments);
	}
	
	 @GetMapping("/count")
	    public long getAppointmentCount() {
	        return appointmentService.getAppointmentCount();
	    }
	 
	 @GetMapping("/upcoming/count")
	    public ResponseEntity<Long> getCountOfUpcomingAppointments() {
	        long count = appointmentService.getCountOfUpcomingAppointments();
	        return ResponseEntity.ok(count);
	    }

}
