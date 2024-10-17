package com.ishaan.project.dto;

import java.time.LocalDateTime;

import com.ishaan.project.entities.User;

import lombok.Data;

@Data
public class MessageDTO {
	private Integer messageId;
	private User sender;
	private User recipient;
	private String messageContent;
	private LocalDateTime sentAt;
	public MessageDTO(Integer messageId, User sender, User recipient, String messageContent, LocalDateTime sentAt) {
		super();
		this.messageId = messageId;
		this.sender = sender;
		this.recipient = recipient;
		this.messageContent = messageContent;
		this.sentAt = sentAt;
	}
	public MessageDTO() {
		super();
	}
	
}
