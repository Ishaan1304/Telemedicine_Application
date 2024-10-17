package com.ishaan.project.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

//import com.ishaan.project.config.JwtService;
import com.ishaan.project.dto.UserDTO;
import com.ishaan.project.dto.UserRequestDTO;
import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.entities.User;
import com.ishaan.project.enums.Role;
import com.ishaan.project.exceptions.EmailExistsException;
import com.ishaan.project.exceptions.InvalidUserIdException;
import com.ishaan.project.exceptions.UsernameExistsException;
import com.ishaan.project.repositories.AppointmentRepository;
import com.ishaan.project.repositories.ConsultationNoteRepository;
import com.ishaan.project.repositories.MedicalDocumentRepository;
import com.ishaan.project.repositories.MessageRepository;
import com.ishaan.project.repositories.PatientProfileRepository;
import com.ishaan.project.repositories.PrescriptionRepository;
import com.ishaan.project.repositories.ProviderProfileRepository;
import com.ishaan.project.repositories.TokenRepository;
import com.ishaan.project.repositories.UserProfileRepository;
//import com.ishaan.project.repositories.TokenRepository;
import com.ishaan.project.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private PatientProfileRepository patientProfileRepository;
	
	
	@Autowired
	private ProviderProfileRepository providerProfileRepository;
	
	@Autowired 
	private AppointmentRepository appointmentRepository;
	
	@Autowired 
	private ConsultationNoteRepository consultationNoteRepository;
	
	@Autowired
	private MedicalDocumentRepository medicalDocumentRepository;
	
	@Autowired
	private PrescriptionRepository prescriptionRepository;
	
	@Autowired
	UserProfileRepository userProfileRepository;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	
	

	private final PasswordEncoder passwordEncoder;

	public UserDTO addUser(User user) {
		System.out.println("add service");
		if(userRepository.findByUsername(user.getUsername())!=null)
		{
			throw new UsernameExistsException("Username Exists");
		}   
		if(userRepository.findByEmail(user.getEmail())!=null)
		{
			throw new EmailExistsException("Email Exists");
		}   
		
		User result = userRepository.save(user);
	
		return new UserDTO(result.getUserID(), result.getFirstName(), result.getLastName(), result.getEmail(),
				result.getUsername(), result.getRole(), result.getPhone(), result.getAddress(),result.getCountryName(),result.getStateName(),result.getCityName());
		
	}
	
	
	public List<UserDTO> getAllUsers()
	{ 
		 List<User> result = userRepository.findAll();
		 List<UserDTO> list=new ArrayList<>();
		 for(User user:result)
		 {
			 UserDTO userDTO=new UserDTO(user.getUserID(), user.getFirstName(), user.getLastName(), user.getEmail(),user.getUsername(), user.getRole(), user.getPhone(), user.getAddress(),user.getCountryName(),user.getStateName(),user.getCityName());
			 list.add(userDTO);
		 }
		 return list;
	}
	 
	
	public  UserDTO getUserById(int id)
	{
		User result=userRepository.findById(id);
		if(result==null) throw new InvalidUserIdException("Invalid User Id");
		return new UserDTO(result.getUserID(), result.getFirstName(), result.getLastName(), result.getEmail(),
				result.getUsername(), result.getRole(), result.getPhone(), result.getAddress(),result.getCountryName(),result.getStateName(),result.getCityName());
	}
	
	public  User getUserByID(int id)
	{
		User result=userRepository.findById(id);
		if(result==null) throw new InvalidUserIdException("Invalid User Id");
		return result;
	}
	
	public  UserDTO updateUser(User user,int id)
	{
		System.out.println("service");
		if(userRepository.findById(id)==null)
		{
			 throw new InvalidUserIdException("Invalid User Id");
		}
		user.setUserID(id);
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User result=userRepository.save(user);
		return new UserDTO(result.getUserID(), result.getFirstName(), result.getLastName(), result.getEmail(),
				result.getUsername(), result.getRole(), result.getPhone(), result.getAddress(),result.getCountryName(),result.getStateName(),result.getCityName());
	}
	
	public  UserDTO deleteUser(int id)
	{
		User result=userRepository.findById(id);
		if(result==null)
		{
			 throw new InvalidUserIdException("Invalid User Id");
		}
		
		this.messageRepository.deleteByRecipientId(id);
		this.messageRepository.deleteBySenderId(id);
		this.medicalDocumentRepository.deleteById(id);
		this.tokenRepository.deleteByUserId(id);
		this.userProfileRepository.deleteAllByUserId(id);
		
		if(result.getRole().equals(Role.PATIENT))
		{
			PatientProfile patientProfile=this.patientProfileRepository.findByUser_UserID(id);
			this.consultationNoteRepository.deleteByPatientProfileId(patientProfile.getPatientID());
			this.appointmentRepository.deleteByPatientProfileId(patientProfile.getPatientID());
			this.prescriptionRepository.deleteByPatientProfileId(patientProfile.getPatientID());
			this.patientProfileRepository.deleteByUserId(id);
		}
		else if(result.getRole().equals(Role.PROVIDER))
		{
			ProviderProfile providerProfile=this.providerProfileRepository.findByUser_UserID(id);
			System.out.println(providerProfile);
			this.consultationNoteRepository.deleteByProviderProfileId(providerProfile.getProviderID());
			this.appointmentRepository.deleteByProviderProfileId(providerProfile.getProviderID());
			this.prescriptionRepository.deleteByProviderProfileId(providerProfile.getProviderID());
			this.providerProfileRepository.deleteByUserId(id);
		}
		
		
		userRepository.deleteById(id);
		return new UserDTO(result.getUserID(), result.getFirstName(), result.getLastName(), result.getEmail(),
				result.getUsername(), result.getRole(), result.getPhone(), result.getAddress(),result.getCountryName(),result.getStateName(),result.getCityName());
	}
	
	
	
	public  UserDTO update(UserRequestDTO userRequestDTO,int id)
	{
		User userToUpdate=userRepository.findById(id);
		if(userToUpdate==null)
		{
			 throw new InvalidUserIdException("Invalid User Id");
		}
		userToUpdate.setUserID(id);
		userToUpdate.setCityName(userRequestDTO.getCityName());
		userToUpdate.setStateName(userRequestDTO.getStateName());
		userToUpdate.setCountryName(userRequestDTO.getCountryName());
		userToUpdate.setCityName(userRequestDTO.getCityName());
		userToUpdate.setFirstName(userRequestDTO.getFirstName());
		userToUpdate.setLastName(userRequestDTO.getLastName());
		userToUpdate.setPhone(userRequestDTO.getPhone());
		userToUpdate.setAddress(userRequestDTO.getAddress());
		
		
		
		User result=userRepository.save(userToUpdate);
		return new UserDTO(result.getUserID(), result.getFirstName(), result.getLastName(), result.getEmail(),
				result.getUsername(), result.getRole(), result.getPhone(), result.getAddress(),result.getCountryName(),result.getStateName(),result.getCityName());
	}
	
	public List<User> getAllUsersExcept(Integer userID) {
		 return userRepository.findAllByUserIDNotAndRole(userID, Role.PATIENT);
    }
	
	public List<User> getAllUsersExceptPatient(Integer userID) {
		 return userRepository.findAllByUserIDNotAndRole(userID, Role.PROVIDER);
   }
	
	
	public List<User> getAllUsersExceptAdmin(Integer userID) {
		 return userRepository.findAllByUserIDNot(userID);
  }
	
}
