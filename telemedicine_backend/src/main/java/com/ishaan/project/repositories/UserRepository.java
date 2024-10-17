package com.ishaan.project.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ishaan.project.entities.User;
import com.ishaan.project.enums.Role;

public interface UserRepository extends JpaRepository<User,Integer>  {

	public User findById(int id);
	public User deleteById(int id);
	public User findByUsername(String username);
	Optional<User> findByEmail(String email);
	
	 List<User> findAllByUserIDNotAndRole(Integer userID, Role role);
	 
	 
	 List<User> findAllByUserIDNot(Integer userID);
	 
	 

}
