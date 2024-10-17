import React, { useEffect, useState } from "react";
import styles from "./AllAppointmentManagement.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAllAppointments, InitialStateAppointments } from "@/redux/slice/appointmentsSlice";
import Image from "next/image";

interface User {
  firstName: string;
  lastName: string;
}

interface Appointment {
  appointmentID: number;
  patientProfile: {
    user: User;
  };
  providerProfile: {
    user: User;
  };
  startTime: string;
  endTime: string;
  status: string;
}

const AllAppointmentManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const appointmentsList = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.allAppointments
  );


  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentsList) {
      setAppointments(appointmentsList);
      setLoading(false);
    } else {
      setLoading(false);
      setError("Failed to load appointments.");
    }
  }, [appointmentsList]);


  useEffect(()=>{
    if(appointmentsList.length===0)
    {
      dispatch(getAllAppointments());
    }
  },[appointmentsList]);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientProfile.user.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case "BOOKED":
        return styles.booked;
      case "RESCHEDULED":
        return styles.rescheduled;
      case "CANCELLED":
        return styles.cancelled;
      default:
        return "";
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>All Appointments</h1>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search by patient first name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.appointmentsList}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.appointmentID}
              className={`${styles.appointmentCard} ${getStatusClass(
                appointment.status
              )}`}
            >
              <Image
                src="/assets/appointment.png"
                alt="Appointment"
                className={styles.appointmentImage}
              />
              <div className={styles.appointmentDetails}>
                <h2 className={styles.appointmentTitle}>
                  Appointment ID: {appointment.appointmentID}
                </h2>
                <p>
                  <strong>Patient:</strong> {appointment.patientProfile.user.firstName}{" "}
                  {appointment.patientProfile.user.lastName}
                </p>
                <p>
                  <strong>Provider:</strong>{" "}
                  {appointment.providerProfile.user.firstName}{" "}
                  {appointment.providerProfile.user.lastName}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(appointment.startTime).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(appointment.endTime).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noAppointments}>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointmentManagement;
