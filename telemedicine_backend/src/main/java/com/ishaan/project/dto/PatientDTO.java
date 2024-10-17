package com.ishaan.project.dto;

import java.time.LocalDateTime;

import com.ishaan.project.enums.Gender;

public class PatientDTO {
	private String firstName;
    private String lastName;
    private Gender gender;
    private String phone;
    private String address;
    private LocalDateTime startTime;
    private String profilePic;
    private String allergies;
    private String disease;
	public PatientDTO(String firstName, String lastName, Gender gender, String phone, String address,
			LocalDateTime startTime, String profilePic, String allergies, String disease) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.phone = phone;
		this.address = address;
		this.startTime = startTime;
		this.profilePic = profilePic;
		this.allergies = allergies;
		this.disease = disease;
	}
	public String getDisease() {
		return disease;
	}
	public void setDisease(String disease) {
		this.disease = disease;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public String getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}
	public String getAllergies() {
		return allergies;
	}
	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}
	public PatientDTO() {
		super();
	}
}
