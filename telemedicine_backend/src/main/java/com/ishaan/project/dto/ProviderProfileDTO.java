package com.ishaan.project.dto;



import java.math.BigDecimal;
import java.time.LocalTime;

import com.ishaan.project.entities.User;
import com.ishaan.project.enums.Gender;

import lombok.Data;

@Data
public class ProviderProfileDTO {
	private int providerID;
	private String specialty;
	private Gender gender;
	private String qualifications;
	private BigDecimal consultationFee;
	private LocalTime availableFrom;
	private LocalTime availableTo;
	private User user;
	public ProviderProfileDTO(int providerID, String specialty, Gender gender, String qualifications,
			BigDecimal consultationFee, LocalTime availableFrom, LocalTime availableTo, User user) {
		super();
		this.providerID = providerID;
		this.specialty = specialty;
		this.gender = gender;
		this.qualifications = qualifications;
		this.consultationFee = consultationFee;
		this.availableFrom = availableFrom;
		this.availableTo = availableTo;
		this.user = user;
	}
	public ProviderProfileDTO() {
		super();
	}
}
