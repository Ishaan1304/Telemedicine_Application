import { call, put, takeEvery } from "redux-saga/effects";
import {
  deleteAppointment,
  deleteAppointmentError,
  deleteAppointmentSuccess,
  getAdminAppointmentHistory,
  getAdminAppointmentHistoryError,
  getAdminAppointmentHistorySuccess,
  getAdminAppointmentsBox,
  getAdminAppointmentsBoxError,
  getAdminAppointmentsBoxSuccess,
  getAdminUpcomingAppointments,
  getAdminUpcomingAppointmentsBox,
  getAdminUpcomingAppointmentsBoxError,
  getAdminUpcomingAppointmentsBoxSuccess,
  getAdminUpcomingAppointmentsError,
  getAdminUpcomingAppointmentsSuccess,
  getAllAppointments,
  getAllAppointmentsError,
  getAllAppointmentsSuccess,
  getAllProviderAppointments,
  getAllProviderAppointmentsError,
  getAllProviderAppointmentsSuccess,
  getAllUpcomingAppointments,
  getAllUpcomingAppointmentsError,
  getAllUpcomingAppointmentsSuccess,
  getAppointments,
  getAppointmentsError,
  getAppointmentsOnProvider,
  getAppointmentsOnProviderError,
  getAppointmentsOnProviderSuccess,
  getAppointmentsSuccess,
  getAvailableTimeSlots,
  getAvailableTimeSlotsError,
  getAvailableTimeSlotsSuccess,
  getPatientAppointmentHistory,
  getPatientAppointmentHistoryError,
  getPatientAppointmentHistorySuccess,
  getProviderAppointmentHistory,
  getProviderAppointmentHistoryError,
  getProviderAppointmentHistorySuccess,
  getProviderPreviousAppointments,
  getProviderPreviousAppointmentsError,
  getProviderPreviousAppointmentsSuccess,
  getProviderTotalPatients,
  getProviderTotalPatientsError,
  getProviderTotalPatientsSuccess,
  getProviderUpcomingAppointments,
  getProviderUpcomingAppointmentsError,
  getProviderUpcomingAppointmentsSuccess,
  updateAppointment,
  updateAppointmentError,
  updateAppointmentSuccess,
} from "../slice/appointmentsSlice";
import {
  deleteAppointmentByAppointmentID,
  getAdminAppointmentHistoryAPI,
  getAdminAppointmentsBoxAPI,
  getAdminUpcomingAppointmentsAPI,
  getAdminUpcomingAppointmentsBoxAPI,
  getAllAppointmentsAPI,
  getAllProviderAppointmentsAPI,
  getAllUpcomingAppointmentsAPI,
  getAvailableTimeSlotsAPI,
  getPatientAppointmentHistoryAPI,
  getProviderAppointmentHistoryAPI,
  getProviderPreviousAppointmentsAPI,
  getProviderTotalPatientsDistinctAPI,
  getProviderUpcomingAppointmentsAPI,
  getUpcomingAppointments,
  getUpcomingAppointmentsOnProvider,
  updateAppointmentAPI,
} from "@/pages/api/api";
import { PayloadAction } from "@reduxjs/toolkit";

interface AppointmentsResponse {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
  status: string;
  disease:string;
  emergency: boolean;
  description: string;
}

interface DeleteAppointmentResponse {
  id: number;
}

interface UpdateAppointmentResponse {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
}

interface TimeSlotResponse {
  start: string;
  end: string;
}

function* workAppointmentsUser(action: PayloadAction<{ id: number }>) {
  try {
    const response: {
        appointment:AppointmentsResponse;
        userPic:string;
     }[] = yield call(
      getUpcomingAppointments,
      action.payload
    );
    yield put(getAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAppointmentsError({ message: "Unable to get Appointments" })
      );
    }
  }
}

function* workDeleteAppointmentUser(action: PayloadAction<{ id: number }>) {
  try {
    const response: DeleteAppointmentResponse = yield call(
      deleteAppointmentByAppointmentID,
      action.payload
    );
    yield put(deleteAppointmentSuccess({ id: action.payload.id }));
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteAppointmentError({ message: "Unable to delete" }));
    }
  }
}

function* workUpdateAppointmentUser(
  action: PayloadAction<{
    appointmentID: number;
    patientProfile: any;
    providerProfile: any;
    startTime: string;
    endTime: string;
  }>
) {
  try {
    const response: UpdateAppointmentResponse = yield call(
      updateAppointmentAPI,
      action.payload
    );
    yield put(
      updateAppointmentSuccess({
        appointmentID: response.appointmentID,
        patientProfile: response.patientProfile,
        providerProfile: response.providerProfile,
        startTime: response.startTime,
        endTime: response.endTime,
        status:response.status,
      })
    );
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateAppointmentError({ message: "Unable to delete" }));
    }
  }
}

