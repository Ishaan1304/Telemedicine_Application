import React, { useEffect } from "react";
import styles from "./total_patients.module.css";
import SideBar from "@/components/provider_home/SideBar/SideBar";
import { useRouter } from "next/router";
import Layout from "@/components/provider_home/Layout/Layout";
import PatientList from "@/components/provider_home/TotalPatients/PatientList/PatientList";

const TotalPatients = () => {
  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
        <PatientList />
        </div>
      </Layout>
    </>
  );
};

export default TotalPatients;
