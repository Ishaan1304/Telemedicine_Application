package com.ishaan.project.exceptions;

public class UsernameExistsException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public UsernameExistsException(String message)
	{
		super(message);
	}
}
