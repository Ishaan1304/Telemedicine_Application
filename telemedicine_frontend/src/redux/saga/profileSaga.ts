import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loginError, loginSuccessful, loginUser } from "../slice/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { apiLogin,getUserProfile } from "@/pages/api/api";
import { getProfile, getProfileError, getProfileSuccess } from "../slice/profileSlice";

export interface UserProfileResponse {
  userID: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: string;
  role:string;
}


function* workProfileUser(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:UserProfileResponse = yield call(getUserProfile, action.payload);
    yield put( getProfileSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getProfileError({ message: "Unable to get Profile" }));
    }
  }
}





export default function* profileSaga() {
  yield takeEvery(getProfile.type, workProfileUser);
}
