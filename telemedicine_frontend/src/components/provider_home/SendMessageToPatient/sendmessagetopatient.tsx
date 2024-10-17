
import React, { useEffect, useState } from 'react';
import styles from './sendMessageToPatient.module.css';
import { sendMessage } from '@/redux/slice/messageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { getPatients, InitialStatePatients } from '@/redux/slice/patientsSlice';

interface Patient {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: any;
}

const SendMessageToPatient: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');

  const handlePatientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(Number(event.target.value));
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedPatient !== null && message.trim()) {
      dispatch(sendMessage({ id: selectedPatient, message: message }));
      setSelectedPatient(null);
      setMessage('');
    } else {
      alert('Please select a patient and enter a message.');
    }
  };

  const patients = useAppSelector((state: { patients: InitialStatePatients }) => state.patients.patients);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getPatients());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Send Message</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="patient" className={styles.label}>
          Select Patient
        </label>
        <select
          id="patient"
          value={selectedPatient ?? ''}
          onChange={handlePatientChange}
          className={styles.select}
        >
          <option value="">--Select a patient--</option>
          {patients.map((patient) => (
            <option key={patient.user.userID} value={patient.user.userID}>
              {`${patient.user.firstName} ${patient.user.lastName}`}
            </option>
          ))}
        </select>

        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message here..."
          className={styles.textarea}
        />

        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SendMessageToPatient;
