package com.ishaan.project.dto;

import java.util.List;

public class PaginationResponseDTO<T> {
	private List<T> content;
	private long totalElements;
	public List<T> getContent() {
		return content;
	}
	public void setContent(List<T> content) {
		this.content = content;
	}
	public long getTotalElements() {
		return totalElements;
	}
	public PaginationResponseDTO(List<T> content, long totalElements) {
		super();
		this.content = content;
		this.totalElements = totalElements;
	}
	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}
}
