import React, { useEffect, useState } from "react";
import styles from "./AllAppointments.module.css";
import CustomSlider from "@/components/Common/Slider/CustomSlider";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAllProviderAppointments, InitialStateAppointments } from "@/redux/slice/appointmentsSlice";
import { getProviderProfile, InitialStateProviderProfile } from "@/redux/slice/providerProfileSlice";

interface Appointment {
  appointmentID: number;
  patientProfile: {
    patientID: number;
    user: {
      userID: number;
      firstName: string;
      lastName: string;
    };
  };
  providerProfile: any; 
  startTime: string;
  endTime: string;
  status: string;
}

const AllAppointments: React.FC = () => {
  const dispatch = useAppDispatch();
  const providerID = useAppSelector((state: { providerProfile: InitialStateProviderProfile }) => state.providerProfile.providerID);
  const appointmentsList = useAppSelector((state: { appointments: InitialStateAppointments }) => state.appointments.allProviderAppointments);


  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsList);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch(getProviderProfile({ id: +id }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (providerID) {
      dispatch(getAllProviderAppointments({ id: providerID }));
    }
  }, [dispatch, providerID]);

  useEffect(() => {
    setAppointments(appointmentsList);
  }, [appointmentsList]);

  return (
    <div className={styles.appointmentsContainer}>
      <h1 style={{ textAlign: "center" }}>All Appointments</h1>
      <div>
        <div style={{ backgroundColor: 'white', display: "inline", border: "1px solid black",borderRadius:"50%" }}>&nbsp;&nbsp;&nbsp;&nbsp;</div>&nbsp;&nbsp;<p style={{display:"inline",fontSize:"12px"}}>BOOKED</p> &nbsp;&nbsp;
        <div style={{ backgroundColor: '#cbf38c', display: "inline", border: "1px solid black" ,borderRadius:"50%"}}>&nbsp;&nbsp;&nbsp;&nbsp;</div>&nbsp;&nbsp;<p style={{display:"inline",fontSize:"12px"}}>RESCHEDULED</p> &nbsp;&nbsp;
        <div style={{ backgroundColor: '#FC9898', display: "inline", border: "1px solid black" ,borderRadius:"50%"}}>&nbsp;&nbsp;&nbsp;&nbsp;</div>&nbsp;&nbsp;<p style={{display:"inline",fontSize:"12px"}}>CANCELLED</p>
      </div>
      <CustomSlider>
        {appointments.map((appointment) => (
          <div
            key={appointment.appointmentID}
            className={`${styles.appointmentCard} ${
              appointment.status === "RESCHEDULED" ? styles.rescheduled :
              appointment.status === "CANCELLED" ? styles.cancelled :
              ""
            }`}
          >
            <h3 className={styles.appointmentTitle}>Appointment</h3>
            <p>
              <strong>Patient:</strong> {appointment.patientProfile.user.firstName} {appointment.patientProfile.user.lastName}
            </p>
            <p>
              <strong>Start Time:</strong> {new Date(appointment.startTime).toLocaleString()}
            </p>
            <p>
              <strong>End Time:</strong> {new Date(appointment.endTime).toLocaleString()}
            </p>
          </div>
        ))}
      </CustomSlider>
    </div>
  );
};

export default AllAppointments;
