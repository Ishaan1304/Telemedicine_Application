package com.ishaan.project.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalException {

	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = InvalidUserIdException.class)
	public ResponseEntity<String> handleInvalidUserIdException(InvalidUserIdException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid User Id...");
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = InvalidPatientProfileIdException.class)
	public ResponseEntity<String> handleInvalidPatientProfileIdException(InvalidPatientProfileIdException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Patient Profile Id...");
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = InvalidProviderProfileIdException.class)
	public ResponseEntity<String> handleInvalidProviderProfileIdException(InvalidProviderProfileIdException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Provider Profile Id...");
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = InvalidMessageIdException.class)
	public ResponseEntity<String> handleInvalidMessageIdException(InvalidMessageIdException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Message Id...");
	}
	
	@ResponseStatus(value = HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = UserNotFoundException.class)
	public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid User...");
	}
	
	@ResponseStatus(value = HttpStatus.CONFLICT)
	@ExceptionHandler(value = EmailExistsException.class)
	public ResponseEntity<String> handleEmailExistsException(EmailExistsException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Email...");
	}
	
	@ResponseStatus(value = HttpStatus.CONFLICT)
	@ExceptionHandler(value = UsernameExistsException.class)
	public ResponseEntity<String> handleUsernameExistsException(UsernameExistsException ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid Username...");
	}
	
//	@ResponseStatus(value=HttpStatus.INTERNAL_SERVER_ERROR)
//	@ExceptionHandler(value=Exception.class) 
//	public ResponseEntity<String> handleException(Exception ex) 
//	{ 
//		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Exception has occurred"); 
//	}
}
