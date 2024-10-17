package com.ishaan.project.entities;

import java.math.BigDecimal;
import java.time.LocalTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ishaan.project.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "providerprofiles")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProviderProfile {

    @Id
    @Column(name = "ProviderID")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int providerID;

    @Column(name = "Specialty")
    private String specialty;
    
    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "Qualifications")
    private String qualifications;

    @Column(name = "ConsultationFee")
    private BigDecimal consultationFee;
    
    @Column(name = "AvailableFrom")
    private LocalTime availableFrom;
    
    @Column(name = "AvailableTo")
    private LocalTime availableTo;
    
    @Column(name = "treatedDiseases")
    private String treatedDiseases;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userID")
    private User user;
    
}