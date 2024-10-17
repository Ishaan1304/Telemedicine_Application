package com.ishaan.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TelemedicineWebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(TelemedicineWebappApplication.class, args);
	}

}
