package com.ishaan.project.exceptions;

public class InvalidMessageIdException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public InvalidMessageIdException(String message)
	{
		super(message);
	}
	
}
