import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { deleteUserAPI, getAdminPatientsAPI, getAdminPatientsBoxAPI, getPatientsAPI, getProviderTodaysPatientsAPI, getProviderTotalPatientsAPI, updateAdminPatientsAPI } from "@/pages/api/api";

import {
  getRegisterPatient,
  getRegisterPatientError,
  getRegisterPatientSuccess,
  getRegisterProvider,
  getRegisterProviderError,
  getRegisterProviderSuccess,
} from "../slice/registerSlice";
import { deleteAdminPatients, deleteAdminPatientsError, deleteAdminPatientsSuccess, getAdminPatients, getAdminPatientsBox, getAdminPatientsBoxError, getAdminPatientsBoxSuccess, getAdminPatientsError, getAdminPatientsSuccess, getPatients, getPatientsError, getPatientsSuccess, getProviderTodaysPatients, getProviderTodaysPatientsError, getProviderTodaysPatientsSuccess, getProviderTotalPatients, getProviderTotalPatientsError, getProviderTotalPatientsSuccess, updateAdminPatients, updateAdminPatientsError, updateAdminPatientsSuccess } from "../slice/patientsSlice";

export interface UserFormData {
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
  gender: string;
}


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

interface PatientProfileResponse {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: UserFormData;
}



function* workGetAllPatients() {
  try {
    const response: PatientProfileResponse[] = yield call(
      getPatientsAPI
    );
    yield put(getPatientsSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getPatientsError({ message: "Unable to get Profile" }));
    }
  }
}


function* workProviderTotalPatients(action: PayloadAction<{id:number}>) {
  try {
    const response: number= yield call(
      getProviderTotalPatientsAPI,action.payload
    );
    yield put(getProviderTotalPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getProviderTotalPatientsError({ message: "Unable to get count" }));
    }
  }
}

function* workProviderTodaysPatients(action: PayloadAction<{id:number}>) {
  try {
    const response: number= yield call(
      getProviderTodaysPatientsAPI,action.payload
    );
    yield put(getProviderTodaysPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getProviderTodaysPatientsError({ message: "Unable to get count" }));
    }
  }
}

interface PatientUserDTO{
  content:{patientProfile:PatientProfileResponse;userPic:string;}[];
  totalElements:number;
}

function* workGetAdminPatients(action: PayloadAction<{name:string;cityName:string;dateOfBirth:string;page:number;size:number;}>) {
  try {
    const response: PatientUserDTO= yield call(
      getAdminPatientsAPI,action.payload
    );
    yield put(getAdminPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminPatientsError({ message: "Unable to get count" }));
    }
  }
}


function* workUpdateAdminPatients(action: PayloadAction<{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}>) {
  try {
    const response: PatientProfileResponse= yield call(
      updateAdminPatientsAPI,action.payload
    );
    yield put(updateAdminPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateAdminPatientsError({ message: "Unable to get count" }));
    }
  }
}


function* workDeleteAdminPatients(action: PayloadAction<number>) {
  try {
    const response: User= yield call(
      deleteUserAPI,action.payload
    );
    yield put(deleteAdminPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteAdminPatientsError({ message: "Unable to get count" }));
    }
  }
}


function* workGetAdminPatientsBox() {
  try {
    const response: number= yield call(getAdminPatientsBoxAPI);
    yield put(getAdminPatientsBoxSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminPatientsBoxError({ message: "Unable to get count" }));
    }
  }
}

export default function* patientsSaga() {
  yield takeEvery(getPatients.type, workGetAllPatients);
  yield takeEvery(getProviderTotalPatients.type, workProviderTotalPatients);
  yield takeEvery(getProviderTodaysPatients.type, workProviderTodaysPatients);
  yield takeEvery(getAdminPatients.type, workGetAdminPatients);
  yield takeEvery(updateAdminPatients.type, workUpdateAdminPatients);
  yield takeEvery(deleteAdminPatients.type, workDeleteAdminPatients);

  yield takeEvery(getAdminPatientsBox.type, workGetAdminPatientsBox);
}

