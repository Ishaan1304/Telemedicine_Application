package com.ishaan.project.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "consultation_notes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ConsultationNote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer consultationNoteID;

    @ManyToOne
    @JoinColumn(name = "patientID", nullable = false)
    private PatientProfile patientProfile;

    @ManyToOne
    @JoinColumn(name = "providerID", nullable = false)
    private ProviderProfile providerProfile;

    @Column(nullable = false, length = 1000)
    private String notes;

    @Column(name = "NoteAt")
    @CreatedDate
    private LocalDateTime dateTime;
}
