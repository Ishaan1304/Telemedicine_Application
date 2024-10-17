import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import profileReducer from "./slice/profileSlice";
import messageReducer from "./slice/messageSlice";
import providersReducer from "./slice/providersSlice";
import appointmentsReducer from "./slice/appointmentsSlice"
import patientProfileReducer from "./slice/patientProfileSlice";
import providerProfileReducer from "./slice/providerProfileSlice"
import prescriptionReducer from "./slice/prescriptionSlice"
import documentsReducer from "./slice/documentsSlice"
import registerReducer from "./slice/registerSlice"
import patientsReducer from "./slice/patientsSlice"
import usersReducer from "./slice/usersSlice"
import consultationNoteReducer from "./slice/consultationNotesSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer:{ 
        login: loginReducer,
        profile:profileReducer,
        message:messageReducer,
        providers:providersReducer,
        patientProfile:patientProfileReducer,
        appointments:appointmentsReducer,
        prescription:prescriptionReducer,
        documents:documentsReducer,
        register:registerReducer,
        patients:patientsReducer,
        providerProfile:providerProfileReducer,
        consultationNote:consultationNoteReducer,
        users:usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
          }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;