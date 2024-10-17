import React, { useEffect } from "react";
import styles from "./history.module.css";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import { useAppDispatch } from "@/redux/hooks/hooks";
import AppointmentHistoryComponentPatient from "@/components/patient_home/AppointmentHistoryComponentPatient/AppointmentHistoryComponentPatient";
import AdminLayout from "@/components/Admin_Home/AdminLayout/AdminLayout";
import AppointmentHistoryComponentAdmin from "@/components/Admin_Home/AppointmentHistoryComponentAdmin/AppointmentHistoryComponentAdmin";
const AdminAppointmentHistory = () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.contentDiv}>
        <AppointmentHistoryComponentAdmin />
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminAppointmentHistory;
