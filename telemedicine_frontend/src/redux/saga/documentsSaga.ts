import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { getUserDocuments, getUserDocumentsError, getUserDocumentsSuccess, uploadDocument, uploadDocumentError, uploadDocumentSuccess } from "../slice/documentsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { getUserDocumentsAPI, uploadDocumentAPI } from "@/pages/api/api";

interface DocumentResponse
{
    fileName:string;
    message:string;
}


function* workUploadDocument(action: PayloadAction<{appointmentId:number,userID:number,formData:FormData,fileType:string;}>) {
  try {
    const response: DocumentResponse = yield call(uploadDocumentAPI,action.payload);
    yield put(uploadDocumentSuccess({data:response}));
  } catch (error) {
    if (error instanceof Error) {
      yield put(uploadDocumentError({ message: "Unable to upload document" }));
    }
  }
}


function* workGetUserDocuments(action: PayloadAction<{id:number}>) {
  try {
    const response: string[] = yield call(getUserDocumentsAPI,action.payload);
    yield put(getUserDocumentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getUserDocumentsError({ message: "Unable to upload document" }));
    }
  }
}

export default function* documentsSaga() {
  yield takeEvery(uploadDocument.type, workUploadDocument);
  yield takeEvery(getUserDocuments.type, workGetUserDocuments);
}


