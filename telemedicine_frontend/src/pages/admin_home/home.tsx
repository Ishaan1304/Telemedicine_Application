import React, { useEffect } from "react";
import styles from "./home.module.css";
import CustomCard from "@/components/provider_home/Dashboard/CustomCard/CustomCard";

import AdminLayout from "@/components/Admin_Home/AdminLayout/AdminLayout";
import AdminAppointmentTable from "@/components/Admin_Home/AdminAppointmentTable/AdminAppointmentTable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAdminPatientsBox } from "@/redux/slice/patientsSlice";
import { getAdminProvidersBox } from "@/redux/slice/providersSlice";
import { getAdminAppointmentsBox, getAdminUpcomingAppointmentsBox } from "@/redux/slice/appointmentsSlice";

interface Appointment {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean; 
  description: string;
}

const Home = () => {

  const dispatch=useAppDispatch();

  const totalPatients=useAppSelector((state)=>state.patients.adminPatientNumberBox);
  const totalProviers=useAppSelector((state)=>state.providers.adminProviderNumberBox);
  const totalAppointments=useAppSelector((state)=>state.appointments.adminAppointmentNumberBox);
  const upcomingAppointments=useAppSelector((state)=>state.appointments.adminUpcomingAppointmentNumberBox);

  useEffect(()=>{
    dispatch(getAdminPatientsBox());
    dispatch(getAdminProvidersBox());
    dispatch(getAdminAppointmentsBox());
    dispatch(getAdminUpcomingAppointmentsBox());
  },[])
  
  return (
    <>
      <AdminLayout>
        <div className={styles.contentDiv}>
        <div className={styles.cardContainer}>
            <div>
              <CustomCard
                heading="Upcoming App."
                description={upcomingAppointments}
              />
            </div>
            <div>
              <CustomCard
                heading="Patients"
                description={totalPatients}
              />
            </div>
            <div>
              <CustomCard
                heading="Providers"
                description={totalProviers}
              />
            </div>
            <div>
              <CustomCard
                heading="Appointments"
                description={totalAppointments}
              />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <AdminAppointmentTable />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Home;
