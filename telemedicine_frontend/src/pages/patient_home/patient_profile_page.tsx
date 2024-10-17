import React, { useEffect } from "react";
import styles from "./patient_profile_page.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import PatientProfile from "@/components/patient_home/PatientProfile/PatientProfile";
const PatientProfilePage = () => {
  return (
    <>
      <PatientLayout>
        <div className={styles.contentDiv}>
          <PatientProfile/>
        </div>
      </PatientLayout>
    </>
  );
};

export default PatientProfilePage;