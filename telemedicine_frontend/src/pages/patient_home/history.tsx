import React, { useEffect } from "react";
import styles from "./history.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import { useAppDispatch } from "@/redux/hooks/hooks";
import AppointmentHistoryComponentPatient from "@/components/patient_home/AppointmentHistoryComponentPatient/AppointmentHistoryComponentPatient";
const PatientProfilePage = () => {
  return (
    <>
      <PatientLayout>
        <div className={styles.contentDiv}>
        <AppointmentHistoryComponentPatient />
        </div>
      </PatientLayout>
    </>
  );
};

export default PatientProfilePage;
