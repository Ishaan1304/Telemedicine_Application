package com.ishaan.project.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

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
import com.ishaan.project.entities.MedicalDocument;
import com.ishaan.project.services.FileService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/file")
public class FileController {
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	
	@PostMapping("/upload/{userID}/{appointmentID}")
	public ResponseEntity<FileResponseDTO> fileUpload(@RequestParam("image")MultipartFile image, @RequestParam("fileType") String fileType,@PathVariable("userID")int userID,@PathVariable("appointmentID")int appointmentID)
	{
		String filename=null;
		try {
			System.out.println("--------");
			filename = this.fileService.uploadImage(path, image,fileType,userID,appointmentID);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponseDTO(null,"Image is not uploaded due to error on server !!"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(new FileResponseDTO(filename,"Image is successfully uploaded !!"),HttpStatus.OK);
	}
	
	@GetMapping("/images/{imageName}")
	public void downloadFile(@PathVariable("imageName")String imageName,HttpServletResponse response) throws IOException
	{
		InputStream resource=this.fileService.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource,response.getOutputStream());
	}
	
	
	@GetMapping("/images/user/{userID}")
	public ResponseEntity<List<String>> getListOfFileNamesUserID(@PathVariable("userID")int userID)
	{
		List<String> result=this.fileService.getListOfFileNamesUserID(userID);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@GetMapping("/by-appointment/{appointmentId}")
    public ResponseEntity<List<MedicalDocument>> getAllByAppointmentId(@PathVariable Integer appointmentId) {
        List<MedicalDocument> documents = fileService.getAllByAppointmentId(appointmentId);
        return ResponseEntity.ok(documents);
    }
	
}
