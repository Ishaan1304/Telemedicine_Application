import React, { useEffect, useState } from 'react';
import styles from './PatientUserManagement.module.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { deleteUser, getAllUsers, InitialStateUsers, updateUser } from '@/redux/slice/usersSlice';

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

const PatientUserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector(
    (state: { users: InitialStateUsers }) => state.users.users
  );

  const [patientList, setPatientList] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setPatientList(allUsers.filter(user => user.role === 'PATIENT'));
  }, [allUsers]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdate = (updatedUser: User) => {
    dispatch(updateUser(updatedUser))
  };

  const handleDelete = (userID: number) => {
    dispatch(deleteUser(userID));
    setPatientList(patientList.filter(user => user.userID !== userID));
    setShowDeleteModal(false);
  };

  const filteredUsers = patientList.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
      />
      <div className={styles.tableContainer}>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.userID} className={styles.tableRow}>
                <td>{user.userID}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUpdateModal(true);
                    }}
                    className={styles.updateButton}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setUserToDelete(user.userID);
                      setShowDeleteModal(true);
                    }}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUpdateModal && selectedUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Update User</h2>
            <input
              name="firstName"
              value={selectedUser.firstName}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                firstName: e.target.value
              })}
              placeholder="First Name"
            />
            <input
              name="lastName"
              value={selectedUser.lastName}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                lastName: e.target.value
              })}
              placeholder="Last Name"
            />
            <input
              name="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                email: e.target.value
              })}
              placeholder="Email"
              disabled
            />
            <input
              name="phone"
              type='number'
              value={selectedUser.phone}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                phone: e.target.value
              })}
              placeholder="Phone No."
            />
            <input
              name="countryName"
              value={selectedUser.countryName}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                countryName: e.target.value
              })}
              placeholder="Country Name"
            />
            <input
              name="stateName"
              value={selectedUser.stateName}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                stateName: e.target.value
              })}
              placeholder="State Name"
            />
            <input
              name="cityName"
              value={selectedUser.cityName}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                cityName: e.target.value
              })}
              placeholder="City Name"
            />
            <input
              name="address"
              value={selectedUser.address}
              onChange={(e) => setSelectedUser({
                ...selectedUser,
                address: e.target.value
              })}
              placeholder="Address"
            />
            <button onClick={() => {
              if (selectedUser) {
                handleUpdate(selectedUser);
                setShowUpdateModal(false);
              }
            }} className={styles.updateButton}>Save</button>
            <button onClick={() => setShowUpdateModal(false)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}

      {showDeleteModal && userToDelete !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={() => {
              if (userToDelete !== null) {
                handleDelete(userToDelete);
                setShowDeleteModal(false);
              }
            }} className={styles.deleteButton}>Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)} className={styles.closeButton}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientUserManagement;
