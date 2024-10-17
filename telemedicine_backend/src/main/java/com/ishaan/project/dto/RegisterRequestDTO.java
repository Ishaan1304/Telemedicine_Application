package com.ishaan.project.dto;


import com.ishaan.project.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	private Role role;
	private String phone;
	private String address;
	private String countryName;
    private String stateName;
    private String cityName;
}
