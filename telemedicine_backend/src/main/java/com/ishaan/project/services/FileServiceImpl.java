package com.ishaan.project.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.ishaan.project.entities.MedicalDocument;
import com.ishaan.project.entities.User;
import com.ishaan.project.exceptions.InvalidUserIdException;
import com.ishaan.project.repositories.AppointmentRepository;
import com.ishaan.project.repositories.MedicalDocumentRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
public class FileServiceImpl implements FileService {

	@Autowired
	private MedicalDocumentRepository medicalDocumentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;

	@Override
	public String uploadImage(String path, MultipartFile file,String fileType,int userID,int appointmentID) throws IOException {
		
		String name = file.getOriginalFilename();
		

		String randomID = UUID.randomUUID().toString();
		String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));

		String filePath = path + File.separator + fileName1;

		File f = new File(path);
		if (!f.exists()) {
			f.mkdir();
		}
		Files.copy(file.getInputStream(), Paths.get(filePath));
		User result=userRepository.findById(userID);
		if(result==null) throw new InvalidUserIdException("Invalid User Id");
		MedicalDocument document = new MedicalDocument();
        document.setDocumentName(name);
        document.setDocumentName(fileName1);
        document.setUser(result); 
        document.setUploadedAt(LocalDateTime.now());
        document.setAppointment(appointmentRepository.findById(appointmentID));
        document.setDocumentType(fileType);
        medicalDocumentRepository.save(document);
		return name;
	}

	@Override
	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path + File.separator + fileName;
		InputStream is = new FileInputStream(fullPath);
		return is;
	}
	
	public List<String> getListOfFileNamesUserID(int userID)
	{
		List<String> result=this.medicalDocumentRepository.findAllDocumentNames(userID);
		return result;
	}
	
	public List<MedicalDocument> getAllByAppointmentId(Integer appointmentId) {
        return medicalDocumentRepository.findByAppointmentId(appointmentId);
    }

}
