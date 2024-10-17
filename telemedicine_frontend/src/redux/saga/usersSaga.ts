import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { getUserDocuments, getUserDocumentsError, getUserDocumentsSuccess, uploadDocument, uploadDocumentError, uploadDocumentSuccess } from "../slice/documentsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { deleteUserAPI, getAdminUserAPI, getAllUsersAPI, getProfilePicAPI, getProfilePicStringAPI, getUserDocumentsAPI, updateUserAPI, uploadDocumentAPI, uploadProfilePicAPI } from "@/pages/api/api";
import { deleteUser, deleteUserError, deleteUserSuccess, getAdminUser, getAdminUserError, getAdminUserSuccess, getAllUsers, getAllUsersError, getAllUsersSuccess, getPrescriptionPatientUserProfilePic, getPrescriptionPatientUserProfilePicError, getPrescriptionPatientUserProfilePicSuccess, getUserProfilePic, getUserProfilePicError, getUserProfilePicSuccess, getUserProviderProfilePicString, getUserProviderProfilePicStringError, getUserProviderProfilePicStringSuccess, updateUser, updateUserError, updateUserSuccess, uploadUserProfilePic, uploadUserProfilePicError, uploadUserProfilePicSuccess, User } from "../slice/usersSlice";

interface UsersResponse
{
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

interface DocumentResponse
{
    fileName:string;
    message:string;
}


function* workGetAllUsers() {
  try {
    const response: UsersResponse[] = yield call(getAllUsersAPI);
    yield put(getAllUsersSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAllUsersError({ message: "Unable to get users" }));
    }
  }
}

function* workDeleteUser(action: PayloadAction<number>) {
  try {
    const response: UsersResponse = yield call(deleteUserAPI,action.payload);
    yield put(deleteUserSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteUserError({ message: "Unable to get users" }));
    }
  }
}

function* workUpdateUser(action: PayloadAction<UsersResponse>) {
  try {
    const response: UsersResponse = yield call(updateUserAPI,action.payload);
    yield put(updateUserSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateUserError({ message: "Unable to get users" }));
    }
  }
}


function* workGetUserProfilePic(action: PayloadAction<number>) {
  try {
    const response: {id:number;
      user:User;
      profilePic:string;
      createdDate:string;
    } = yield call(getProfilePicAPI,action.payload);
    yield put(getUserProfilePicSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUserProfilePicError({ message: "Unable to get users" }));
    }
  }
}


function* workUploadUserProfilePic(action: PayloadAction<{id:number,formData:FormData}>) {
  try {
    const response: {id:number;
      user:User;
      profilePic:string;
      createdDate:string;
    } = yield call(uploadProfilePicAPI,action.payload);
    
    yield put(uploadUserProfilePicSuccess(response));
    yield put(getUserProfilePicSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(uploadUserProfilePicError({ message: "Unable to get users" }));
    }
  }
}


function* workGetPrescriptionPatientUserProfilePic(action: PayloadAction<number>) {
  try {
    const response: {id:number;
      user:User;
      profilePic:string;
      createdDate:string;
    } = yield call(getProfilePicAPI,action.payload);
   
    yield put(getPrescriptionPatientUserProfilePicSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getPrescriptionPatientUserProfilePicError({ message: "Unable to get users" }));
    }
  }
}

function* workGetUserProviderProfilePicString(action: PayloadAction<number>) {
  try {
    const response: string= yield call(getProfilePicStringAPI,action.payload);

    yield put(getUserProviderProfilePicStringSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUserProviderProfilePicStringError({ message: "Unable to get users" }));
    }
  }
}


function* workGetAdminUser(action: PayloadAction<number>) {
  try {
    const response: User= yield call(getAdminUserAPI,action.payload);
   
    yield put(getAdminUserSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminUserError({ message: "Unable to get users" }));
    }
  }
}

export default function* usersSaga() {

  yield takeEvery(getAllUsers.type, workGetAllUsers);
  yield takeEvery(deleteUser.type, workDeleteUser);
  yield takeEvery(updateUser.type, workUpdateUser);
  yield takeEvery(getUserProfilePic.type, workGetUserProfilePic);
  yield takeEvery(getPrescriptionPatientUserProfilePic.type, workGetPrescriptionPatientUserProfilePic);
  yield takeEvery(uploadUserProfilePic.type, workUploadUserProfilePic);
  yield takeEvery(getUserProviderProfilePicString.type, workGetUserProviderProfilePicString);
  yield takeEvery(getAdminUser.type, workGetAdminUser);
  
}


