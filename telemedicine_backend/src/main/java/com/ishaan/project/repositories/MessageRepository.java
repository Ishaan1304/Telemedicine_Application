package com.ishaan.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.Message;
import com.ishaan.project.entities.User;

import jakarta.transaction.Transactional;

public interface MessageRepository extends JpaRepository<Message,Integer> {
	List<Message> findAllByRecipient(User recipient);
	
	@Modifying
    @Transactional
    @Query("DELETE FROM Message m WHERE m.sender.userID = :senderId")
    void deleteBySenderId(@Param("senderId") Integer senderId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Message m WHERE m.recipient.userID = :recipientId")
    void deleteByRecipientId(@Param("recipientId") Integer recipientId);
    
    
    @Query("SELECT m FROM Message m WHERE m.sender.userID = :userID OR m.recipient.userID = :userID")
    List<Message> findAllByUserId(@Param("userID") int userID);
}
