import React, { useEffect, useState } from "react";
import styles from "./PendingAppointmentManagement.module.css";
import {
  deleteAppointment,
  getAllUpcomingAppointments,
  InitialStateAppointments,
  updateAppointment,
} from "@/redux/slice/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

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

const PendingAppointmentManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const allUpcomingAppointmentList = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.allUpcomingAppointments
  );


  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [deletingAppointment, setDeletingAppointment] =
    useState<Appointment | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (allUpcomingAppointmentList) {
      setAppointments(allUpcomingAppointmentList);
      setLoading(false);
    } else {
      setLoading(false);
      setError("Failed to load appointments.");
    }
  }, [allUpcomingAppointmentList]);

  useEffect(() => {
    if (allUpcomingAppointmentList.length === 0) {
      dispatch(getAllUpcomingAppointments());
    }
  }, [allUpcomingAppointmentList]);

  

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (appointment.status === "BOOKED" ||
        appointment.status === "RESCHEDULED") &&
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
      dispatch(deleteAppointment({id:deletingAppointment.appointmentID}))
    }
    setEditingAppointment(null);
    setDeletingAppointment(null);
    setShowDeleteModal(false);
    window.location.reload();
  };

  const cancelDelete = () => {
    setEditingAppointment(null);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <h1 className={styles.header}>Pending Appointments</h1>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by patient first name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className={styles.container}>
          {loading && <p className={styles.loading}>Loading...</p>}
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.appointmentID}
              className={`${styles.card} ${getStatusClass(appointment.status)}`}
            >
              <h3>{`${appointment.patientProfile.user.firstName} ${appointment.patientProfile.user.lastName}`}</h3>
              <p>
                <strong>Provider:</strong>{" "}
                {`${appointment.providerProfile.user.firstName} ${appointment.providerProfile.user.lastName}`}
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
              <div className={styles.buttonContainer}>
                <button className={styles.updateButton}  onClick={() => handleEdit(appointment)}>Update</button>
                <button className={styles.cancelButton}  onClick={() => handleDelete(appointment)}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
        {editingAppointment && (
          <div className={styles.editForm}>
            <h2>Edit Appointment</h2>
            <form onSubmit={handleUpdate}>
              <label>
                Start Time:
                <input
                  type="datetime-local"
                  value={editingAppointment.startTime.slice(0, 16)}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, startTime: e.target.value })}
                  required
                />
              </label>
              <label>
                End Time:
                <input
                  type="datetime-local"
                  value={editingAppointment.endTime.slice(0, 16)}
                  onChange={(e) => setEditingAppointment({ ...editingAppointment, endTime: e.target.value })}
                  required
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditingAppointment(null)}>Cancel</button>
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
    </>
  );
};

export default PendingAppointmentManagement;
