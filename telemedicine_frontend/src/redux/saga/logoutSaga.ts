import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loginError, loginSuccessful, logoutSuccessful, logoutUser } from "../slice/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { apiLogin, apiLogout } from "@/pages/api/api";

interface ApiLogoutResponse {
  status: boolean;
}
function* workLogoutUser(action: PayloadAction<{token:string;}>) {
  try {
    const response: ApiLogoutResponse = yield call(apiLogout, action.payload);
    yield put(
      logoutSuccessful({message:"Successfully Logged Out"})
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginError({ message: "Something went wrong" }));
    }
  }
}

export default function* logoutSaga() {
  yield takeEvery(logoutUser.type, workLogoutUser);
}

