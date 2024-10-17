package com.ishaan.project.controllers;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.PatientProfileDTO;
import com.ishaan.project.dto.PatientUserDTO;
import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.services.PatientProfileService;

@RestController
@RequestMapping("/patient")
//@PreAuthorize("hasRole('ADMIN')")
public class PatientProfileController {
	
	@Autowired
	PatientProfileService patientProfileService;
	
	@PostMapping("/add")
	public ResponseEntity<PatientProfileDTO> addPatientProfile(@RequestBody PatientProfile patientProfile)
	{
		PatientProfileDTO result=patientProfileService.addPatientProfile(patientProfile);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<List<PatientProfileDTO>> getAllPatientProfiles(){
		
		List<PatientProfileDTO> result = patientProfileService.getAllPatientProfiles();
		if(result==null)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());
		}
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<PatientProfileDTO> getPatientProfile(@PathVariable int id){
		PatientProfileDTO result=patientProfileService.getPatientProfileById(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<PatientProfileDTO> updatePatientProfile(@RequestBody PatientProfile patientProfile,@PathVariable int id)
	{
		PatientProfileDTO result=patientProfileService.updatePatientProfile(patientProfile,id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<PatientProfileDTO> deletePatientProfile(@PathVariable int id)
	{
		PatientProfileDTO result=patientProfileService.deletePatientProfile(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@GetMapping("/user/{userID}")
    public ResponseEntity<PatientProfile> getPatientProfileByUserID(@PathVariable Integer userID) {
        PatientProfile patientProfile = patientProfileService.getPatientProfileByUserID(userID);
        if (patientProfile != null) {
            return ResponseEntity.ok(patientProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
	@GetMapping("/search")
    public ResponseEntity<PaginationResponseDTO<PatientUserDTO>> searchPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String cityName,
            @RequestParam(required = false) LocalDate dateOfBirth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
		PaginationResponseDTO<PatientUserDTO> result = patientProfileService.searchPatients(name, cityName, dateOfBirth, page,size);
        return ResponseEntity.ok(result);
    }
	
	 @GetMapping("/count")
	    public long getPatientCount() {
	        return patientProfileService.getPatientCount();
	    }
	
}
