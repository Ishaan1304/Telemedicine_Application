import React from "react";
import styles from "../styles/Service.module.css";

const Service = () => {
  return (
    <>
      <section className={styles.services}>
        <h2>Our Services</h2>
        <p>
          At TeleMed, we offer a range of telemedicine services designed to meet your healthcare needs. Our platform allows you to connect with healthcare professionals remotely, ensuring that you receive the best care without leaving your home.
        </p>
        <div className={styles.serviceList}>
          <div className={styles.serviceItem}>
            <div className={styles.icon}>🩺</div>
            <h3>Virtual Consultations</h3>
            <p>
              Consult with healthcare professionals via video calls from the comfort of your home. Get expert advice and diagnosis without waiting for an appointment.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.icon}>💊</div>
            <h3>Prescription Services</h3>
            <p>
              Obtain prescriptions for your medications through our platform. Our doctors can write prescriptions based on your consultation and send them directly to your pharmacy.
            </p>
          </div>
          <div className={styles.serviceItem}>
            <div className={styles.icon}>🩹</div>
            <h3>Follow-Up Care</h3>
            <p>
              Schedule follow-up appointments to monitor your progress and adjust treatment plans as needed. Our team ensures you stay on track with your health goals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
