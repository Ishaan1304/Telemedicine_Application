package com.ishaan.project.services;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ishaan.project.entities.*;
import com.ishaan.project.dto.MessageDTO;
import com.ishaan.project.exceptions.InvalidMessageIdException;
import com.ishaan.project.exceptions.UserNotFoundException;
import com.ishaan.project.repositories.MessageRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository; 
	
	@Autowired
	private UserRepository userRepository;
	
	public MessageDTO addMessage(Message message)
	{
		User sender=userRepository.findById(message.getSender().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		User receiver=userRepository.findById(message.getRecipient().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		
		Message result=messageRepository.save(message);
		return new MessageDTO(result.getMessageId(),sender,receiver,result.getMessageContent(),result.getSentAt());
		
	}
	
	public MessageDTO updateMessage(int messageId,Message message)
	{
		if(messageRepository.findById(messageId)==null)
		{
			throw new InvalidMessageIdException("Invalid Message Id");
		}
		User sender=userRepository.findById(message.getSender().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		User receiver=userRepository.findById(message.getRecipient().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		
		message.setMessageId(messageId);
		message.setSentAt(LocalDateTime.now());
		Message result=messageRepository.save(message);
		return new MessageDTO(result.getMessageId(),sender,receiver,result.getMessageContent(),result.getSentAt());
				
	}
	
	
	public MessageDTO deleteMessage(int messageId)
	{
		
		Message result=messageRepository.findById(messageId).orElseThrow(
				() -> new InvalidMessageIdException("Invalid Message Id"));
		
		User sender=userRepository.findById(result.getSender().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		
		User receiver=userRepository.findById(result.getRecipient().getUserID()).orElseThrow(
				() -> new UserNotFoundException("User not found"));
		
		messageRepository.deleteById(messageId);
		return new MessageDTO(result.getMessageId(),sender,receiver,result.getMessageContent(),result.getSentAt());
				
	}
	
	
	public List<MessageDTO> getAllByReceiverId(int receiverId)
	{
		User receiver=userRepository.findById(receiverId);
		if(receiver==null)
		{
			throw new UserNotFoundException("User not found");
		}
		List<Message> result=messageRepository.findAllByRecipient(receiver);
		List<MessageDTO> ans=new ArrayList<>();
		for(Message message:result)
		{
			ans.add(new MessageDTO(message.getMessageId(),message.getSender(),message.getRecipient(),message.getMessageContent(),message.getSentAt()));
		}
		return ans;
	}
	
	public List<Message> getMessagesByUserId(int userId) {
        return messageRepository.findAllByUserId(userId);
    }
	
}
