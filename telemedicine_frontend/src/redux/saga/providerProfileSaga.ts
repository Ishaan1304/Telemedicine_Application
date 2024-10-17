import { call, put, takeEvery } from "redux-saga/effects";
import { getAppointments, getAppointmentsError, getAppointmentsSuccess } from "../slice/appointmentsSlice";
import { getPatientProfileAPI, getProviderProfileAPI, getUpcomingAppointments, updateProfileAPI } from "@/pages/api/api";
import { getPatientProfile, getPatientProfileSuccess } from "../slice/patientProfileSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getProviderProfile, getProviderProfileError, getProviderProfileSuccess, updateProfile, updateProfileError, updateProfileSuccess } from "../slice/providerProfileSlice";

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
  
  export interface ProviderProfileResponse {
    providerID: number;
    specialty: string;
    gender: string;
    qualifications: string;
    consultationFee: number;
    availableFrom: string;
    availableTo: string;
    user: User;
  }


function* workProviderProfileUser(action: PayloadAction<{id:number}>) {
  try {
    const response: ProviderProfileResponse = yield call(getProviderProfileAPI,action.payload);
    yield put(getProviderProfileSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getProviderProfileError({ message: "Unable to get Providers" }));
    }
  }
}

function* workUpdateProfile(action: PayloadAction<{ 
  user:
    { 
      userID:number;
      firstName:string;
      lastName:string;
      phone:string;
      address:string;
      cityName:string;
      stateName:string;
      countryName:string;
    },
  providerID:number;
  gender:string;
  availableFrom:string;
  availableTo:string;
  consultationFee:number;
  specialty:string;
  qualifications:string;

}>) {
  try {
    const response: ProviderProfileResponse = yield call(updateProfileAPI,action.payload);
    yield put(updateProfileSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateProfileError({ message: "Unable to get Providers" }));
    }
  }
}

export default function* providerProfileSaga() {
  yield takeEvery(getProviderProfile.type, workProviderProfileUser);
  yield takeEvery(updateProfile.type, workUpdateProfile);
}
