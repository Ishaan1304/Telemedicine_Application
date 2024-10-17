import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { getRegisterPatientAPI, getRegisterProvierAPI } from "@/pages/api/api";

import {
  getRegisterPatient,
  getRegisterPatientError,
  getRegisterPatientSuccess,
  getRegisterProvider,
  getRegisterProviderError,
  getRegisterProviderSuccess,
} from "../slice/registerSlice";

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
  image:any | null;
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

interface ProviderProfileResponse {
  providerID: number;
  gender: string;
  specialty: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: UserFormData;
}

function* workRegisterPatient(action: PayloadAction<UserFormData>) {
  try {
    const response: PatientProfileResponse = yield call(
      getRegisterPatientAPI,
      action.payload
    );
    yield put(getRegisterPatientSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getRegisterPatientError({ message: "Try another email..." }));
    }
  }
}

function* workRegisterProvider(action: PayloadAction<UserFormData>) {
  try {
    const response: ProviderProfileResponse = yield call(
      getRegisterProvierAPI,
      action.payload
    );
    yield put(getRegisterProviderSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getRegisterProviderError({ message: "Try another email..." }));
    }
  }
}

export default function* registerSaga() {
  yield takeEvery(getRegisterPatient.type, workRegisterPatient);

  yield takeEvery(getRegisterProvider.type, workRegisterProvider);
}
