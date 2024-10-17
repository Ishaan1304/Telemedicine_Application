package com.ishaan.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishaan.project.entities.UserProfile;

import jakarta.transaction.Transactional;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
	UserProfile findByUser_UserID(Integer userID);

	 @Query("SELECT u FROM UserProfile u WHERE u.user.id = :userId ORDER BY u.createdDate DESC LIMIT 1")
	 UserProfile findMostRecentProfilePicByUserId(@Param("userId") Integer userId);
	 
	 @Modifying
	 @Transactional
	 @Query("DELETE FROM UserProfile u WHERE u.user.id = :userId")
	 void deleteAllByUserId(Integer userId);
}
