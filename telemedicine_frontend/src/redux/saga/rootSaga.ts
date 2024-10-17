import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import logoutSaga from './logoutSaga';
import profileSaga from './profileSaga';
import messageSaga from './messageSaga';
import providersSaga from './providersSaga';
import patientProfileSaga from './patientProfileSaga';
import appointmentsSaga from './appointmentsSaga';
import prescriptionSaga from './prescriptionSaga';
import documentsSaga from './documentsSaga';
import registerSaga from './registerSaga';
import patientsSaga from './patientsSaga';
import providerProfileSaga from './providerProfileSaga';
import consultationNoteSaga from './consultationNoteSaga';
import usersSaga from './usersSaga';



export default function* rootSaga() {
  yield all([
    loginSaga(),
    logoutSaga(),
    profileSaga(),
    messageSaga(),
    providersSaga(),
    patientProfileSaga(),
    providerProfileSaga(),
    appointmentsSaga(),
    prescriptionSaga(),
    documentsSaga(),
    registerSaga(),
    patientsSaga(),
    consultationNoteSaga(),
    usersSaga(),
  ]);
}
