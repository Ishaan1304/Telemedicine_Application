package com.ishaan.project.entities;

import java.time.LocalDateTime;

import com.ishaan.project.enums.AppointmentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer appointmentID;

    @ManyToOne
    @JoinColumn(name = "PatientID", nullable = false)
    private PatientProfile patientProfile;

    @ManyToOne
    @JoinColumn(name = "ProviderID", nullable = false)
    private ProviderProfile providerProfile;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "Status",nullable=false)
    private AppointmentStatus status;
    
    @Column(name = "Emergency", nullable = false)
    private boolean emergency;

    @Column(name = "Description", length = 500)
    private String description;
    
    
    @Column(name = "disease")
    private String disease;

    @Column(name = "StartTime", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "EndTime", nullable = false)
    private LocalDateTime endTime;
    
    
    @PrePersist
    @PreUpdate
    public void validateTimes() {
        if (endTime.isBefore(startTime)) {
            throw new IllegalArgumentException("End time must be after start time.");
        }
    }
}