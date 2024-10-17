import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { uploadDocument, uploadDocumentError, uploadDocumentSuccess } from "../slice/documentsSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { addConsultationNoteAPI, deleteConsultationNoteAPI, getAllConsultationNotesByPatientAndProviderAPI, getConsultationNotesByPatientAndProviderAPI, uploadDocumentAPI } from "@/pages/api/api";
import { addConsultationNote, addConsultationNoteError, addConsultationNoteSuccess, deleteConsultationNote, deleteConsultationNoteError, deleteConsultationNoteSuccess, getAllConsultationNotesByPatientAndProvider, getAllConsultationNotesByPatientAndProviderError, getAllConsultationNotesByPatientAndProviderSuccess, getConsultationNotesByPatientAndProvider, getConsultationNotesByPatientAndProviderError, getConsultationNotesByPatientAndProviderSuccess } from "../slice/consultationNotesSlice";

type ConsultationNoteResponse={
    consultationNoteID:number;
    patientProfile:{
        patientID:number;
    };
    providerProfile:{
        providerID:number;
    };
    notes:string;
    dateTime:string;
}


function* workAddConsultationNote(action: PayloadAction<{patientID:number;providerID:number;notes:string}>) {
  try {
    const response: ConsultationNoteResponse = yield call(addConsultationNoteAPI,action.payload);
    yield put(addConsultationNoteSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(addConsultationNoteError({ message: "Unable to upload document" }));
    }
  }
}


function* workDeleteConsultationNote(action: PayloadAction<{id:number}>) {
  try {
    const response: ConsultationNoteResponse = yield call(deleteConsultationNoteAPI,action.payload);
    yield put(deleteConsultationNoteSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteConsultationNoteError({ message: "Unable to upload document" }));
    }
  }
}


function* workGetAllConsultationNotesByPatientAndProvider(action: PayloadAction<{patientID:number;providerID:number;}>) {
    try {
      const response: ConsultationNoteResponse[] = yield call(getAllConsultationNotesByPatientAndProviderAPI,action.payload);
      yield put(getAllConsultationNotesByPatientAndProviderSuccess(response));
    } catch (error) {
      if (error instanceof Error) {
        yield put(getAllConsultationNotesByPatientAndProviderError({ message: "Unable to upload document" }));
      }
    }
  }


  function* workGetConsultationNotesByPatientAndProvider(action: PayloadAction<{patientID:number;providerID:number;}>) {
    try {
      const response: ConsultationNoteResponse= yield call(getConsultationNotesByPatientAndProviderAPI,action.payload);
      yield put(getConsultationNotesByPatientAndProviderSuccess(response));
    } catch (error) {
      if (error instanceof Error) {
        yield put(getConsultationNotesByPatientAndProviderError({ message: "Unable to upload document" }));
      }
    }
  }


export default function* consultationNoteSaga() {
  yield takeEvery(addConsultationNote.type, workAddConsultationNote);
  yield takeEvery(getAllConsultationNotesByPatientAndProvider.type, workGetAllConsultationNotesByPatientAndProvider);
  yield takeEvery(getConsultationNotesByPatientAndProvider.type, workGetConsultationNotesByPatientAndProvider);
  yield takeEvery(deleteConsultationNote.type, workDeleteConsultationNote);
}


