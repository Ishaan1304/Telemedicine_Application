package com.ishaan.project.dto;

import com.ishaan.project.entities.Appointment;

public class MyAppointmentDTO {
	
	private Appointment appointment;
	private String userPic;
	public MyAppointmentDTO(Appointment appointment, String userPic) {
		super();
		this.appointment = appointment;
		this.userPic = userPic;
	}
	public MyAppointmentDTO() {
		super();
	}
	public Appointment getAppointment() {
		return appointment;
	}
	public void setAppointment(Appointment appointment) {
		this.appointment = appointment;
	}
	public String getUserPic() {
		return userPic;
	}
	public void setUserPic(String userPic) {
		this.userPic = userPic;
	}
	
}
