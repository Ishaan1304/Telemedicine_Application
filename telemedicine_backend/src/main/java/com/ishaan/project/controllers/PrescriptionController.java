package com.ishaan.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ishaan.project.entities.Prescription;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.services.PrescriptionService;

@RestController
@RequestMapping("/prescriptions")
public class PrescriptionController {

	@Autowired
	PrescriptionService prescriptionService;

	@PostMapping("/add")
	public ResponseEntity<Prescription> addPrescription(@RequestBody Prescription prescription) {
		Prescription result = prescriptionService.addPrescription(prescription);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@GetMapping("/get/{patientID}")
	public ResponseEntity<List<Prescription>> getAllPrescriptionsByPatientId(@PathVariable int patientID) {
		List<Prescription> result = this.prescriptionService.getAllPrescriptionsByPatientId(patientID);
		return ResponseEntity.status(HttpStatus.CREATED).body(result);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Prescription> updatePrescription(@RequestBody Prescription prescription,
			@PathVariable int id) {
		Prescription result = prescriptionService.updatePrescription(prescription, id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Prescription> deletePrescription(@PathVariable int id) {
		Prescription result = prescriptionService.deletePrescription(id);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	@GetMapping("/providers/{patientId}")
	public List<ProviderProfile> getProvidersByPatientId(@PathVariable Integer patientId) {
		return prescriptionService.getProvidersByPatientId(patientId);
	}

	@GetMapping("/providerPrescription/{providerID}")
	public List<Prescription> getPrescriptionsByProviderId(@PathVariable Integer providerID) {
		return prescriptionService.getPrescriptionsByProviderId(providerID);
	}
	
	@GetMapping("/provider/{providerID}/patient/{patientID}")
    public ResponseEntity<List<Prescription>> getPrescriptionsByProviderAndPatient(@PathVariable("providerID") Integer providerID,@PathVariable("patientID") Integer patientID) {
        List<Prescription> prescriptions = prescriptionService.getPrescriptionsByProviderIDAndPatientID(providerID, patientID);
        return ResponseEntity.ok(prescriptions);
    }
	
	@GetMapping("/appointment/{appointmentID}")
	public ResponseEntity<List<Prescription>> getPrescriptionsByAppointmentID(@PathVariable("appointmentID")Integer appointmentID)
	{
		List<Prescription> prescriptions = prescriptionService.getPrescriptionsByAppointmentID(appointmentID);
        return ResponseEntity.ok(prescriptions);
	}
	
	
	@PostMapping("/batch")
	public ResponseEntity<List<Prescription>> addPrescriptions(@RequestBody List<Prescription> prescriptions) {
	    List<Prescription> savedPrescriptions = prescriptionService.savePrescriptions(prescriptions);
	    return ResponseEntity.ok(savedPrescriptions);
	}

}
