package com.ishaan.project.exceptions;

public class InvalidUserIdException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	public InvalidUserIdException(String message)
	{
		super(message);
	}
	
}
