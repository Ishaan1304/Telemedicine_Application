import React, { useEffect } from "react";
import styles from "./history.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAppointments } from "@/redux/slice/appointmentsSlice";
import { getPatientProfile } from "@/redux/slice/patientProfileSlice";
import MyAppointmentsPatient from "@/components/patient_home/MyAppointmentsPatient/MyAppointmentsPatient";
const PatientProfilePage = () => {

  return (
    <>
      <PatientLayout>
        <div className={styles.contentDiv}>
         <MyAppointmentsPatient />
        </div>
      </PatientLayout>
    </>
  );
};

export default PatientProfilePage;