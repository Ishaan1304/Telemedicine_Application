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
@Table(name = "medicaldocuments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class MedicalDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "DocumentID")
    private Integer documentId;

    @ManyToOne
    @JoinColumn(name = "UserID", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "AppointmentID", referencedColumnName = "appointmentID", nullable = false)
    private Appointment appointment;

    @Column(name = "DocumentName")
    private String documentName;
    
    
    @Column(name = "DocumentType")
    private String documentType;
    

    @Column(name = "UploadedAt")
    @CreatedDate
    private LocalDateTime uploadedAt;
}