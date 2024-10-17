

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./appointmentscheduler.module.css";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getPatientProfile, InitialStatePatientProfile } from "@/redux/slice/patientProfileSlice";

interface User {
  userID: number;
  firstName: string;
  lastName: string;
}

interface Provider {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}

interface Providers {
  providers: Provider[];
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

const AppointmentScheduler: React.FC = () => {

  const dispatch=useAppDispatch();
  const router = useRouter();
  const providers =
    useAppSelector((state: any) => state.providers.providers) || [];


  
  const [selectedProvider, setSelectedProvider] = useState<number | "">("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [error, setError] = useState<string | null>(null);



  const patientID =
    useAppSelector((state: {patientProfile:InitialStatePatientProfile}) => state.patientProfile.patientID); 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        if (id) {
          dispatch(getPatientProfile({ id: +id }));
        } else {
          //
        }
      } catch (error) {
       
        setError("Failed to fetch patient data.");
      }
    };

    fetchData();
  }, [dispatch]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProvider || !startTime || !endTime) {
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
      patientProfile: { patientID },
      providerProfile: { providerID: Number(selectedProvider) },
      startTime,
      endTime,
      fee:
        providers.find(
          (provider: { providerID: number }) =>
            provider.providerID === selectedProvider
        )?.consultationFee || 0,
    };

    const encodedData = encodeURIComponent(JSON.stringify(appointmentData));
    router.push(`/payment?data=${encodedData}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointment Scheduling</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Provider:</label>
          <select
            className={styles.select}
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(Number(e.target.value))}
          >
            <option value="">Select a provider</option>
            {providers.map((provider: Provider) => (
              <option key={provider.providerID} value={provider.providerID}>
                {provider.user.firstName + " " + provider.user.lastName}
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

export default AppointmentScheduler;
