package com.ishaan.project.services;



import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ishaan.project.dto.AuthenticationRequestDTO;
import com.ishaan.project.dto.AuthenticationResponseDTO;
import com.ishaan.project.dto.RegisterRequestDTO;
import com.ishaan.project.entities.Token;
import com.ishaan.project.entities.User;
import com.ishaan.project.enums.TokenType;
import com.ishaan.project.repositories.TokenRepository;
import com.ishaan.project.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository repository;

	private final TokenRepository tokenRepository;

	private final PasswordEncoder passwordEncoder;

	private final JwtService jwtService;

	private final AuthenticationManager authenticationManager;

	public AuthenticationResponseDTO register(RegisterRequestDTO request) {
		var user = User.builder().firstName(request.getFirstName()).lastName(request.getLastName())
				.email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole()).username(request.getUsername()).phone(request.getPhone()).address(request.getAddress()).cityName(request.getCityName()).stateName(request.getStateName()).countryName(request.getCountryName()).build();
		var savedUser = repository.save(user);
		var jwtToken = jwtService.generateToken(user);


		saveUserToken(savedUser, jwtToken);
		return AuthenticationResponseDTO.builder().token(jwtToken).role(user.getRole()).id(user.getUserID()).build();
	}

	public AuthenticationResponseDTO authenticate(AuthenticationRequestDTO request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user = repository.findByEmail(request.getEmail()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		revokeAllUserTokens(user);
		saveUserToken(user, jwtToken);
		return AuthenticationResponseDTO.builder().token(jwtToken).role(user.getRole()).id(user.getUserID()).build();
	}

	private void revokeAllUserTokens(User user) {
	    var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserID());
	    if (validUserTokens.isEmpty())
	      return;
	    validUserTokens.forEach(token -> {
	      token.setExpired(true);
	      token.setRevoked(true);
	    });
	    tokenRepository.saveAll(validUserTokens);
	  }
	
	private void saveUserToken(User user, String jwtToken) {
		var token = Token.builder().user(user).token(jwtToken).tokenType(TokenType.BEARER).expired(false).revoked(false)
				.build();
		tokenRepository.save(token);
	}

}
