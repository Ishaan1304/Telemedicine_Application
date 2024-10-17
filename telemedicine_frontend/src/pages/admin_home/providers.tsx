import React from "react";
import styles from "./patients.module.css";
import AdminLayout from "@/components/Admin_Home/AdminLayout/AdminLayout";
import { PatientsList } from "@/components/Admin_Home/PatientsList/PatientsList";
import { ProvidersList } from "@/components/Admin_Home/ProvidersList/ProvidersList";

const Providers= () => {
  return (
    <>
      <AdminLayout>
        <div className={styles.contentDiv}>
            <ProvidersList/>
        </div>
      </AdminLayout>
    </>
  );
};

export default Providers;
