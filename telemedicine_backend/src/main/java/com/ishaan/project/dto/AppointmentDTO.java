package com.ishaan.project.dto;

import java.time.LocalDateTime;

import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.enums.AppointmentStatus;

import lombok.Data;

@Data
public class AppointmentDTO {
	private int appointmentID;
	private PatientProfile patientProfile;
	private ProviderProfile providerProfile;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private AppointmentStatus status;
	private boolean emergency;
	private String description;
	private String profilePic;
	public AppointmentDTO(int appointmentID, PatientProfile patientProfile, ProviderProfile providerProfile,
			LocalDateTime startTime, LocalDateTime endTime, AppointmentStatus status, boolean emergency,
			String description, String profilePic) {
		super();
		this.appointmentID = appointmentID;
		this.patientProfile = patientProfile;
		this.providerProfile = providerProfile;
		this.startTime = startTime;
		this.endTime = endTime;
		this.status = status;
		this.emergency = emergency;
		this.description = description;
		this.profilePic = profilePic;
	}
	public AppointmentDTO() {
		super();
	}
	
	
}
