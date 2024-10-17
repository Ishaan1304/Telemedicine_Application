package com.ishaan.project.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ishaan.project.dto.PrescriptionGroupByAppointment;
import com.ishaan.project.entities.Prescription;
import com.ishaan.project.entities.ProviderProfile;
import com.ishaan.project.repositories.PrescriptionRepository;

@Service
public class PrescriptionService {

	@Autowired
	PrescriptionRepository prescriptionRepository;

	public Prescription addPrescription(Prescription prescription) {
		Prescription result = this.prescriptionRepository.save(prescription);
		return result;
	}
	
	public List<Prescription> savePrescriptions(List<Prescription> prescriptions) {
	    return prescriptionRepository.saveAll(prescriptions);
	}
	public List<Prescription> getAllPrescriptionsByPatientId(int patientId) {
		List<Prescription> result = this.prescriptionRepository.findByPatientProfile_PatientID(patientId);
		return result;
	}

	public Prescription updatePrescription(Prescription prescription, int prescriptionID) {
		this.prescriptionRepository.findById(prescriptionID)
				.orElseThrow(() -> new RuntimeException("Invalid Prescription  ID: "));
		prescription.setPrescriptionId(prescriptionID);
		Prescription result = this.prescriptionRepository.save(prescription);
		return result;
	}

	public Prescription deletePrescription(int prescriptionID) {
		Prescription result = this.prescriptionRepository.findById(prescriptionID)
				.orElseThrow(() -> new RuntimeException("Invalid Prescription  ID: "));
		this.prescriptionRepository.deleteById(prescriptionID);
		return result;
	}

	public List<ProviderProfile> getProvidersByPatientId(Integer patientId) {

		return prescriptionRepository.findDistinctProvidersByPatientId(patientId);
	}

	public List<Prescription> getPrescriptionsByProviderId(Integer providerID) {
		return prescriptionRepository.findPrescriptionsByProviderId(providerID);
	}
	
	public List<Prescription> getPrescriptionsByProviderIDAndPatientID(Integer providerID, Integer patientID) {
        return prescriptionRepository.findByProviderProfile_ProviderIDAndPatientProfile_PatientID(providerID, patientID);
    }
	
	
	
	public List<PrescriptionGroupByAppointment> getPrescriptionsGroupedByAppointmentId(Integer providerId) {
        List<Prescription> prescriptions = prescriptionRepository.findPrescriptionsByProviderIdGroupedByAppointmentId(providerId); 
        List<PrescriptionGroupByAppointment> groupedPrescriptions = new ArrayList<>();
        for (Prescription prescription : prescriptions) {
            Integer appointmentId = prescription.getAppointment().getAppointmentID();
            PrescriptionGroupByAppointment group = groupedPrescriptions.stream()
                    .filter(g -> g.getAppointmentId().equals(appointmentId))
                    .findFirst()
                    .orElse(null);

            if (group == null) {
                group = new PrescriptionGroupByAppointment(appointmentId, new ArrayList<>());
                groupedPrescriptions.add(group);
            }
            group.addPrescription(prescription);
        }

        return groupedPrescriptions;
    }
	
	
	public List<Prescription> getPrescriptionsByAppointmentID(Integer appointmentID)
	{
		List<Prescription> prescriptions=prescriptionRepository.findByAppointmentId(appointmentID);
		return prescriptions;
	}

}
