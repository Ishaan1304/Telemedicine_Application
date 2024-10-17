package com.ishaan.project.dto;





import com.ishaan.project.enums.Role;

import lombok.Data;

@Data
public class UserDTO {
	private Integer userID;
	private String firstName;
	private String lastName;
	private String email;
    private String username;
    private Role role;
    private String phone;
    private String address;
    private String countryName;
    private String stateName;
    private String cityName;

	public UserDTO(Integer userID, String firstName, String lastName, String email, String username, Role role,
			String phone, String address, String countryName, String stateName, String cityName) {
		super();
		this.userID = userID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.role = role;
		this.phone = phone;
		this.address = address;
		this.countryName = countryName;
		this.stateName = stateName;
		this.cityName = cityName;
	}
	
}