function* workAppointmentsOnProviderUser(
  action: PayloadAction<{ id: number }>
) {
  try {
    const response: AppointmentsResponse[] = yield call(
      getUpcomingAppointmentsOnProvider,
      action.payload
    );
    yield put(getAppointmentsOnProviderSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAppointmentsOnProviderError({
          message: "Unable to get Appointments",
        })
      );
    }
  }
}

function* workGetAllProviderAppointments(
  action: PayloadAction<{ id: number }>
) {
  try {
    const response: AppointmentsResponse[] = yield call(
      getAllProviderAppointmentsAPI,
      action.payload
    );
    yield put(getAllProviderAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAllProviderAppointmentsError({
          message: "Unable to get Appointments",
        })
      );
    }
  }
}

function* workGetAllAppointments() {
  try {
    const response: AppointmentsResponse[] = yield call(getAllAppointmentsAPI);
    yield put(getAllAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAllAppointmentsError({
          message: "Unable to get Appointments",
        })
      );
    }
  }
}

function* workGetAllUpcomingAppointments() {
  try {
    const response: AppointmentsResponse[] = yield call(
      getAllUpcomingAppointmentsAPI
    );
    yield put(getAllUpcomingAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAllUpcomingAppointmentsError({
          message: "Unable to get Appointments",
        })
      );
    }
  }
}

function* workgetAvailableTimeSlots(
  action: PayloadAction<{ id: number; start: string; end: string;date:string; }>
) {
  try {
    const response: TimeSlotResponse[] = yield call(
      getAvailableTimeSlotsAPI,
      action.payload
    );
    yield put(getAvailableTimeSlotsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAvailableTimeSlotsError({
          message: "Unable to get time slots",
        })
      );
    }
  }
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
interface Patient {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
}
interface Provider {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}

interface AppointmentRes {
  appointmentID: number;
  patientProfile: Patient;
  providerProfile: Provider;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
  profilePic:string;
}
export type PaginationUpcomingAppointmentResponse = {
  content: AppointmentRes[];
  totalElements: number;
};


export type PaginationPatientResponse = {
  content: {
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    address: string;
    startTime: string;
    profilePic: string;
    allergies: string;
    disease:string;
  }[];
  totalElements: number;
};

// function* workProviderUpcomingAppointments(
//   action: PayloadAction<{ id: number,page:number,rowsPerPage:number,search:string}>
// ) {
//   try {
//     const response: PaginationUpcomingAppointmentResponse = yield call(
//       getProviderUpcomingAppointmentsAPI,
//       action.payload
//     );
//     yield put(getProviderUpcomingAppointmentsSuccess(response));
//   } catch (error) {
//     if (error instanceof Error) {
//       yield put(
//         getProviderUpcomingAppointmentsError({
//           message: "Unable to fetch appointments",
//         })
//       );
//     }
//   }
// }

