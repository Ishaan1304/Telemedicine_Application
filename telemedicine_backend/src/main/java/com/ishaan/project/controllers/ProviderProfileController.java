package com.ishaan.project.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.ProviderListDTO;
import com.ishaan.project.dto.ProviderProfileDTO;
import com.ishaan.project.dto.ProviderUserDTO;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.services.ProviderProfileService;

@RestController
@RequestMapping("/provider")
public class ProviderProfileController {

	@Autowired
	ProviderProfileService providerProfileService;

	@PostMapping("/add")
	public ResponseEntity<ProviderProfileDTO> addProviderProfile(@RequestBody ProviderProfile providerProfile) {
		ProviderProfileDTO result = providerProfileService.addProviderProfile(providerProfile);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<ProviderProfileDTO>> getAllPatientProfiles() {

		List<ProviderProfileDTO> result = providerProfileService.getAllProviderProfiles();
		if (result == null) {
			return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());
		}
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<ProviderProfileDTO> getProviderProfile(@PathVariable int id) {
		ProviderProfileDTO result = providerProfileService.getProviderProfileById(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<ProviderProfileDTO> updateUser(@RequestBody ProviderProfile providerProfile,
			@PathVariable int id) {
		ProviderProfileDTO result = providerProfileService.updateProviderProfile(providerProfile, id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<ProviderProfileDTO> deleteUser(@PathVariable int id) {
		ProviderProfileDTO result = providerProfileService.deleteProviderProfile(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/user/{userID}")
	public ResponseEntity<ProviderProfile> getProviderProfileByUserID(@PathVariable Integer userID) {
		ProviderProfile providerProfile = providerProfileService.getProviderProfileByUserID(userID);
		if (providerProfile != null) {
			return ResponseEntity.ok(providerProfile);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/filter")
	public ResponseEntity<PaginationResponseDTO<ProviderListDTO>> filterProviders(
			@RequestParam(required = false) String cityName,
			@RequestParam(required = false) String specialty, 
			@RequestParam(required = false) String gender,
			@RequestParam(required = false) String disease, 
			@RequestParam(required = false) String firstName,
			@RequestParam(defaultValue = "0") int pageNumber,
			@RequestParam(defaultValue = "5") int pageSize) {

		PaginationResponseDTO<ProviderListDTO> result=providerProfileService.getFilteredProviders(cityName, specialty, gender, disease,firstName,pageNumber,pageSize);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@GetMapping("/search")
    public ResponseEntity<PaginationResponseDTO<ProviderUserDTO>> searchPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String cityName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
		PaginationResponseDTO<ProviderUserDTO> result = providerProfileService.searchProviders(name, cityName, page,size);
        return ResponseEntity.ok(result);
    }
	
	@GetMapping("/count")
    public long getProviderCount() {
        return providerProfileService.getProviderCount();
    }

}
