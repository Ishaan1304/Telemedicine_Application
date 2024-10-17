import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { loginError, loginSuccessful, loginUser } from "../slice/loginSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { apiLogin, getListOfPatientsAPI, getListOfProvidersAPI, getListOfUsersAPI, getMessageAdminInitialAPI, getMessagePatientInitialAPI, getMessageProviderInitialAPI, getMessages, getUserProfile, sendMessageAPI} from "@/pages/api/api";
import { getProfile, getProfileError, getProfileSuccess } from "../slice/profileSlice";
import { getListOfPatients, getListOfPatientsError, getListOfPatientsSuccess, getListOfProviders, getListOfProvidersError, getListOfProvidersSuccess, getListOfUsers, getListOfUsersError, getListOfUsersSuccess, getMessage, getMessageAdminInitial, getMessageAdminInitialError, getMessageAdminInitialSuccess, getMessageError, getMessagePatientInitial, getMessagePatientInitialError, getMessagePatientInitialSuccess, getMessageProviderInitial, getMessageProviderInitialError, getMessageProviderInitialSuccess, getMessageSuccess, sendMessage, sendMessageError, sendMessageSuccess } from "../slice/messageSlice";
import { UserProfileResponse } from "./profileSaga";

interface messageResponse{

  id:number;
  sender:UserProfileResponse ;
  message:string;
  receiver:UserProfileResponse ;
  sentAt:string

}

interface Message
{
  messageContent: string;
  messageId: number;
  sender: any;
  recipient: any;
  sentAt: string;
}


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

function* workMessageUser(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:messageResponse = yield call(getMessages, action.payload);
    yield put( getMessageSuccess({data:response}));

  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getMessageError({ message: "Unable to get messages" }));
    }
  }
}

function* workSendMessageUser(action: PayloadAction<{id:number,message:string}>) {
  try 
  {
    const response:Message = yield call(sendMessageAPI, action.payload);
    yield put( sendMessageSuccess(response));

  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(sendMessageError({ message: "Unable to send messages" }));
    }
  }
}


function* workGetListOfPatients(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:User[] = yield call(getListOfPatientsAPI, action.payload);
    yield put( getListOfPatientsSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getListOfPatientsError({ message: "Unable to get messages" }));
    }
  }
}


function* workGetMessageProviderInitial(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:Message[] = yield call(getMessageProviderInitialAPI, action.payload);
    yield put(getMessageProviderInitialSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getMessageProviderInitialError({ message: "Unable to get messages" }));
    }
  }
}



function* workGetListOfProviders(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:User[] = yield call(getListOfProvidersAPI, action.payload);
    yield put( getListOfProvidersSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getListOfProvidersError({ message: "Unable to get messages" }));
    }
  }
}

function* workGetListOfUsers(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:User[] = yield call(getListOfUsersAPI, action.payload);
    yield put( getListOfUsersSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getListOfUsersError({ message: "Unable to get messages" }));
    }
  }
}


function* workGetMessagePatientInitial(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:Message[] = yield call(getMessagePatientInitialAPI, action.payload);
    yield put(getMessagePatientInitialSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getMessagePatientInitialError({ message: "Unable to get messages" }));
    }
  }
}


function* workGetMessageAdminInitial(action: PayloadAction<{id:number}>) {
  try 
  {
    const response:Message[] = yield call(getMessageAdminInitialAPI, action.payload);
    yield put(getMessageAdminInitialSuccess({data:response}));
  } catch (error)
  {
    if (error instanceof Error)
    {
      yield put(getMessageAdminInitialError({ message: "Unable to get messages" }));
    }
  }
}

export default function* messageSaga() {
  yield takeEvery(getMessage.type, workMessageUser);
  yield takeEvery(sendMessage.type, workSendMessageUser);
  yield takeEvery(getListOfPatients.type, workGetListOfPatients);
  yield takeEvery(getMessageProviderInitial.type, workGetMessageProviderInitial);
  yield takeEvery(getListOfProviders.type, workGetListOfProviders);
  yield takeEvery(getListOfUsers.type, workGetListOfUsers);
  yield takeEvery(getMessagePatientInitial.type, workGetMessagePatientInitial);
  yield takeEvery(getMessageAdminInitial.type, workGetMessageAdminInitial);
}
