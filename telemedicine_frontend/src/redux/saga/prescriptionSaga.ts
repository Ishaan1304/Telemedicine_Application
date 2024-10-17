import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loginError, loginSuccessful, loginUser } from "../slice/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  addPrescriptionAPI,
  apiLogin,
  getPrescribedProvidersAPI,
  getPrescriptionByAppointmentIDAPI,
  getProviderPrescriptionAPI,
  getUserProfile,
} from "@/pages/api/api";
import {
  getProfile,
  getProfileError,
  getProfileSuccess,
} from "../slice/profileSlice";
import {
  addPrescription,
  addPrescriptionError,
  addPrescriptionSuccess,
  getPrescribedProviders,
  getPrescribedProvidersError,
  getPrescribedProvidersSuccess,
  getPrescriptionByAppointmentID,
  getPrescriptionByAppointmentIDError,
  getPrescriptionByAppointmentIDSuccess,
  getProviderPrescription,
  getProviderPrescriptionSuccess,
} from "../slice/prescriptionSlice";
import { PrescriptionAdd } from "@/components/provider_home/Prescription/PrescriptionForm";

interface User {
  userID: number;
  firstName: string;
  lastName: string;
}

interface ProviderResponse {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}

interface Prescription {
  prescriptionId: number;
  patientProfile: {
    patientID: number;
    user:User;
  };
  providerProfile: {
    providerID: number;
    user:User;
  };
  appointment:{
    appointmentID:number;
  },
  medication: string;
  dosage: string;
  instructions: string;
  issuedAt: string;
}

function* workPrescribedProviders(action: PayloadAction<{ patientID: number }>) {
  try {
    const response: ProviderResponse[] = yield call(
      getPrescribedProvidersAPI,
      action.payload
    );
    yield put(getPrescribedProvidersSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getPrescribedProvidersError({ message: "Unable to get Profile" })
      );
    }
  }
}

function* workProviderPrescription(action: PayloadAction<{ providerID:number, patientID:number }>) {
  try {
    const response: Prescription[] = yield call(
      getProviderPrescriptionAPI,
      action.payload
    );
    yield put(getProviderPrescriptionSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getPrescribedProvidersError({ message: "Unable to get Profile" })
      );
    }
  }
}


export interface PrescriptionAddResponse {
  prescriptionId:number;
  patientProfile:any
  providerProfile:any
  appointment:any;
  documentName:string;
  medication: string;
  dosage: string;
  instructions: string;
  issuedAt: string;
}


function* workAddPrescription(action: PayloadAction<PrescriptionAdd[]>) {
  try {
   
    const response:PrescriptionAddResponse[]= yield call(
      addPrescriptionAPI,
      action.payload
    );
    
    yield put(addPrescriptionSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        addPrescriptionError({ message: "Unable to get Profile" })
      );
    }
  }
}


function* workGetPrescriptionByAppointmentID(action: PayloadAction<{ id:number }>) {
  try {
    const response: Prescription[] = yield call(
      getPrescriptionByAppointmentIDAPI,
      action.payload
    );
    yield put(getPrescriptionByAppointmentIDSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getPrescriptionByAppointmentIDError({ message: "Unable to get Profile" })
      );
    }
  }
}


export default function* prescriptionSaga() {
  yield takeEvery(getPrescribedProviders.type, workPrescribedProviders);
  yield takeEvery(getProviderPrescription.type, workProviderPrescription);
  yield takeEvery(addPrescription.type, workAddPrescription);
  yield takeEvery(getPrescriptionByAppointmentID.type, workGetPrescriptionByAppointmentID);
}
