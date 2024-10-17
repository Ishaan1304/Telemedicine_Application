import React, { useEffect } from "react";
import styles from "./appointment_history.module.css";
import Layout from "@/components/provider_home/Layout/Layout";
import AppointmentHistoryComponent from "@/components/provider_home/AppointmentHistoryComponent/AppointmentHistoryComponent";

const AppointmentHistory = () => {
  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
          <AppointmentHistoryComponent />
        </div>
      </Layout>
    </>
  );
};

export default AppointmentHistory;
