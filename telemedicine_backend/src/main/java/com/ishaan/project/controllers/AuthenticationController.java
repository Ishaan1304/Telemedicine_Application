package com.ishaan.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishaan.project.dto.AuthenticationRequestDTO;
import com.ishaan.project.dto.AuthenticationResponseDTO;
import com.ishaan.project.dto.RegisterRequestDTO;
import com.ishaan.project.services.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	@Autowired
	private final AuthenticationService service;
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody RegisterRequestDTO request)
	{
		return ResponseEntity.ok(service.register(request));
	}
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO request)
	{
		System.out.println("Auth controller got called");
		return ResponseEntity.ok(service.authenticate(request));
	}
	
}
