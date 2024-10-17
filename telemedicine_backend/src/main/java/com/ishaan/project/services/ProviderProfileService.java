package com.ishaan.project.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.ishaan.project.dto.PaginationResponseDTO;
import com.ishaan.project.dto.ProviderListDTO;
import com.ishaan.project.dto.ProviderProfileDTO;
import com.ishaan.project.dto.ProviderUserDTO;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.entities.User;
import com.ishaan.project.entities.UserProfile;
import com.ishaan.project.enums.Gender;
import com.ishaan.project.exceptions.InvalidProviderProfileIdException;
import com.ishaan.project.exceptions.UserNotFoundException;
import com.ishaan.project.repositories.ProviderProfileRepository;
import com.ishaan.project.repositories.UserProfileRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
public class ProviderProfileService {
	@Autowired
	private ProviderProfileRepository providerProfileRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserProfileRepository userProfileRepository;

	public ProviderProfileDTO addProviderProfile(ProviderProfile providerProfile) {

		User user = userRepository.findById(providerProfile.getUser().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found with ID: " + providerProfile.getUser().getUserID()));
		ProviderProfile result = providerProfileRepository.save(providerProfile);
		return new ProviderProfileDTO(result.getProviderID(), result.getSpecialty(), result.getGender(),
				result.getQualifications(), result.getConsultationFee(), result.getAvailableFrom(),
				result.getAvailableTo(), user);

	}

	public List<ProviderProfileDTO> getAllProviderProfiles() {
		List<ProviderProfile> result = providerProfileRepository.findAll();
		List<ProviderProfileDTO> list = new ArrayList<>();
		for (ProviderProfile providerProfile : result) {
			ProviderProfileDTO providerProfileDTO = new ProviderProfileDTO(providerProfile.getProviderID(),
					providerProfile.getSpecialty(), providerProfile.getGender(), providerProfile.getQualifications(),
					providerProfile.getConsultationFee(), providerProfile.getAvailableFrom(),
					providerProfile.getAvailableTo(), providerProfile.getUser());
			list.add(providerProfileDTO);
		}

		return list;
	}

	public ProviderProfileDTO getProviderProfileById(int id) {
		ProviderProfile result = providerProfileRepository.findById(id);
		if (result == null)
			throw new InvalidProviderProfileIdException("Invalid Provider Profile Id");
		return new ProviderProfileDTO(result.getProviderID(), result.getSpecialty(), result.getGender(),
				result.getQualifications(), result.getConsultationFee(), result.getAvailableFrom(),
				result.getAvailableTo(), result.getUser());
	}

	public ProviderProfileDTO updateProviderProfile(ProviderProfile providerProfile, int id) {
		if (providerProfileRepository.findById(id) == null) {
			throw new InvalidProviderProfileIdException("Invalid Patient Profile Id");
		}
		providerProfile.setProviderID(id);
		ProviderProfile result = providerProfileRepository.save(providerProfile);
		return new ProviderProfileDTO(result.getProviderID(), result.getSpecialty(), result.getGender(),
				result.getQualifications(), result.getConsultationFee(), result.getAvailableFrom(),
				result.getAvailableTo(), result.getUser());
	}

	public ProviderProfileDTO deleteProviderProfile(int id) {
		ProviderProfile result = providerProfileRepository.findById(id);
		if (result == null) {
			throw new InvalidProviderProfileIdException("Invalid Patient Profile Id");
		}
		providerProfileRepository.deleteById(id);

		return new ProviderProfileDTO(result.getProviderID(), result.getSpecialty(), result.getGender(),
				result.getQualifications(), result.getConsultationFee(), result.getAvailableFrom(),
				result.getAvailableTo(), result.getUser());
	}

	public ProviderProfile getProviderProfileByUserID(int userId) {
		return providerProfileRepository.findByUser_UserID(userId);
	}

	public PaginationResponseDTO<ProviderListDTO> getFilteredProviders(String cityName, String specialty, String gender, String disease,
			String firstName, int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("availableFrom").descending());
		Page<ProviderProfile> pagePost;

		cityName = (cityName != null && !cityName.isEmpty()) ? cityName : null;
        specialty = (specialty != null && !specialty.isEmpty()) ? specialty : null;
        disease = (disease != null && !disease.isEmpty()) ? disease : null;
        firstName = (firstName != null && !firstName.isEmpty()) ? firstName : null;
		
		Gender genderEnum = null;
		if (gender != null) {
			if (gender.equalsIgnoreCase("MALE")) {
				genderEnum = Gender.MALE;
			} else if (gender.equalsIgnoreCase("FEMALE")) {
				genderEnum = Gender.FEMALE;
			}
		}

		pagePost = providerProfileRepository.findProviders(cityName, specialty, genderEnum, disease, firstName,
				pageable);
		List<ProviderProfile> list=pagePost.getContent();
		List<ProviderListDTO> result=new ArrayList<>();
		
		for(ProviderProfile provider:list)
		{
			ProviderListDTO providerListDTO=new ProviderListDTO();
			providerListDTO.setProviderProfile(provider);
			
			//providerListDTO.setUserPic(userProfileRepository.findMostRecentProfilePicByUserId(provider.getUser().getUserID()).getProfilePic());
			UserProfile mostRecentProfilePic = userProfileRepository.findMostRecentProfilePicByUserId(provider.getUser().getUserID());
			providerListDTO.setUserPic(mostRecentProfilePic != null ? mostRecentProfilePic.getProfilePic() : "");
			result.add(providerListDTO);
		}
		
		
		Long totalRecords = providerProfileRepository.countFilteredProviders(cityName, specialty, genderEnum, disease, firstName);
		
		PaginationResponseDTO<ProviderListDTO> paginationResponseDTO = new PaginationResponseDTO<>(result, totalRecords);
		return paginationResponseDTO;
	}
	
	
	
	
	public PaginationResponseDTO<ProviderUserDTO> searchProviders(String name, String cityName,int page,int size) {
		Pageable pageable = PageRequest.of(page,size);
		Page<ProviderProfile> pagePost =providerProfileRepository.searchProviders(name, cityName,pageable);
		List<ProviderProfile> result=pagePost.getContent();
		
		List<ProviderUserDTO> list=new ArrayList<>();
		for(ProviderProfile pp:result)
		{
			ProviderUserDTO providerUserDTO=new ProviderUserDTO();
			providerUserDTO.setProviderProfile(pp);
			if (userProfileRepository
					.findMostRecentProfilePicByUserId(pp.getUser().getUserID()) == null) {
				providerUserDTO.setUserPic("");
			} else {
				providerUserDTO.setUserPic(userProfileRepository
						.findMostRecentProfilePicByUserId(pp.getUser().getUserID()).getProfilePic());
			}
			
			list.add(providerUserDTO);
			
		}
		
		long totalRecords = pagePost.getTotalElements();
		PaginationResponseDTO<ProviderUserDTO> paginationResponseDTO = new PaginationResponseDTO<>(list,
				totalRecords);
		return paginationResponseDTO;
		
	}
	
	 public long getProviderCount() {
	        return providerProfileRepository.count();
	    }


}
