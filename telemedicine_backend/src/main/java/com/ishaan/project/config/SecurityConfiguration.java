package com.ishaan.project.config;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;
	private final LogoutHandler logoutHandler;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(
						authorizeRequests -> authorizeRequests.requestMatchers("/api/v1/auth/**").permitAll()
						.requestMatchers("/file/**").permitAll()
						.requestMatchers("/api/v1/auth/**","/v3/api-docs","/v3-api-docs/**","swagger-ui.html").permitAll()
						.requestMatchers("/swagger-ui/**").permitAll()
						.requestMatchers("/v3/**").permitAll()
						.requestMatchers("/userProfile/images/get/**").permitAll()
								.anyRequest().authenticated())

				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.logout(logout -> logout.logoutUrl("/api/v1/auth/logout").addLogoutHandler(logoutHandler)
						.logoutSuccessHandler(
								(request, response, authentication) -> SecurityContextHolder.clearContext()));
		

		return http.build();
	}
	
	
}
