package com.ishaan.project.dto;

import java.time.LocalDateTime;


public class StartEndTimeDTO {
	private LocalDateTime start;
    private LocalDateTime end;
	public LocalDateTime getStart() {
		return start;
	}
	public void setStart(LocalDateTime start) {
		this.start = start;
	}
	public LocalDateTime getEnd() {
		return end;
	}
	public void setEnd(LocalDateTime end) {
		this.end = end;
	}
	public StartEndTimeDTO(LocalDateTime start, LocalDateTime end) {
		super();
		this.start = start;
		this.end = end;
	}
	
	
}
