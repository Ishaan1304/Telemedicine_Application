package com.ishaan.project.services;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ishaan.project.entities.MedicalDocument;

@Service
public interface FileService {
	public String uploadImage(String path,MultipartFile file,String fileType,int userID,int appointmentID) throws IOException;
	public InputStream getResource(String path,String fileName) throws FileNotFoundException;
	public List<String> getListOfFileNamesUserID(int userID);
	public List<MedicalDocument> getAllByAppointmentId(Integer appointmentId);
}
