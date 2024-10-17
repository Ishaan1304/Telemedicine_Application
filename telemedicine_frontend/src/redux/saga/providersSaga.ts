import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loginError, loginSuccessful, loginUser } from "../slice/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  apiLogin,
  deleteUserAPI,
  getAdminProvidersAPI,
  getAdminProvidersBoxAPI,
  getProviderListAPI,
  getProvidersProfileAPI,
  getUserProfile,
  updateAdminProvidersAPI,
} from "@/pages/api/api";
import {
  deleteAdminProviders,
  deleteAdminProvidersError,
  deleteAdminProvidersSuccess,
  getAdminProviders,
  getAdminProvidersBox,
  getAdminProvidersBoxError,
  getAdminProvidersBoxSuccess,
  getAdminProvidersError,
  getAdminProvidersSuccess,
  getProviderList,
  getProviderListError,
  getProviderListSuccess,
  getProviders,
  getProvidersError,
  getProvidersSuccess,
  updateAdminProviders,
  updateAdminProvidersError,
  updateAdminProvidersSuccess,
} from "../slice/providersSlice";
import { ProviderProfileResponse } from "./providerProfileSaga";

export interface User {
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
interface UserProviderResponse {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}


interface UserProviderResponsePage {
  providerProfile: UserProviderResponse;
  userPic: string;
}

export interface UserPaginationProviderResponse {
  content: UserProviderResponsePage[];
  totalElements: number;
}





function* workProvidersUser() {
  try {
    const response: UserProviderResponse[] = yield call(getProvidersProfileAPI);
    yield put(getProvidersSuccess({ data: response }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getProvidersError({ message: "Unable to get Providers" }));
    }
  }
}

function* workGetProviderList(
  action: PayloadAction<{
    page: number;
    rowsPerPage: number;
    search: string;
    disease: string;
    gender: string;
    cityName: string;
    speciality: string;
  }>
) {
  try {
    const response: UserPaginationProviderResponse = yield call(getProviderListAPI,action.payload);
    yield put(getProviderListSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getProviderListError({ message: "Unable to get Providers" }));
    }
  }
}

interface ProviderUserDTO{
  content:{providerProfile:ProviderProfileResponse;userPic:string;}[];
  totalElements:number;
}

function* workGetAdminProviders(action: PayloadAction<{name:string;cityName:string;page:number;size:number;}>) {
  try {
    const response: ProviderUserDTO= yield call(
      getAdminProvidersAPI,action.payload
    );
    yield put(getAdminProvidersSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminProvidersError({ message: "Unable to get count" }));
    }
  }
}

function* workUpdateAdminProviders(action: PayloadAction<{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}>) {
  try {
    const response: ProviderProfileResponse= yield call(
      updateAdminProvidersAPI,action.payload
    );
    yield put(updateAdminProvidersSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateAdminProvidersError({ message: "Unable to get count" }));
    }
  }
}

function* workDeleteAdminProviders(action: PayloadAction<number>) {
  try {
    const response: User= yield call(
      deleteUserAPI,action.payload
    );
    yield put(deleteAdminProvidersSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteAdminProvidersError({ message: "Unable to get count" }));
    }
  }
}


function* workGetAdminProvidersBox() {
  try {
    const response: number= yield call(getAdminProvidersBoxAPI);
    yield put(getAdminProvidersBoxSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminProvidersBoxError({ message: "Unable to get count" }));
    }
  }
}

export default function* providersSaga() {
  yield takeEvery(getProviders.type, workProvidersUser);
  yield takeEvery(getProviderList.type, workGetProviderList);
  yield takeEvery(getAdminProviders.type, workGetAdminProviders);
  yield takeEvery(updateAdminProviders.type, workUpdateAdminProviders);
  yield takeEvery(deleteAdminProviders.type, workDeleteAdminProviders);
  yield takeEvery(getAdminProvidersBox.type, workGetAdminProvidersBox);
}
