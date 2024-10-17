package com.ishaan.project.dto;

import java.time.LocalDateTime;

import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.enums.AppointmentStatus;

public class AppointmentHistoryDTO {
	private int appointmentID;
	private PatientProfile patientProfile;
	private ProviderProfile providerProfile;
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	private AppointmentStatus status;
	private boolean emergency;
	private String description;
	private String profilePic;
	private String disease;
	public AppointmentHistoryDTO() {
		super();
	}
	public AppointmentHistoryDTO(int appointmentID, PatientProfile patientProfile, ProviderProfile providerProfile,
			LocalDateTime startTime, LocalDateTime endTime, AppointmentStatus status, boolean emergency,
			String description, String profilePic, String disease) {
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
		this.disease = disease;
	}
	public int getAppointmentID() {
		return appointmentID;
	}
	public void setAppointmentID(int appointmentID) {
		this.appointmentID = appointmentID;
	}
	public PatientProfile getPatientProfile() {
		return patientProfile;
	}
	public void setPatientProfile(PatientProfile patientProfile) {
		this.patientProfile = patientProfile;
	}
	public ProviderProfile getProviderProfile() {
		return providerProfile;
	}
	public void setProviderProfile(ProviderProfile providerProfile) {
		this.providerProfile = providerProfile;
	}
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}
	public AppointmentStatus getStatus() {
		return status;
	}
	public void setStatus(AppointmentStatus status) {
		this.status = status;
	}
	public boolean isEmergency() {
		return emergency;
	}
	public void setEmergency(boolean emergency) {
		this.emergency = emergency;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
}
