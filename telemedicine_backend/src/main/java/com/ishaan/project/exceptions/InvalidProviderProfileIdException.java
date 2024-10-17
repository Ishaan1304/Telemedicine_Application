package com.ishaan.project.exceptions;

public class InvalidProviderProfileIdException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public InvalidProviderProfileIdException(String message)
	{
		super(message);
	}

}
