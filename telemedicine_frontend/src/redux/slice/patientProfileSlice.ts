import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

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

export interface InitialStatePatientProfile {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
}

const initialState: InitialStatePatientProfile = {
  patientID: 0,
  dateOfBirth: "",
  gender: "",
  medicalHistory: "",
  allergies: "",
  medications: "",
  user: {
    userID: 0,
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    role: "",
    phone: "",
    countryName: "",
    stateName: "",
    cityName: "",
    address: "",
  },
};

const Slice = createSlice({
  name: "patientProfile",
  initialState,
  reducers: {
    getPatientProfile: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{ id: number }>
    ) => {},
    getPatientProfileSuccess: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{ data: InitialStatePatientProfile }>
    ) => {
      state.allergies = action.payload.data.allergies;
      state.dateOfBirth = action.payload.data.dateOfBirth;
      state.gender = action.payload.data.gender;
      state.medicalHistory = action.payload.data.medicalHistory;
      state.medications = action.payload.data.medications;
      state.patientID = action.payload.data.patientID;
      state.user = action.payload.data.user;
    },
    getPatientProfileError: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("3");
    },

    updateProfile: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{
        user: {
          userID: number;
          firstName: string;
          lastName: string;
          phone: string;
          address: string;
          cityName: string;
          stateName: string;
          countryName: string;
        };
        patientID: number;
        gender: string;
        dateOfBirth: string;
        medicalHistory: string;
        allergies: string;
        medications: string;
      }>
    ) => {},
    updateProfileSuccess: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{ data: InitialStatePatientProfile }>
    ) => {
      state.allergies = action.payload.data.allergies;
      state.dateOfBirth = action.payload.data.dateOfBirth;
      state.gender = action.payload.data.gender;
      state.medicalHistory = action.payload.data.medicalHistory;
      state.medications = action.payload.data.medications;
      state.patientID = action.payload.data.patientID;
      state.user = action.payload.data.user;
    },
    updateProfileError: (
      state: InitialStatePatientProfile,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("3");
    },
  },
});

export const {
  getPatientProfile,
  getPatientProfileSuccess,
  getPatientProfileError,
  updateProfile,
  updateProfileSuccess,
  updateProfileError,
} = Slice.actions;
export default Slice.reducer;
