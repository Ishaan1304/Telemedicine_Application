import React, { useEffect, useState } from "react";
import styles from "./appointmentstable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment, getAppointments, InitialStateAppointments } from "@/redux/slice/appointmentsSlice";
import { getPatientProfile, InitialStatePatientProfile } from "@/redux/slice/patientProfileSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";

interface User {
  userID: number;
}

interface Appointment {
  appointmentID: number;
  providerProfile: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
  startTime: string;
  status: string;
}

interface PatientProfile {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
}

const AppointmentsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const id = localStorage.getItem("id");

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointmentID, setSelectedAppointmentID] = useState<number | null>(null);

  const patientProfile = useSelector(
    (state: { patientProfile: InitialStatePatientProfile }) =>
      state.patientProfile
  );

  const handleDeleteClick = (appointmentID: number) => {
    setSelectedAppointmentID(appointmentID);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAppointmentID !== null) {
      dispatch(deleteAppointment({ id: selectedAppointmentID }));
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(getPatientProfile({ id: +id }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (patientProfile.patientID) {
      dispatch(getAppointments({ id: patientProfile.patientID }));
    }
  }, [patientProfile.patientID, dispatch]);

  const upcomingAppointments = useSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.appointments
  );

  
  const filteredAppointments = upcomingAppointments.filter(
    (appointment: Appointment) => appointment.status === 'BOOKED' || appointment.status === 'RESCHEDULED'
  );

  return (
    <div className={styles.messageTableContainer}>
      <h1>Appointments</h1>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>S NO.</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Time</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment, index) => (
                <tr
                  key={appointment.appointmentID}
                  className={`${styles.tr} ${appointment.status === 'RESCHEDULED' ? styles.rescheduled : ''}`}
                >
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>
                    {appointment.providerProfile.user.firstName + " " + appointment.providerProfile.user.lastName}
                  </td>
                  <td className={styles.td}>{appointment.startTime.substring(0, 10)}</td>
                  <td className={styles.td}>{appointment.startTime.substring(11)}</td>
                  <td className={styles.td}>
                    {appointment.status === 'RESCHEDULED' ? (
                      <span className={styles.badge}>Rescheduled</span>
                    ) : (
                      'Booked'
                    )}
                  </td>
                  <td className={styles.td}>
                    <button onClick={() => handleDeleteClick(appointment.appointmentID)}>Cancel</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.td}>No appointments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this appointment?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsTable;

