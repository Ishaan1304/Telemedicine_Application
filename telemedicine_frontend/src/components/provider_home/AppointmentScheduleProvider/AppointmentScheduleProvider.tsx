import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./AppointmentScheduleProvider.module.css";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getPatientProfile,
  InitialStatePatientProfile,
} from "@/redux/slice/patientProfileSlice";
import { getPatients, InitialStatePatients } from "@/redux/slice/patientsSlice";
import { getProviderProfile, InitialStateProviderProfile } from "@/redux/slice/providerProfileSlice";

interface User {
  userID: number;
  firstName: string;
  lastName: string;
}

interface Patient {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
}


type PatientProfile = {
  patientID: number;
};

type ProviderProfile = {
  providerID: number;
};

interface Appointment {
  patientProfile: PatientProfile;
  providerProfile: ProviderProfile;
  startTime: string;
  endTime: string;
  fee: number;
}

const AppointmentScheduleProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  

  const [selectedPatient, setSelectedPatient] = useState<number | "">("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const patients = useAppSelector((state: { patients: InitialStatePatients }) => state.patients.patients);
  


  useEffect(()=>{
    const id=localStorage.getItem('id');
    if(id){
      dispatch(getPatients());
    }
  },[])


  const providerProfile = useAppSelector((state: { providerProfile: InitialStateProviderProfile }) => state.providerProfile);
  

  useEffect(()=>{
    const id=localStorage.getItem('id');
    if(id){
      dispatch(getProviderProfile({id:+id}));
    }
  },[])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPatient || !startTime || !endTime) {
      setError("Please fill out all fields.");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      setError("End time must be after start time.");
      return;
    }
    const duration = (end.getTime() - start.getTime()) / (1000 * 60);
    if (duration < 20 || duration > 40) {
      setError("Appointment duration must be between 20 and 40 minutes.");
      return;
    }

    const appointmentData: Appointment = {
      patientProfile: {patientID:selectedPatient},
      providerProfile: { providerID: providerProfile.providerID },
      startTime,
      endTime,
      fee:234
    };

    const encodedData = encodeURIComponent(JSON.stringify(appointmentData));
    router.push(`/payment?data=${encodedData}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Scheduling</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Patient:</label>
          <select
            className={styles.select}
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(Number(e.target.value))}
          >
            <option value="">Select a Patient</option>
            {patients.map((patient: Patient) => (
              <option key={patient.patientID} value={patient.patientID}>
                {patient.user.firstName + " " + patient.user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Start Time:</label>
          <input
            className={styles.input}
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>End Time:</label>
          <input
            className={styles.input}
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentScheduleProvider;
