package com.ishaan.project.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ishaan.project.dto.AppointmentDTO;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.PatientProfileDTO;
import com.ishaan.project.dto.PatientUserDTO;
import com.ishaan.project.entities.*;
import com.ishaan.project.exceptions.InvalidPatientProfileIdException;
import com.ishaan.project.exceptions.UserNotFoundException;
import com.ishaan.project.repositories.PatientProfileRepository;
import com.ishaan.project.repositories.UserProfileRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
public class PatientProfileService {

	@Autowired
	private PatientProfileRepository patientProfileRepository;

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserProfileRepository userProfileRepository;

	public PatientProfileDTO addPatientProfile(PatientProfile patientProfile) {

		User user = userRepository.findById(patientProfile.getUser().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found with ID: " + patientProfile.getUser().getUserID()));
		PatientProfile result = patientProfileRepository.save(patientProfile);
		return new PatientProfileDTO(result.getPatientID(), result.getDateOfBirth(), result.getGender(),
				result.getMedicalHistory(), result.getAllergies(), result.getMedications(), user);

	}

	public List<PatientProfileDTO> getAllPatientProfiles() {
		System.out.println("-----------------");
		List<PatientProfile> result = patientProfileRepository.findAll();

		List<PatientProfileDTO> list = new ArrayList<>();

		for (PatientProfile patientProfile : result) {
			PatientProfileDTO patientProfileDTO = new PatientProfileDTO(patientProfile.getPatientID(),
					patientProfile.getDateOfBirth(), patientProfile.getGender(), patientProfile.getMedicalHistory(),
					patientProfile.getAllergies(), patientProfile.getMedications(), patientProfile.getUser());
			list.add(patientProfileDTO);
		}

		return list;
	}

	public PatientProfileDTO getPatientProfileById(int id) {
		PatientProfile result = patientProfileRepository.findById(id);
		if (result == null)
			throw new InvalidPatientProfileIdException("Invalid Patient Profile Id");
		return new PatientProfileDTO(result.getPatientID(), result.getDateOfBirth(), result.getGender(),
				result.getMedicalHistory(), result.getAllergies(), result.getMedications(), result.getUser());
	}

	public PatientProfileDTO updatePatientProfile(PatientProfile patientProfile, int id) {
		if (patientProfileRepository.findById(id) == null) {
			throw new InvalidPatientProfileIdException("Invalid Patient Profile Id");
		}
		patientProfile.setPatientID(id);
		PatientProfile result = patientProfileRepository.save(patientProfile);
		return new PatientProfileDTO(result.getPatientID(), result.getDateOfBirth(), result.getGender(),
				result.getMedicalHistory(), result.getAllergies(), result.getMedications(), result.getUser());
	}

	public PatientProfileDTO deletePatientProfile(int id) {
		PatientProfile result = patientProfileRepository.findById(id);
		if (result == null) {
			throw new InvalidPatientProfileIdException("Invalid Patient Profile Id");
		}
		patientProfileRepository.deleteById(id);

		return new PatientProfileDTO(result.getPatientID(), result.getDateOfBirth(), result.getGender(),
				result.getMedicalHistory(), result.getAllergies(), result.getMedications(), result.getUser());
	}

	public PatientProfile getPatientProfileByUserID(int userId) {
		return patientProfileRepository.findByUser_UserID(userId);
	}

	public PaginationResponseDTO<PatientUserDTO> searchPatients(String name, String cityName, LocalDate dateOfBirth,int page,int size) {
		Pageable pageable = PageRequest.of(page,size);
		Page<PatientProfile> pagePost =patientProfileRepository.searchPatients(name, cityName, dateOfBirth, pageable);
		List<PatientProfile> result=pagePost.getContent();
		
		List<PatientUserDTO> list=new ArrayList<>();
		for(PatientProfile pp:result)
		{
			PatientUserDTO patientUserDTO=new PatientUserDTO();
			patientUserDTO.setPatientProfile(pp);
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(pp.getUser().getUserID()) == null) {
				patientUserDTO.setUserPic("");
			} else {
				patientUserDTO.setUserPic(userProfileRepository
						.findMostRecentProfilePicByUserId(pp.getUser().getUserID()).getProfilePic());
			}
			
			list.add(patientUserDTO);
			
		}
		
		long totalRecords = pagePost.getTotalElements();
		PaginationResponseDTO<PatientUserDTO> paginationResponseDTO = new PaginationResponseDTO<>(list,
				totalRecords);
		return paginationResponseDTO;
		
	}
	
	 public long getPatientCount() {
	        return patientProfileRepository.count();
	    }

}
