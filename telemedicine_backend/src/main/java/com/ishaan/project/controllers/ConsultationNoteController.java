package com.ishaan.project.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishaan.project.entities.ConsultationNote;
import com.ishaan.project.services.ConsultationNoteService;

@RestController
@RequestMapping("/notes")
public class ConsultationNoteController {
	
	@Autowired
    private ConsultationNoteService consultationNoteService;

    
    @PostMapping("/add")
    public ResponseEntity<ConsultationNote> addConsultationNote(@RequestBody ConsultationNote consultationNote) {
        try {
            ConsultationNote addedNote = consultationNoteService.addConsultationNote(consultationNote);
            return new ResponseEntity<>(addedNote, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{noteID}")
    public ResponseEntity<ConsultationNote> deleteConsultationNoteById(@PathVariable Integer noteID) {
        try {
            ConsultationNote deletedNote = consultationNoteService.deleteConsultationNoteById(noteID);
            return new ResponseEntity<>(deletedNote, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/search/{patientID}/{providerID}")
    public ResponseEntity<List<ConsultationNote>> getAllConsultationNotesByPatientIDAndProviderID(@PathVariable("patientID") Integer patientID,@PathVariable("providerID") Integer providerID) {
        try {
            List<ConsultationNote> notes = consultationNoteService.getAllConsultationNotesByPatientIDAndProviderID(patientID, providerID);
            return new ResponseEntity<>(notes, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
    
    
    
    @GetMapping("/recent/{patientID}/{providerID}")
    public Optional<ConsultationNote> getRecentNote(
            @PathVariable("patientID") Integer patientId,
            @PathVariable("providerID") Integer providerId) {
        return consultationNoteService.getMostRecentConsultationNote(patientId, providerId);
    }
}
