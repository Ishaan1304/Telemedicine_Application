import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { PayloadAction } from "@reduxjs/toolkit";
import { apiLogin } from "@/pages/api/api";
import { loginError, loginSuccessful, loginUser } from "../slice/loginSlice";

interface ApiLoginResponse {
  token: string;
  role: string;
  id:number;
}
function* workLoginUser(action: PayloadAction<{email:string;password:string;}>) {
  try 
  {
    const response:ApiLoginResponse = yield call(apiLogin, action.payload);
    yield put(loginSuccessful({token:response.token,id:response.id,role:response.role}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(loginError({ message: "Invalid email or password" }));
    }
  }
}

export default function* loginSaga() {
  yield takeLatest(loginUser.type, workLoginUser);
}
