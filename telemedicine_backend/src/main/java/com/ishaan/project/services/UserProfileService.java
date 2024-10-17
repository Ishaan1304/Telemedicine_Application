package com.ishaan.project.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ishaan.project.entities.User;
import com.ishaan.project.entities.UserProfile;
import com.ishaan.project.repositories.UserProfileRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
public class UserProfileService {
	
	@Autowired
	UserProfileRepository userProfileRepositoy;
	
	@Autowired
	UserRepository userRepository;

	public String uploadImage(String path, MultipartFile file, int userID)
			throws IOException {

		String name = file.getOriginalFilename();

		String randomID = UUID.randomUUID().toString();
		String fileName1 = randomID.concat(name.substring(name.lastIndexOf(".")));

		String filePath = path + File.separator + fileName1;

		File f = new File(path);
		if (!f.exists()) {
			f.mkdir();
		}
		Files.copy(file.getInputStream(), Paths.get(filePath));
		
		User user=userRepository.findById(userID);
		if(user==null) throw new RuntimeException("Invalid UserId");
		
		UserProfile userProfile=new UserProfile();
		userProfile.setUser(user);
		userProfile.setProfilePic(fileName1);
		userProfileRepositoy.save(userProfile);
		
		return name;
	}
	

	public InputStream getResource(String path, String fileName) throws FileNotFoundException {
		String fullPath = path + File.separator + fileName;
		InputStream is = new FileInputStream(fullPath);
		return is;
	}
	
	public UserProfile getUserProfileByUserID(int userID)
	{
		UserProfile result=this.userProfileRepositoy.findMostRecentProfilePicByUserId(userID);
		return result;
	}

}
