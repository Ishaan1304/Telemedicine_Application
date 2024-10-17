import { PrescriptionAdd } from "@/components/provider_home/Prescription/PrescriptionForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PrescriptionAddResponse } from "../saga/prescriptionSaga";

interface User {
  userID: number;
  firstName:string;
  lastName:string;
}
interface Provider {
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

export interface InitialStatePrescriptions {
  providers: Provider[];
  prescriptions: Prescription[];
  prescription:Prescription;

  prescriptionByAppointmentID: Prescription[];
}

const initialState: InitialStatePrescriptions = {
  providers: [],
  prescriptions: [],
  prescriptionByAppointmentID:[],
  prescription:{
    prescriptionId: 0,
    patientProfile: {
      patientID: 0,
      user:{
        userID:0,
        firstName:"",
        lastName:"",
      }
    },
    providerProfile: {
      providerID:0,
      user:{
        userID:0,
        firstName:"",
        lastName:"",
      }
    },
    appointment:{
      appointmentID:0,
    },
    medication: "",
    dosage: "",
    instructions: "",
    issuedAt:"",
  },
};

const Slice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    getPrescriptionByAppointmentID: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ id: number }>
    ) => {
    },
    getPrescriptionByAppointmentIDSuccess: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ data: Prescription[] }>
    ) => {
      state.prescriptionByAppointmentID = action.payload.data;
    },
    getPrescriptionByAppointmentIDError: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
      state.prescriptionByAppointmentID=[];
    },
    getPrescribedProviders: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ patientID: number }>
    ) => {
    },
    getPrescribedProvidersSuccess: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ data: Provider[] }>
    ) => {
      state.providers = action.payload.data;
    },
    getPrescribedProvidersError: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },
    getProviderPrescription: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ providerID:number, patientID:number }>
    ) => {},
    getProviderPrescriptionSuccess: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ data: Prescription[] }>
    ) => {
      state.prescriptions = action.payload.data;
    },
    getProviderPrescriptionError: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },
    addPrescription: (
      state: InitialStatePrescriptions,
      action: PayloadAction<PrescriptionAdd[]>
    ) => {
    },
    addPrescriptionSuccess: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ data:  PrescriptionAddResponse[] }>
    ) => {
      toast.success("successfully prescribed")
    },
    addPrescriptionError: (
      state: InitialStatePrescriptions,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },
  },
});

export const {
  getPrescribedProviders,
  getPrescribedProvidersSuccess,
  getPrescribedProvidersError,
  getProviderPrescription,
  getProviderPrescriptionSuccess,
  getProviderPrescriptionError,
  addPrescription,
  addPrescriptionSuccess,
  addPrescriptionError,
  getPrescriptionByAppointmentID,
  getPrescriptionByAppointmentIDError,
  getPrescriptionByAppointmentIDSuccess,
} = Slice.actions;
export default Slice.reducer;
