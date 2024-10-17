import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
  gender: string;
  image:any|null;
}
interface Patient {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
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

export interface InitialStateRegister {
  patient: Patient;
  provider: Provider;
  errMess: string | null;
}

const initialState: InitialStateRegister = {
  patient: {
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
      gender: "",
      image:null,
    },
  },
  provider: {
    providerID: 0,
    specialty: "",
    gender: "",
    qualifications: "",
    consultationFee: 0,
    availableFrom: "",
    availableTo: "",
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
      gender: "",
      image:null,
    },
  },
  errMess: null,
};

const Slice = createSlice({
  name: "register",
  initialState,
  reducers: {
    getRegisterPatient: (
      state: InitialStateRegister,
      action: PayloadAction<User>
    ) => {},
    getRegisterPatientSuccess: (
      state: InitialStateRegister,
      action: PayloadAction<{ data: Patient }>
    ) => {
      
      state.patient = action.payload.data;
      state.errMess="Success Register"
      toast.success("Successfully Registered")
    },
    getRegisterPatientError: (
      state: InitialStateRegister,
      action: PayloadAction<{ message: string }>
    ) => {
     
      state.errMess=action.payload.message;
      toast.error(action.payload.message);
    },
    resetErrMess: (state: InitialStateRegister) => {
      state.errMess = null;
    },

    getRegisterProvider: (
      state: InitialStateRegister,
      action: PayloadAction<User>
    ) => {},
    getRegisterProviderSuccess: (
      state: InitialStateRegister,
      action: PayloadAction<{ data: Provider }>
    ) => {
     
      state.provider = action.payload.data;
      state.errMess="Success Register"
      toast.success("Successfully Registered")
    },
    getRegisterProviderError: (
      state: InitialStateRegister,
      action: PayloadAction<{ message: string }>
    ) => {
      state.errMess="Error Register"
      // alert("something went wrong");
      state.errMess=action.payload.message;
      toast.error(action.payload.message);
    },
  },
});

export const {
  getRegisterPatient,
  getRegisterPatientSuccess,
  getRegisterPatientError,

  getRegisterProvider,
  getRegisterProviderSuccess,
  getRegisterProviderError,
  resetErrMess,
} = Slice.actions;
export default Slice.reducer;
