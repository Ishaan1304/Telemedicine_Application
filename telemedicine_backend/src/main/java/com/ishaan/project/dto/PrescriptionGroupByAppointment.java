package com.ishaan.project.dto;
import com.ishaan.project.entities.Prescription;
import java.util.ArrayList;
import java.util.List;

public class PrescriptionGroupByAppointment {

    private Integer appointmentId;
    private List<Prescription> prescriptions;

    public PrescriptionGroupByAppointment() {
        this.prescriptions = new ArrayList<>();
    }

    public PrescriptionGroupByAppointment(Integer appointmentId, List<Prescription> prescriptions) {
        this.appointmentId = appointmentId;
        this.prescriptions = prescriptions;
    }

    public Integer getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Integer appointmentId) {
        this.appointmentId = appointmentId;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    public void addPrescription(Prescription prescription) {
        this.prescriptions.add(prescription);
    }
}
