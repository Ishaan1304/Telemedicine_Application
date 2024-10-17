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

interface PatientUserDTO{
  content:{patientProfile:Patient;userPic:string;}[];
  totalElements:number;
}

export interface InitialStatePatients {
  patients: Patient[];
  providerTotalPatients: number;
  providerTodaysPatients: number;
  providerPatients:Patient[];


  adminPatients:{patientProfile:Patient;userPic:string;}[];
  adminPatientsNumber:number;


  adminPatientNumberBox:number;
  
}

const initialState: InitialStatePatients = {
  patients: [],
  providerTotalPatients: 0,
  providerTodaysPatients: 0,
  providerPatients:[],
  adminPatients:[],
  adminPatientsNumber:0,

  adminPatientNumberBox:0,
};

const Slice = createSlice({
  name: "patients",
  initialState,
  reducers: {


    getAdminPatientsBox: (state: InitialStatePatients) => {},
    getAdminPatientsBoxSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<number>
    ) => {
      state.adminPatientNumberBox=action.payload;
    },
    getAdminPatientsBoxError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
      state.adminPatientNumberBox=0;
    },

    updateAdminPatients: (state: InitialStatePatients,action:PayloadAction<{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}>) => {},
    updateAdminPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<Patient>
    ) => {
      state.adminPatients.map((obj)=>{
        if(obj.patientProfile.user.userID===action.payload.user.userID)
        {
          obj.patientProfile.user.firstName=action.payload.user.firstName;
          obj.patientProfile.user.lastName=action.payload.user.lastName;
          obj.patientProfile.user.phone=action.payload.user.phone;
          obj.patientProfile.user.cityName=action.payload.user.cityName;
          obj.patientProfile.user.stateName=action.payload.user.stateName;
          obj.patientProfile.user.countryName=action.payload.user.countryName;      
        }
      });
      toast.success("Successfully Updated");
    },
    updateAdminPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    deleteAdminPatients: (state: InitialStatePatients,action:PayloadAction<number>) => {},
    deleteAdminPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<User>
    ) => {
      state.adminPatients = state.adminPatients.filter((obj)=>{
        if(obj.patientProfile.user.userID==action.payload.userID)
        {
          return false;
        }
        return true;
      })
      toast.success("Deleted successfully");
    },
    deleteAdminPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },


    getAdminPatients: (state: InitialStatePatients,action:PayloadAction<{name:string;cityName:string;dateOfBirth:string;page:number;size:number;}>) => {},
    getAdminPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<PatientUserDTO>
    ) => {
      state.adminPatients = action.payload.content;
      state.adminPatientsNumber=action.payload.totalElements;
    },
    getAdminPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

  
    getProviderTotalPatients: (state: InitialStatePatients,action:PayloadAction<{id:number}>) => {},
    getProviderTotalPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<number>
    ) => {
      state.providerTotalPatients = action.payload;
    },
    getProviderTotalPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    getProviderTodaysPatients: (state: InitialStatePatients,action:PayloadAction<{id:number}>) => {},
    getProviderTodaysPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<number>
    ) => {
      state.providerTodaysPatients = action.payload;
    },
    getProviderTodaysPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    getPatients: (state: InitialStatePatients) => {},
    getPatientsSuccess: (
      state: InitialStatePatients,
      action: PayloadAction<{ data: Patient[] }>
    ) => {
      state.patients = action.payload.data;
    },
    getPatientsError: (
      state: InitialStatePatients,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },
  },
});

export const {
  getProviderTodaysPatients,
  getProviderTodaysPatientsSuccess,
  getProviderTodaysPatientsError,
  getProviderTotalPatients,
  getProviderTotalPatientsSuccess,
  getProviderTotalPatientsError,
  getPatients,
  getPatientsSuccess,
  getPatientsError,
  getAdminPatients,
  getAdminPatientsSuccess,
  getAdminPatientsError,
  updateAdminPatients,
  updateAdminPatientsSuccess,
  updateAdminPatientsError,
  deleteAdminPatients,
  deleteAdminPatientsSuccess,
  deleteAdminPatientsError,
  getAdminPatientsBox,
  getAdminPatientsBoxSuccess,
  getAdminPatientsBoxError,
} = Slice.actions;
export default Slice.reducer;
