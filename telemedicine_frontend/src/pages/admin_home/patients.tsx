import React from "react";
import styles from "./patients.module.css";
import AdminLayout from "@/components/Admin_Home/AdminLayout/AdminLayout";
import { PatientsList } from "@/components/Admin_Home/PatientsList/PatientsList";

const Patients = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.contentDiv}>
            <PatientsList/>
        </div>
      </AdminLayout>
    </>
  );
};

export default Patients;
