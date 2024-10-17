import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export interface InitialStateProviderProfile {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}

const initialState: InitialStateProviderProfile = {
  providerID: 0,
  specialty: "",
  gender: "",
  qualifications: "",
  consultationFee: 0,
  availableFrom: "",
  availableTo: "",
  user:{
    userID:0,
    firstName:"",
    lastName:"",
    email:"",
    username:"",
    password:"",
    role:"",
    phone:"",
    countryName:"",
    stateName:"",
    cityName:"",
    address:"",
}
};

const Slice = createSlice({
  name: "providerProfile",
  initialState,
  reducers: {
    getProviderProfile: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ id: number }>
    ) => {},
    getProviderProfileSuccess: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ data: InitialStateProviderProfile }>
    ) => {
      state.availableFrom = action.payload.data.availableFrom;
      state.availableTo = action.payload.data.availableTo;
      state.gender = action.payload.data.gender;
      state.consultationFee = action.payload.data.consultationFee;
      state.providerID = action.payload.data.providerID;
      state.qualifications= action.payload.data.qualifications;
      state.specialty=action.payload.data.specialty
      state.user = action.payload.data.user;
    },
    getProviderProfileError: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("3");
    },




    updateProfile: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ 
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
      
      }>
    ) => {},
    updateProfileSuccess: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ data: InitialStateProviderProfile }>
    ) => {
      state.availableFrom = action.payload.data.availableFrom;
      state.availableTo = action.payload.data.availableTo;
      state.gender = action.payload.data.gender;
      state.consultationFee = action.payload.data.consultationFee;
      state.providerID = action.payload.data.providerID;
      state.qualifications= action.payload.data.qualifications;
      state.specialty=action.payload.data.specialty
      state.user = action.payload.data.user;
    },
    updateProfileError: (
      state: InitialStateProviderProfile,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("3");
    },
  },
});

export const {
    getProviderProfile,
    getProviderProfileSuccess,
    getProviderProfileError,
    updateProfile,
    updateProfileSuccess,
    updateProfileError,
} = Slice.actions;
export default Slice.reducer;
