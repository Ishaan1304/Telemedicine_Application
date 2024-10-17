import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { UserPaginationProviderResponse } from "../saga/providersSaga";
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

interface ProviderUserDTO {
  content: { providerProfile: Provider; userPic: string }[];
  totalElements: number;
}

export interface ProviderPage {
  providerProfile: Provider;
  userPic: string;
}
export interface InitialStateProviders {
  providers: Provider[];
  providerList: ProviderPage[];
  totalElements: number;

  adminProviders: { providerProfile: Provider; userPic: string }[];
  adminProvidersNumber: number;

  adminProviderNumberBox:number;
}

const initialState: InitialStateProviders = {
  providers: [],
  providerList: [],
  totalElements: 0,

  adminProviders: [],
  adminProvidersNumber: 0,

  adminProviderNumberBox:0,
};

const Slice = createSlice({
  name: "providers",
  initialState,
  reducers: {

    getAdminProvidersBox: (state: InitialStateProviders) => {},
    getAdminProvidersBoxSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<number>
    ) => {
      state.adminProviderNumberBox=action.payload;
    },
    getAdminProvidersBoxError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
      state.adminProviderNumberBox=0;
    },


    updateAdminProviders: (state: InitialStateProviders,action:PayloadAction<{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}>) => {},
    updateAdminProvidersSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<Provider>
    ) => {
      state.adminProviders.map((obj)=>{
        if(obj.providerProfile.user.userID===action.payload.user.userID)
        {
          obj.providerProfile.user.firstName=action.payload.user.firstName;
          obj.providerProfile.user.lastName=action.payload.user.lastName;
          obj.providerProfile.user.phone=action.payload.user.phone;
          obj.providerProfile.user.cityName=action.payload.user.cityName;
          obj.providerProfile.user.stateName=action.payload.user.stateName;
          obj.providerProfile.user.countryName=action.payload.user.countryName;      
        }
      });
      toast.success("Successfully Updated");
    },
    updateAdminProvidersError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },


    deleteAdminProviders: (state: InitialStateProviders,action:PayloadAction<number>) => {},
    deleteAdminProvidersSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<User>
    ) => {
      state.adminProviders = state.adminProviders.filter((obj)=>{
        if(obj.providerProfile.user.userID==action.payload.userID)
        {
          return false;
        }
        return true;
      })
      toast.success("Deleted successfully");
    },
    deleteAdminProvidersError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },


    getAdminProviders: (
      state: InitialStateProviders,
      action: PayloadAction<{
        name: string;
        cityName: string;
        page: number;
        size: number;
      }>
    ) => {},
    getAdminProvidersSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<ProviderUserDTO>
    ) => {
      state.adminProviders = action.payload.content;
      state.adminProvidersNumber = action.payload.totalElements;
    },
    getAdminProvidersError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    getProviders: (state: InitialStateProviders) => {},
    getProvidersSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<{ data: Provider[] }>
    ) => {
      state.providers = action.payload.data;
    },
    getProvidersError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      state.providers = [];
    },

    getProviderList: (
      state: InitialStateProviders,
      action: PayloadAction<{
        page: number;
        rowsPerPage: number;
        search: string;
        disease: string;
        gender: string;
        cityName: string;
        speciality: string;
      }>
    ) => {
     
    },
    getProviderListSuccess: (
      state: InitialStateProviders,
      action: PayloadAction<UserPaginationProviderResponse>
    ) => {
      state.providerList = action.payload.content;
      state.totalElements = action.payload.totalElements;
    },
    getProviderListError: (
      state: InitialStateProviders,
      action: PayloadAction<{ message: string }>
    ) => {
      state.providerList = [];
    },
  },
});

export const {
  getProviders,
  getProvidersSuccess,
  getProvidersError,
  getProviderList,
  getProviderListSuccess,
  getProviderListError,
  getAdminProviders,
  getAdminProvidersSuccess,
  getAdminProvidersError,
  updateAdminProviders,
  updateAdminProvidersSuccess,
  updateAdminProvidersError,
  deleteAdminProviders,
  deleteAdminProvidersSuccess,
  deleteAdminProvidersError,
  getAdminProvidersBox,
  getAdminProvidersBoxSuccess,
  getAdminProvidersBoxError,
} = Slice.actions;
export default Slice.reducer;
