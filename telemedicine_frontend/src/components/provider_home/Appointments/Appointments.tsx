import React, { useEffect, useState } from "react";
import styles from "./Appointments.module.css";
import CustomSlider from "@/components/Common/Slider/CustomSlider";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getProviderProfile, InitialStateProviderProfile } from "@/redux/slice/providerProfileSlice";
import { deleteAppointment, getAppointmentsOnProvider, InitialStateAppointments, updateAppointment } from "@/redux/slice/appointmentsSlice";

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

const Appointments: React.FC = () => {
  const dispatch = useAppDispatch();
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointment, setDeletingAppointment] = useState<Appointment | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const providerID = useAppSelector((state: { providerProfile: InitialStateProviderProfile }) => state.providerProfile.providerID);

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (id) {
      dispatch(getProviderProfile({ id: +id }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (providerID) {
      dispatch(getAppointmentsOnProvider({ id: providerID }));
    }
  }, [dispatch, providerID]);

  const appointmentsList = useAppSelector((state: { appointments: InitialStateAppointments }) => state.appointments.providerAppointments);
  
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsList);

  useEffect(() => {
    const filteredAppointments = appointmentsList.filter(
      (appointment) => appointment.status === "BOOKED" || appointment.status === "RESCHEDULED"
    );
    setAppointments(filteredAppointments);
  }, [appointmentsList, dispatch]);

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleDelete = (appointment: Appointment) => {
    setDeletingAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    if (editingAppointment) {
      const { startTime, endTime } = editingAppointment;
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (end <= start) {
        setError('End time must be after start time.');
        return;
      }
      const differenceInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
      if (differenceInMinutes < 20 || differenceInMinutes > 40) {
        setError('The difference between start time and end time must be between 20 and 40 minutes.');
        return;
      }
      setError(null);
      dispatch(updateAppointment({ appointmentID: editingAppointment.appointmentID, patientProfile: editingAppointment.patientProfile, providerProfile: editingAppointment.providerProfile, startTime: editingAppointment.startTime, endTime: editingAppointment.endTime }));
      setEditingAppointment(null);
    }
  };

  const confirmDelete = () => {
    if (deletingAppointment) {
      dispatch(deleteAppointment({ id: deletingAppointment.appointmentID }));
    }
    setDeletingAppointment(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeletingAppointment(null);
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.appointmentsContainer}>
      <h1 style={{ textAlign: "center" }}>Appointments</h1>
      <div>
        <div style={{ backgroundColor: 'white', display: "inline", border: "1px solid black",borderRadius:"50%" }}>&nbsp;&nbsp;&nbsp;&nbsp;</div>&nbsp;&nbsp;<p style={{display:"inline",fontSize:"12px"}}>BOOKED</p> &nbsp;&nbsp;
        <div style={{ backgroundColor: '#cbf38c', display: "inline", border: "1px solid black" ,borderRadius:"50%"}}>&nbsp;&nbsp;&nbsp;&nbsp;</div>&nbsp;&nbsp;<p style={{display:"inline",fontSize:"12px"}}>RESCHEDULED</p> &nbsp;&nbsp;
      </div>
      <CustomSlider>
        {appointments.map((appointment) => (
          <div
            key={appointment.appointmentID}
            className={`${styles.appointmentCard} ${appointment.status === "RESCHEDULED" ? styles.rescheduled : ""}`}
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
            <div className={styles.buttonContainer}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(appointment)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(appointment)}
              >
                Cancel
              </button>
            </div>
            <Link href={`/userdetails/${appointment.patientProfile.user.userID}`}>
              View Details
            </Link>
          </div>
        ))}
      </CustomSlider>

      {editingAppointment && (
        <div className={styles.editForm}>
          <h2>Edit Appointment</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Start Time:
              <input
                type="datetime-local"
                value={editingAppointment.startTime.slice(0, 16)}
                onChange={(e) =>
                  setEditingAppointment({
                    ...editingAppointment,
                    startTime: e.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              End Time:
              <input
                type="datetime-local"
                value={editingAppointment.endTime.slice(0, 16)}
                onChange={(e) =>
                  setEditingAppointment({
                    ...editingAppointment,
                    endTime: e.target.value,
                  })
                }
                required
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditingAppointment(null)}>
              Cancel
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      {showDeleteModal && (
        <div className={styles.deleteModal}>
          <div className={styles.modalContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <button onClick={confirmDelete}>Yes, Cancel</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;

