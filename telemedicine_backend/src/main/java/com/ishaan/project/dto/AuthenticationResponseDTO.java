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
public class AuthenticationResponseDTO {

	private String token;
	private Role role;
	private Integer id;
}