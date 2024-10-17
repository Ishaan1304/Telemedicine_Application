package com.ishaan.project.dto;

import com.ishaan.project.entities.PatientProfile;

public class PatientUserDTO {
	private PatientProfile patientProfile;
	private String userPic;
	public PatientUserDTO() {
		super();
	}
	public PatientUserDTO(PatientProfile patientProfile, String userPic) {
		super();
		this.patientProfile = patientProfile;
		this.userPic = userPic;
	}
	public PatientProfile getPatientProfile() {
		return patientProfile;
	}
	public void setPatientProfile(PatientProfile patientProfile) {
		this.patientProfile = patientProfile;
	}
	public String getUserPic() {
		return userPic;
	}
	public void setUserPic(String userPic) {
		this.userPic = userPic;
	}
}
