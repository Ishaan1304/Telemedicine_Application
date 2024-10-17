package com.ishaan.project.exceptions;

public class InvalidPatientProfileIdException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public InvalidPatientProfileIdException(String message)
	{
		super(message);
	}

}
