package com.ishaan.project.controllers;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ishaan.project.dto.FileResponseDTO;
import com.ishaan.project.entities.UserProfile;
import com.ishaan.project.services.UserProfileService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/userProfile")
public class UserProfileController {
	
	@Autowired
	UserProfileService userProfileService;
	
	@Value("${project.userimage}")
	private String path;
	
	@PostMapping("/upload/{userID}")
	public ResponseEntity<FileResponseDTO> fileUpload(@RequestParam("image")MultipartFile image,@PathVariable("userID")int userID)
	{
		String filename=null;
		try {
			filename = this.userProfileService.uploadImage(path, image,userID);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponseDTO(null,"Image is not uploaded due to error on server !!"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(new FileResponseDTO(filename,"Image is successfully uploaded !!"),HttpStatus.OK);
	}
	
	
	@GetMapping("/images/get/{imageName}")
	public void downloadFile(@PathVariable("imageName")String imageName,HttpServletResponse response) throws IOException
	{
		InputStream resource=this.userProfileService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}
	
	
	@GetMapping("/images/user/{userID}")
	public ResponseEntity<UserProfile> getFileNameByUserID(@PathVariable("userID")int userID)
	{
		UserProfile result=this.userProfileService.getUserProfileByUserID(userID);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	

}
