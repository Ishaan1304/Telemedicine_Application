import React from "react";
import styles from "./patientmessage.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import PatientChatComponent from "@/components/patient_home/PatientChatComponent/PatientChatComponent";

const Message = () => {
  return (
    <>
      <PatientLayout>
        <div className={styles.contentDiv}>
        <PatientChatComponent/>
        </div>
      </PatientLayout>
    </>
  );
};

export default Message;
