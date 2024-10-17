package com.ishaan.project.entities;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "prescriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "PrescriptionID")
    private Integer prescriptionId;

    @ManyToOne
    @JoinColumn(name = "PatientID", referencedColumnName = "PatientID",nullable=false)
    private PatientProfile patientProfile;

    @ManyToOne
    @JoinColumn(name = "ProviderID", referencedColumnName = "ProviderID",nullable=false)
    private ProviderProfile providerProfile;
    
    @ManyToOne
    @JoinColumn(name = "AppointmentID", referencedColumnName = "appointmentID", nullable = false)
    private Appointment appointment;
    
    @Column(name = "DocumentName")
    private String documentName;

    @Column(name = "Medication", nullable = false, length = 255)
    private String medication;

    @Column(name = "Dosage", length = 100)
    private String dosage;

    @Column(name = "Instructions", columnDefinition = "TEXT")
    private String instructions;

    @CreatedDate
    @Column(name = "IssuedAt", nullable = false, updatable = false)
    private LocalDateTime issuedAt;
}