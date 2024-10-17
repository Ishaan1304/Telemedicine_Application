import { call, put, takeEvery } from "redux-saga/effects";
import { getAppointments, getAppointmentsError, getAppointmentsSuccess } from "../slice/appointmentsSlice";
import { getPatientProfileAPI, getUpcomingAppointments, updatePatientProfileAPI } from "@/pages/api/api";
import { getPatientProfile, getPatientProfileError, getPatientProfileSuccess, updateProfile, updateProfileError, updateProfileSuccess } from "../slice/patientProfileSlice";
import { PayloadAction } from "@reduxjs/toolkit";

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
interface PatientProfileResponse
{
    patientID:number;
    dateOfBirth:string;
    gender:string;
    medicalHistory:string;
    allergies:string;
    medications:string;
    user:User
}


function* workPatientProfileUser(action: PayloadAction<{id:number}>) {
  try {
    const response: PatientProfileResponse = yield call(getPatientProfileAPI,action.payload);
    yield put(getPatientProfileSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getPatientProfileError({ message: "Unable to get Providers" }));
    }
  }
}


function* workUpdateProfile(action: PayloadAction<{
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
}>) {
  try {
    const response: PatientProfileResponse = yield call(updatePatientProfileAPI,action.payload);
    yield put(updateProfileSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateProfileError({ message: "Unable to get Providers" }));
    }
  }
}

export default function* patientProfileSaga() {
  yield takeEvery(getPatientProfile.type, workPatientProfileUser);
  yield takeEvery(updateProfile.type, workUpdateProfile);
}
