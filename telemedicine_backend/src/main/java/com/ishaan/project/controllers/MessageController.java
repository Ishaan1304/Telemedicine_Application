package com.ishaan.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishaan.project.dto.MessageDTO;
import com.ishaan.project.entities.Message;
import com.ishaan.project.services.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@PostMapping("/add")
	public ResponseEntity<MessageDTO> addMessage(@RequestBody Message message)
	{
		System.out.println(message);
		MessageDTO result=messageService.addMessage(message);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	@PutMapping("/update/{messageId}")
	public ResponseEntity<MessageDTO> updateMessage(@PathVariable int messageId, @RequestBody Message message)
	{
		MessageDTO result=messageService.updateMessage(messageId,message);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@DeleteMapping("/delete/{messageId}")
	public ResponseEntity<MessageDTO> deleteMessage(@PathVariable int messageId)
	{
		MessageDTO result=messageService.deleteMessage(messageId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@GetMapping("/get/{receiverId}")
	public ResponseEntity<List<MessageDTO>> getAllByReceiverId(@PathVariable int receiverId)
	{
		List<MessageDTO> result=messageService.getAllByReceiverId(receiverId);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUserId(@PathVariable int userId) {
        List<Message> messages = messageService.getMessagesByUserId(userId);
        return ResponseEntity.ok(messages);
    }
	
	
}
