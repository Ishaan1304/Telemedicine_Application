package com.ishaan.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ishaan.project.entities.ConsultationNote;
import com.ishaan.project.entities.PatientProfile;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.repositories.ConsultationNoteRepository;
import com.ishaan.project.repositories.PatientProfileRepository;
import com.ishaan.project.repositories.ProviderProfileRepository;

@Service
public class ConsultationNoteService {
	
	@Autowired
	private ConsultationNoteRepository consultationNoteRepository;
	
	@Autowired
	private PatientProfileRepository patientProfileRepository;
	
	@Autowired
	private ProviderProfileRepository providerProfileRepository;
	
    public ConsultationNote addConsultationNote(ConsultationNote consultationNote) {
    	int patientID=consultationNote.getPatientProfile().getPatientID();
    	int providerID=consultationNote.getProviderProfile().getProviderID();
    	PatientProfile patientProfile=patientProfileRepository.findById(patientID);
    	if(patientProfile==null) throw new RuntimeException("Invalid patientID");	
    	ProviderProfile providerProfile=providerProfileRepository.findById(providerID);
    	if(providerProfile==null) throw new RuntimeException("Invalid providerID"); 	
    	consultationNote.setPatientProfile(patientProfile);
    	consultationNote.setProviderProfile(providerProfile);
        return consultationNoteRepository.save(consultationNote);
    }

    public ConsultationNote deleteConsultationNoteById(Integer noteID) {
    	ConsultationNote result=consultationNoteRepository.findById(noteID).orElseThrow(()->new RuntimeException("Invalid Note Id"));
        consultationNoteRepository.deleteById(noteID);
        return result;
    }

 
    public List<ConsultationNote> getAllConsultationNotesByPatientIDAndProviderID(Integer patientID, Integer providerID) {
    	PatientProfile patientProfile=patientProfileRepository.findById(patientID).orElseThrow(()->new RuntimeException("Invalid Patient Id"));
    	if(patientProfile==null) throw new RuntimeException("Invalid patientID");
    	ProviderProfile providerProfile=providerProfileRepository.findById(providerID).orElseThrow(()->new RuntimeException("Invalid Provider Id"));
    	if(providerProfile==null) throw new RuntimeException("Invalid providerID");
        return consultationNoteRepository.findByPatientProfile_PatientIDAndProviderProfile_ProviderID(patientID, providerID);
    }
    
    public Optional<ConsultationNote> getMostRecentConsultationNote(Integer patientId, Integer providerId) {
        return consultationNoteRepository.findMostRecentConsultationNote(patientId, providerId);
    }
}