function* workProviderUpcomingAppointments(
  action: PayloadAction<{
    id: number;
    page: number;
    rowsPerPage: number;
    search: string;
    startDate: string;
    endDate: string;
    emergency: boolean;
    status:string;
  }>
) {
  try {
   
    const response: PaginationUpcomingAppointmentResponse = yield call(
      getProviderUpcomingAppointmentsAPI,
      action.payload
    );
    yield put(getProviderUpcomingAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getProviderUpcomingAppointmentsError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}

function* workGetProviderTotalPatients(
  action: PayloadAction<{
    id: number;
    page: number;
    rowsPerPage: number;
    search: string;
    gender: string;
    allergies: string;
    disease:string;
  }>
) {
  try {
    const response: PaginationPatientResponse = yield call(
      getProviderTotalPatientsDistinctAPI,
      action.payload
    );
    yield put(getProviderTotalPatientsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getProviderTotalPatientsError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}

export interface PreviousAppointment {
  appointmentID: number;
  patientProfile: Patient;
  providerProfile: Provider;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
  profilePic:string;
  documents:any;
  prescriptions:any;
}

function* workGetProviderPreviousAppointments(
  action: PayloadAction<number>
) {
  try {
    const response: PreviousAppointment[] = yield call(
      getProviderPreviousAppointmentsAPI,
      action.payload
    );
    yield put(getProviderPreviousAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getProviderPreviousAppointmentsError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}


type PaginationAppointmentHistoryResponse = {
  content: {
    appointmentID:number;
    patientProfile:Patient;
    providerProfile:Provider;
    startTime:string;
    endTime:string;
    status:string;
    emergency:string;
    description:string;
    profilePic:string;
    disease:string;
  }[];
  totalElements: number;
};


function* workGetProviderAppointmentHistory(
  action: PayloadAction<{
    id: number;
    page: number;
    rowsPerPage: number;
    search: string;
    startDate: string;
    endDate: string;
    status: string;
    disease:string;
  }>
) {
  try {
    const response: PaginationAppointmentHistoryResponse = yield call(
      getProviderAppointmentHistoryAPI,
      action.payload
    );
    yield put(getProviderAppointmentHistorySuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getProviderAppointmentHistoryError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}


function* workGetPatientAppointmentHistory(
  action: PayloadAction<{
    id: number;
    page: number;
    rowsPerPage: number;
    search: string;
    startDate: string;
    endDate: string;
    status: string;
    disease:string;
  }>
) {
  try {
    const response: PaginationAppointmentHistoryResponse = yield call(
      getPatientAppointmentHistoryAPI,
      action.payload
    );
    yield put(getPatientAppointmentHistorySuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getPatientAppointmentHistoryError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}



function* workGetAdminAppointmentHistory(
  action: PayloadAction<{
    page: number;
    rowsPerPage: number;
    search: string;
    startDate: string;
    endDate: string;
    status: string;
    disease:string;
  }>
) {
  try {
    const response: PaginationAppointmentHistoryResponse = yield call(
      getAdminAppointmentHistoryAPI,
      action.payload
    );
    yield put(getAdminAppointmentHistorySuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAdminAppointmentHistoryError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}


function* workAdminUpcomingAppointments(
  action: PayloadAction<{
    page: number;
    rowsPerPage: number;
    search: string;
    startDate: string;
    endDate: string;
    emergency: boolean;
    status:string;
  }>
) {
  try {
   
    const response: PaginationUpcomingAppointmentResponse = yield call(
      getAdminUpcomingAppointmentsAPI,
      action.payload
    );
    yield put(getAdminUpcomingAppointmentsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        getAdminUpcomingAppointmentsError({
          message: "Unable to fetch appointments",
        })
      );
    }
  }
}

function* workGetAdminAppointmentsBox() {
  try {
    const response: number= yield call(getAdminAppointmentsBoxAPI);
    yield put(getAdminAppointmentsBoxSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminAppointmentsBoxError({ message: "Unable to get count" }));
    }
  }
}

function* workGetAdminUpcomingAppointmentsBox() {
  try {
    const response: number= yield call(getAdminUpcomingAppointmentsBoxAPI);
    yield put(getAdminUpcomingAppointmentsBoxSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getAdminUpcomingAppointmentsBoxError({ message: "Unable to get count" }));
    }
  }
}

export default function* appointmentsSaga() {
  yield takeEvery(getAppointments.type, workAppointmentsUser);
  yield takeEvery(deleteAppointment.type, workDeleteAppointmentUser);
  yield takeEvery(updateAppointment.type, workUpdateAppointmentUser);
  yield takeEvery(
    getAppointmentsOnProvider.type,
    workAppointmentsOnProviderUser
  );
  yield takeEvery(
    getAllProviderAppointments.type,
    workGetAllProviderAppointments
  );
  yield takeEvery(getAllAppointments.type, workGetAllAppointments);
  yield takeEvery(
    getAllUpcomingAppointments.type,
    workGetAllUpcomingAppointments
  );
  yield takeEvery(getAvailableTimeSlots.type, workgetAvailableTimeSlots);
  yield takeEvery(
    getProviderUpcomingAppointments.type,
    workProviderUpcomingAppointments
  );
  yield takeEvery(getProviderTotalPatients.type, workGetProviderTotalPatients);
  yield takeEvery(getProviderPreviousAppointments.type, workGetProviderPreviousAppointments);
  yield takeEvery(getProviderAppointmentHistory.type, workGetProviderAppointmentHistory);
  yield takeEvery(getPatientAppointmentHistory.type, workGetPatientAppointmentHistory);
  yield takeEvery(getAdminAppointmentHistory.type, workGetAdminAppointmentHistory);
  yield takeEvery(
    getAdminUpcomingAppointments.type,
    workAdminUpcomingAppointments
  );
  yield takeEvery(getAdminAppointmentsBox.type, workGetAdminAppointmentsBox);
  yield takeEvery(getAdminUpcomingAppointmentsBox.type, workGetAdminUpcomingAppointmentsBox);

}


