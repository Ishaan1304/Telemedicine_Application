import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./Dashboard.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  deleteAppointment,
  getAllAppointments,
  getAllUpcomingAppointments,
  InitialStateAppointments,
  updateAppointment,
} from "@/redux/slice/appointmentsSlice";
import { getAllUsers, InitialStateUsers } from "@/redux/slice/usersSlice";
import CustomSlider from "@/components/Common/Slider/CustomSlider";
import ReportsAndAnalysis from "./ReportsAndAnalysis/ReportsAndAnalysis";

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: string;
}
interface Appointment {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
  status: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const appointmentsList = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.allAppointments
  );

  const allUpcomingAppointmentList = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.allUpcomingAppointments
  );

  const allUsers = useAppSelector(
    (state: { users: InitialStateUsers }) => state.users.users
  );

  const [userPatients, setUserPatients] = useState<User[]>([]);
  const [userProviders, setUserProviders] = useState<User[]>([]);
  const [pendingAppointmentNumber, setPendingAppointmentNumber] =
    useState<number>(0);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
    const [deletingAppointment, setDeletingAppointment] =
    useState<Appointment | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(getAllUsers());
    dispatch(getAllUpcomingAppointments());
  }, [dispatch]);

  useEffect(() => {
    setUserPatients(allUsers.filter((user) => user.role === "PATIENT"));
    setUserProviders(allUsers.filter((user) => user.role === "PROVIDER"));
    setPendingAppointmentNumber(
      allUpcomingAppointmentList.filter(
        (appointment) => appointment.status !== "CANCELLED"
      ).length
    );
  }, [allUsers, allUpcomingAppointmentList]);

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
  };

  const handleDelete = (appointment: Appointment) => {
    setDeletingAppointment(appointment);
    setShowDeleteModal(true);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingAppointment) {
      const { startTime, endTime } = editingAppointment;
      const start = new Date(startTime);
      const end = new Date(endTime);
      if (end <= start) {
        setError("End time must be after start time.");
        return;
      }
      const differenceInMinutes =
        (end.getTime() - start.getTime()) / (1000 * 60);
      if (differenceInMinutes < 20 || differenceInMinutes > 40) {
        setError(
          "The difference between start time and end time must be between 20 and 40 minutes."
        );
        return;
      }
      setError(null);
      await dispatch(
        updateAppointment({
          appointmentID: editingAppointment.appointmentID,
          patientProfile: editingAppointment.patientProfile,
          providerProfile: editingAppointment.providerProfile,
          startTime: editingAppointment.startTime,
          endTime: editingAppointment.endTime,
        })
      );
      setEditingAppointment(null);
    }
  };

  const confirmDelete = async () => {
    if (deletingAppointment) {
      await dispatch(
        deleteAppointment({ id: deletingAppointment.appointmentID })
      );
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

  function createUserMap(users: User[]): Map<string, User[]> {
    const userMap = new Map<string, User[]>();
    for (const user of users) {
      const key = `${user.stateName}-${user.cityName}`;
      if (userMap.has(key)) {
        const existingUsers = userMap.get(key);
        if (existingUsers) {
          existingUsers.push(user);
        }
      } else {
        userMap.set(key, [user]);
      }
    }
    return userMap;
  }

  const [userMap,setUserMap]=useState<any>();

  useEffect(()=>{
    if(userPatients.length!==0) {
      let map=createUserMap(userPatients);
      setUserMap(map);
    }
    
  },[userPatients])

  return (
    <div className={styles.layout}>
      <div className={styles.header}>Admin Dashboard</div>
      <div className={styles.content}>
        <div className={styles.cards}>
          <div
            className={styles.card}
            onClick={() => router.push("/admin/appointments")}
          >
            <h3>Total Appointments</h3>
            <p className={styles.cardValue}>{appointmentsList.length}</p>
          </div>
          <div
            className={styles.card}
            onClick={() => router.push("/admin/providers")}
          >
            <h3>Registered Providers</h3>
            <p className={styles.cardValue}>{userProviders.length}</p>
          </div>
          <div
            className={styles.card}
            onClick={() => router.push("/admin/patients")}
          >
            <h3>Registered Patients</h3>
            <p className={styles.cardValue}>{userPatients.length}</p>
          </div>
          <div
            className={styles.card}
            onClick={() => router.push("/admin/pending")}
          >
            <h3>Pending Appointments</h3>
            <p className={styles.cardValue}>{pendingAppointmentNumber}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div
            style={{
              backgroundColor: "white",
              display: "inline",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          &nbsp;&nbsp;
          <p style={{ display: "inline", fontSize: "12px" }}>BOOKED</p>{" "}
          &nbsp;&nbsp;
          <div
            style={{
              backgroundColor: "#cbf38c",
              display: "inline",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          &nbsp;&nbsp;
          <p style={{ display: "inline", fontSize: "12px" }}>RESCHEDULED</p>{" "}
          &nbsp;&nbsp;
          <div
            style={{
              backgroundColor: "#FC9898",
              display: "inline",
              border: "1px solid black",
              borderRadius: "50%",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          &nbsp;&nbsp;
          <p style={{ display: "inline", fontSize: "12px" }}>CANCELLED</p>
        </div>
        <CustomSlider>
          {allUpcomingAppointmentList.map((appointment) => (
            <div
              key={appointment.appointmentID}
              className={`${styles.appointmentCard} ${
                appointment.status === "RESCHEDULED"
                  ? styles.rescheduled
                  : appointment.status === "CANCELLED"
                  ? styles.cancelled
                  : ""
              }`}
            >
              <h3 className={styles.appointmentTitle}>Appointment</h3>
              <p>
                <strong>Patient:</strong>{" "}
                {appointment.patientProfile.user.firstName}{" "}
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
              <div className={styles.buttonContainer}>
                {appointment.status !== "CANCELLED" && (
                  <>
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
                  </>
                )}
              </div>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
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
      <ReportsAndAnalysis userMap={userMap} />
    </div>
  );
};

export default Dashboard;
