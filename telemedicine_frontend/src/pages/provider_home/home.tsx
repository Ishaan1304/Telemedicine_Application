import React, { useEffect } from "react";
import styles from "./home.module.css";
import CustomCard from "@/components/provider_home/Dashboard/CustomCard/CustomCard";
import AppointmentTable from "@/components/provider_home/Dashboard/AppointmentTable/AppointmentTable";

import {
  getAppointmentsOnProvider,
  getProviderUpcomingAppointments,
  InitialStateAppointments,
} from "@/redux/slice/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getProviderTodaysPatients,
  getProviderTotalPatients,
  InitialStatePatients,
} from "@/redux/slice/patientsSlice";
import Layout from "@/components/provider_home/Layout/Layout";

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
  const dispatch = useAppDispatch();

  const totalPatients: number = useAppSelector(
    (state: { patients: InitialStatePatients }) =>
      state.patients.providerTotalPatients
  );

  const todayPatients: number = useAppSelector(
    (state: { patients: InitialStatePatients }) =>
      state.patients.providerTodaysPatients
  );

  const totalUpcomingAppointment: number = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.totalPaginationElements
  );

  let appointmentList= useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.providerAppointments
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const countTodayAppointments = appointmentList.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() === today.getTime();
  }).length;

  const countTodayEmergencyAppointments = appointmentList.filter(appointment => {
    const appointmentDate = new Date(appointment.startTime);
    appointmentDate.setHours(0, 0, 0, 0);
  
    return appointmentDate.getTime() === today.getTime() && appointment.emergency;
  }).length;


  const countCancelledAppointments = appointmentList.filter(appointment => {
    if(appointment.status==="CANCELLED") return true;
    return false;
  }).length;

  const countReschudeledAppointments = appointmentList.filter(appointment => {
    if(appointment.status==="RESCHEDULED") return true;
    return false;
  }).length;


  useEffect(() => {
   
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(getProviderTotalPatients({ id: +id }));
      dispatch(getProviderTodaysPatients({ id: +id }));
      dispatch(getAppointmentsOnProvider({ id: +id }));
      dispatch(
        getProviderUpcomingAppointments({
          id: +id,
          page: 0,
          rowsPerPage: 2,
          search: "",
          startDate: "",
          endDate: "",
          emergency: false,
          status:"",
        })
      );
    }
  }, [countCancelledAppointments,countReschudeledAppointments,countTodayEmergencyAppointments]);

  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
          <div className={styles.cardContainer}>
            <div>
              <CustomCard
                heading="Total Patients"
                description={totalPatients}
              />
            </div>
            <div>
              <CustomCard
                heading="Total Appointments"
                description={totalUpcomingAppointment}
              />
            </div>
            <div>
              <CustomCard
                heading="Today App./Emergency"
                description={countTodayAppointments+"/"+countTodayEmergencyAppointments}
              />
            </div>
            <div>
              <CustomCard
                heading="Canceled/Rescheduled"
                description={countCancelledAppointments+"/"+countReschudeledAppointments}
              />
            </div>
          </div>
          <div className={styles.tableContainer}>
            <AppointmentTable />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
