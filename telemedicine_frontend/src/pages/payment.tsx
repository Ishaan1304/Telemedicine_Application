

import React, { useEffect, useState } from 'react';
import styles from '../styles/payment.module.css';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { bookAppointment } from './api/api';
import { decode } from 'punycode';

const Payment: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDesctiption] = useState('');
  const [emergency, setEmergency] = useState('');
  const [disease, setDisease] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: encodedData }:any = router.query;
    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
      
        setData(decodedData);
        setAmount(decodedData.fee);
        setDesctiption(decodedData.description);
        setEmergency(decodedData.isEmergency);
        setDisease(decodedData.disease);
      } catch (error) {
       
        setError('Invalid data format.');
      }
    }
    
    
  }, [router.query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !cardNumber || !expiryDate || !cvv) {
      setError('Please fill out all fields.');
      return;
    }

    const dataToSend={
      patientProfile:{
        patientID:data.patientProfile.patientID
      },
      providerProfile:{
        providerID:data.providerProfile.providerID
      },
      startTime:data.startTime,
      endTime:data.endTime,
      status:"BOOKED",
      description:description,
      emergency:emergency,
      disease:disease,
    }
    try {
      const resdata = await bookAppointment(dataToSend);
      toast.success("Successfully Booked");
      const role=localStorage.getItem('role');
      if(role==="PROVIDER") router.push('/provider_home/home');
      else if(role==="PATIENT") router.push('/patient_home/home');
      else router.push('/admin_home/home');
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Something went wrong");
      setError("Something went wrong.");
    }
    
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
      <h1 className={styles.title}>Payment Gateway</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amount:</label>
          <input
            type="text"
            value={amount}
            className={styles.input}
            disabled
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className={styles.input}
            placeholder="Enter card number"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Expiry Date:</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className={styles.input}
            placeholder="MM/YY"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className={styles.input}
            placeholder="Enter CVV"
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Submit Payment</button>
      </form>
      </div>
    </div>
  );
};

export default Payment;
