package com.ishaan.project.dto;

import java.time.LocalDate;

import com.ishaan.project.entities.User;
import com.ishaan.project.enums.Gender;
import lombok.Data;

@Data
public class PatientProfileDTO {
	 private Integer patientID;
	 private LocalDate dateOfBirth;
	 private Gender gender;
	 private String medicalHistory;
	 private String allergies;
	 private String medications;
	 private User user;
	 
	public PatientProfileDTO(Integer patientID, LocalDate dateOfBirth, Gender gender, String medicalHistory,
			String allergies, String medications, User user) {
		super();
		this.patientID = patientID;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
		this.medicalHistory = medicalHistory;
		this.allergies = allergies;
		this.medications = medications;
		this.user = user;
	}

	public PatientProfileDTO() {
	}

}
