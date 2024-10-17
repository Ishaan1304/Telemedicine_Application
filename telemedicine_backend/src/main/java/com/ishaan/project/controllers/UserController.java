package com.ishaan.project.controllers;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishaan.project.dto.UserDTO;
import com.ishaan.project.dto.UserRequestDTO;
import com.ishaan.project.entities.User;
import com.ishaan.project.services.UserService;



@RestController
@RequestMapping("/user")
//@PreAuthorize("hasRole('ADMIN')")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/addUser")
	public ResponseEntity<UserDTO> addUser(@RequestBody User user)
	{
		System.out.println("Controller add");
		UserDTO result=userService.addUser(user);
		System.out.println("Controller add end");
		System.out.println(result);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}
	
	
	@GetMapping("/getUsers")
	public ResponseEntity<List<UserDTO>> getAllUsers(){
		List<UserDTO> result = userService.getAllUsers();
		if(result==null)
		{
			return ResponseEntity.status(HttpStatus.OK).body(new ArrayList<>());
		}
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@GetMapping("/getUser/{id}")
	public ResponseEntity<UserDTO> getUser(@PathVariable int id){
		UserDTO result=userService.getUserById(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@GetMapping("/get/{id}")
	public ResponseEntity<User> getUserByID(@PathVariable int id){
		User result=userService.getUserByID(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<UserDTO> updateUser(@RequestBody User user,@PathVariable int id)
	{
		System.out.println("controller");
		UserDTO result=userService.updateUser(user,id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<UserDTO> deleteUser(@PathVariable int id)
	{
		UserDTO result=userService.deleteUser(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	
	@PutMapping("/update/{id}")
	public ResponseEntity<UserDTO> update(@RequestBody UserRequestDTO user,@PathVariable int id)
	{
		System.out.println("controller");
		UserDTO result=userService.update(user,id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}
	
	@GetMapping("/except/{userID}")
    public ResponseEntity<List<User>> getUsersExcept(@PathVariable Integer userID) {
        List<User> users = userService.getAllUsersExcept(userID);
        return ResponseEntity.ok(users);
    }
	
	@GetMapping("/except/patient/{userID}")
    public ResponseEntity<List<User>> getUsersExceptPatient(@PathVariable Integer userID) {
        List<User> users = userService.getAllUsersExceptPatient(userID);
        return ResponseEntity.ok(users);
    }
	
	
	@GetMapping("/except/admin/{userID}")
    public ResponseEntity<List<User>> getUsersExceptAdmin(@PathVariable Integer userID) {
        List<User> users = userService.getAllUsersExceptAdmin(userID);
        return ResponseEntity.ok(users);
    }
	
}
