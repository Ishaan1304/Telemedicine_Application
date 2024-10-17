import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";
import { PreviousAppointment } from "../saga/appointmentsSaga";
import { toast } from "react-toastify";

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

interface Appointment {
  appointmentID: number;
  patientProfile: Patient;
  providerProfile: Provider;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  disease:string;
  description: string;
}

interface AppointmentResponseImage {
  appointmentID: number;
  patientProfile: Patient;
  providerProfile: Provider;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
  profilePic: string;
}

interface TimeSlot {
  start: string;
  end: string;
}

export interface InitialStateAppointments {
  loading: boolean;
  allProviderAppointmentsUpcoming: AppointmentResponseImage[];
  allAdminAppointmentsUpcoming: AppointmentResponseImage[];
  totalPaginationElements: number;
  totalAdminPaginationElements:number;
  providerPreviousAppointments: PreviousAppointment[];
  appointments: Appointment[];
  providerAppointments: Appointment[];
  allProviderAppointments: Appointment[];
  allAppointments: Appointment[];
  allUpcomingAppointments: Appointment[];
  availableTimeSlots: TimeSlot[];

  providerTotalPatients: {
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
  providerTotalPatientsNumber: number;

  providerTotalUpcomingAppointmentsNumber: number;



  providerAppointmentHistoryTotal:number;
  providerAppointmentHistory: {
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



  patientAppointmentHistoryTotal:number;
  patientAppointmentHistory: {
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

  adminAppointmentHistoryTotal:number;
  adminAppointmentHistory: {
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

  patientUpcomingAppointments:{
    appointment:Appointment;
    userPic:string;
 }[];

 adminAppointmentNumberBox:number;
 adminUpcomingAppointmentNumberBox:number;
}

const initialState: InitialStateAppointments = {
  patientUpcomingAppointments:[],
  loading: false,
  allProviderAppointmentsUpcoming: [],
  allAdminAppointmentsUpcoming: [],
  totalAdminPaginationElements:0,
  totalPaginationElements: 0,
  providerPreviousAppointments: [],
  appointments: [],
  providerAppointments: [],
  allProviderAppointments: [],
  allAppointments: [],
  allUpcomingAppointments: [],
  availableTimeSlots: [],
  providerTotalPatients: [],
  providerTotalPatientsNumber: 0,
  providerTotalUpcomingAppointmentsNumber: 0,


  providerAppointmentHistory:[],
  providerAppointmentHistoryTotal:0,

  patientAppointmentHistory:[],
  patientAppointmentHistoryTotal:0,

  adminAppointmentHistory:[],
  adminAppointmentHistoryTotal:0,

  adminAppointmentNumberBox:0,
  adminUpcomingAppointmentNumberBox:0,
};

const Slice = createSlice({
  name: "appointments",
  initialState,
  reducers: {

    getAdminUpcomingAppointmentsBox: (state: InitialStateAppointments) => {},
    getAdminUpcomingAppointmentsBoxSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<number>
    ) => {
      state.adminUpcomingAppointmentNumberBox=action.payload;
    },
    getAdminUpcomingAppointmentsBoxError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
      state.adminUpcomingAppointmentNumberBox=0;
    },


    getAdminAppointmentsBox: (state: InitialStateAppointments) => {},
    getAdminAppointmentsBoxSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<number>
    ) => {
      state.adminAppointmentNumberBox=action.payload;
    },
    getAdminAppointmentsBoxError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
      state.adminAppointmentNumberBox=0;
    },

    getAdminAppointmentHistory: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        page: number;
        rowsPerPage: number;
        search: string;
        startDate: string;
        endDate: string;
        status: string;
        disease:string;
      }>
    ) => {
      state.loading = true;
    },
    getAdminAppointmentHistorySuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
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
      }>
    ) => {
      state.loading = false;
      state.adminAppointmentHistory = action.payload.content;
      state.adminAppointmentHistoryTotal=action.payload.totalElements;
    },
    getAdminAppointmentHistoryError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.providerAppointmentHistory = [];
    },

    getPatientAppointmentHistory: (
      state: InitialStateAppointments,
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
    ) => {
      state.loading = true;
    },
    getPatientAppointmentHistorySuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
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
      }>
    ) => {
      state.loading = false;
      state.patientAppointmentHistory = action.payload.content;
      state.patientAppointmentHistoryTotal=action.payload.totalElements;
    },
    getPatientAppointmentHistoryError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.providerAppointmentHistory = [];
    },

    getProviderAppointmentHistory: (
      state: InitialStateAppointments,
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
    ) => {
      state.loading = true;
    },
    getProviderAppointmentHistorySuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
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
      }>
    ) => {
      state.loading = false;
      state.providerAppointmentHistory = action.payload.content;
      state.providerAppointmentHistoryTotal=action.payload.totalElements;
    },
    getProviderAppointmentHistoryError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.providerAppointmentHistory = [];
    },

    getProviderPreviousAppointments: (
      state: InitialStateAppointments,
      action: PayloadAction<number>
    ) => {
      state.loading = true;
    },
    getProviderPreviousAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<PreviousAppointment[]>
    ) => {
      
      state.loading = false;
      state.providerPreviousAppointments = action.payload;
    },
    getProviderPreviousAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.providerPreviousAppointments = [];
    },

    getProviderTotalPatients: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        id: number;
        page: number;
        rowsPerPage: number;
        search: string;
        gender: string;
        allergies: string;
        disease:string;
      }>
    ) => {
      state.loading = true;
    },
    getProviderTotalPatientsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
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
      }>
    ) => {
      state.loading = false;
      state.providerTotalPatients = action.payload.content;
      state.providerTotalPatientsNumber = action.payload.totalElements;
    },
    getProviderTotalPatientsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.allProviderAppointmentsUpcoming = [];
    },

    // getProviderTotalPatients: (
    //   state: InitialStateAppointments,
    //   action: PayloadAction<{
    //     id: number;
    //     page: number;
    //     rowsPerPage: number;
    //     search: string;
    //   }>
    // ) => {
    //   state.loading = true;
    // },
    // getProviderTotalPatientsSuccess: (
    //   state: InitialStateAppointments,
    //   action: PayloadAction<{ content: Appointment[]; totalElements: number }>
    // ) => {
    //   state.loading = false;
    //   state.providerTotalPatients = action.payload.content;
    //   state.providerTotalPatientsNumber = action.payload.totalElements;
    // },
    // getProviderTotalPatientsError: (
    //   state: InitialStateAppointments,
    //   action: PayloadAction<{ message: string }>
    // ) => {
    //   state.loading = false;
    //   state.allProviderAppointmentsUpcoming = [];
    // },

    getAdminUpcomingAppointments: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        page: number;
        rowsPerPage: number;
        search: string;
        startDate: string;
        endDate: string;
        emergency: boolean;
        status: string;
      }>
    ) => {
      
      if (action.payload.status === undefined) action.payload.status = "";
      state.loading = true;
    },
    getAdminUpcomingAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        content: AppointmentResponseImage[];
        totalElements: number;
      }>
    ) => {
      state.loading = false;
      state.allAdminAppointmentsUpcoming = action.payload.content;
      state.totalAdminPaginationElements = action.payload.totalElements;
    },
    getAdminUpcomingAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.allAdminAppointmentsUpcoming = [];
    },

    getProviderUpcomingAppointments: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        id: number;
        page: number;
        rowsPerPage: number;
        search: string;
        startDate: string;
        endDate: string;
        emergency: boolean;
        status: string;
      }>
    ) => {
      
      if (action.payload.status === undefined) action.payload.status = "";
      state.loading = true;
    },
    getProviderUpcomingAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        content: AppointmentResponseImage[];
        totalElements: number;
      }>
    ) => {
      state.loading = false;
      state.allProviderAppointmentsUpcoming = action.payload.content;
      state.totalPaginationElements = action.payload.totalElements;
    },
    getProviderUpcomingAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.allProviderAppointmentsUpcoming = [];
    },

    getAppointments: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number }>
    ) => {},
    getAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        appointment:Appointment;
        userPic:string;
     }[]>
    ) => {

      state.patientUpcomingAppointments=action.payload;
      //state.appointments = action.payload;
    },
    getAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.appointments = [];
    },
    deleteAppointment: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number }>
    ) => {},
    deleteAppointmentSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number }>
    ) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.appointmentID !== action.payload.id
      );

      state.providerAppointments = state.providerAppointments.filter(
        (appointment) => appointment.appointmentID !== action.payload.id
      );

      state.allAdminAppointmentsUpcoming = state.allAdminAppointmentsUpcoming.filter(
        (appointment) => appointment.appointmentID !== action.payload.id
      );

      state.allAppointments = state.allAppointments.filter(
        (appointment) => appointment.appointmentID !== action.payload.id
      );


      state.patientUpcomingAppointments
      = state.patientUpcomingAppointments
      .filter(
        (appointment) => appointment.appointment.appointmentID !== action.payload.id
      );


      
      state.allProviderAppointmentsUpcoming =
        state.allProviderAppointmentsUpcoming.filter(
          (appointment) => appointment.appointmentID !== action.payload.id
        );
      state.totalPaginationElements = state.totalPaginationElements - 1;
    },
    deleteAppointmentError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.appointments = [];
    },
    getAppointmentsOnProvider: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number }>
    ) => {},
    getAppointmentsOnProviderSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<Appointment[]>
    ) => {
      state.providerAppointments = action.payload;
    },
    getAppointmentsOnProviderError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.providerAppointments = [];
    },
    updateAppointment: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        appointmentID: number;
        patientProfile: any;
        providerProfile: any;
        startTime: string;
        endTime: string;
      }>
    ) => {},
    updateAppointmentSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<{
        appointmentID: number;
        patientProfile: any;
        providerProfile: any;
        status:string;
        startTime: string;
        endTime: string;
      }>
    ) => {
      const {
        appointmentID,
        patientProfile,
        providerProfile,
        startTime,
        endTime,
        status
      } = action.payload;

      
      state.allAdminAppointmentsUpcoming.map((obj)=>{
        if(obj.appointmentID===appointmentID)
        {
          obj.patientProfile=patientProfile;
          obj.providerProfile=providerProfile;
          obj.startTime=startTime;
          obj.endTime=endTime;
          obj.status=status;
        }
      });

      state.allProviderAppointmentsUpcoming.map((obj)=>{
        if(obj.appointmentID===appointmentID)
        {
          obj.patientProfile=patientProfile;
          obj.providerProfile=providerProfile;
          obj.startTime=startTime;
          obj.endTime=endTime;
          obj.status=status;
        }
      });



      state.appointments = state.appointments.map((appointment) =>
        appointment.appointmentID === appointmentID
          ? {
              ...appointment,
              patientProfile,
              providerProfile,
              startTime,
              endTime,
            }
          : appointment
      );

      state.providerAppointments = state.providerAppointments.map(
        (appointment) =>
          appointment.appointmentID === appointmentID
            ? {
                ...appointment,
                patientProfile,
                providerProfile,
                startTime,
                endTime,
              }
            : appointment
      );

      state.allProviderAppointments = state.allProviderAppointments.map(
        (appointment) =>
          appointment.appointmentID === appointmentID
            ? {
                ...appointment,
                patientProfile,
                providerProfile,
                startTime,
                endTime,
              }
            : appointment
      );

      state.allAppointments = state.allAppointments.map((appointment) =>
        appointment.appointmentID === appointmentID
          ? {
              ...appointment,
              patientProfile,
              providerProfile,
              startTime,
              endTime,
            }
          : appointment
      );

      state.allUpcomingAppointments = state.allUpcomingAppointments.map(
        (appointment) =>
          appointment.appointmentID === appointmentID
            ? {
                ...appointment,
                patientProfile,
                providerProfile,
                startTime,
                endTime,
              }
            : appointment
      );


      toast.success("Sucessfully Rescheduled");
    },
    updateAppointmentError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.appointments = [];
    },

    getAllProviderAppointments: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number }>
    ) => {},
    getAllProviderAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<Appointment[]>
    ) => {
      state.allProviderAppointments = action.payload;
    },
    getAllProviderAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.allProviderAppointments = [];
    },

    getAllAppointments: (state: InitialStateAppointments) => {},
    getAllAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<Appointment[]>
    ) => {
      state.allAppointments = action.payload;
    },
    getAllAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.allAppointments = [];
    },

    getAllUpcomingAppointments: (state: InitialStateAppointments) => {},
    getAllUpcomingAppointmentsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<Appointment[]>
    ) => {
      state.allUpcomingAppointments = action.payload;
    },
    getAllUpcomingAppointmentsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.allUpcomingAppointments = [];
    },

    getAvailableTimeSlots: (
      state: InitialStateAppointments,
      action: PayloadAction<{ id: number; start: string; end: string,date:string; }>
    ) => {
      

    },
    getAvailableTimeSlotsSuccess: (
      state: InitialStateAppointments,
      action: PayloadAction<TimeSlot[]>
    ) => {
      
      state.availableTimeSlots = action.payload;
    },
    getAvailableTimeSlotsError: (
      state: InitialStateAppointments,
      action: PayloadAction<{ message: string }>
    ) => {
      state.availableTimeSlots = [];
    },
  },
});

export const {
  getProviderUpcomingAppointments,
  getProviderUpcomingAppointmentsSuccess,
  getProviderUpcomingAppointmentsError,

  getProviderTotalPatients,
  getProviderTotalPatientsSuccess,
  getProviderTotalPatientsError,

  getAppointments,
  getAppointmentsSuccess,
  getAppointmentsError,
  deleteAppointment,
  deleteAppointmentSuccess,
  deleteAppointmentError,
  getAppointmentsOnProvider,
  getAppointmentsOnProviderSuccess,
  getAppointmentsOnProviderError,
  updateAppointment,
  updateAppointmentSuccess,
  updateAppointmentError,
  getAllProviderAppointments,
  getAllProviderAppointmentsSuccess,
  getAllProviderAppointmentsError,
  getAllAppointments,
  getAllAppointmentsSuccess,
  getAllAppointmentsError,
  getAllUpcomingAppointments,
  getAllUpcomingAppointmentsSuccess,
  getAllUpcomingAppointmentsError,
  getAvailableTimeSlots,
  getAvailableTimeSlotsSuccess,
  getAvailableTimeSlotsError,
  getProviderPreviousAppointments,
  getProviderPreviousAppointmentsSuccess,
  getProviderPreviousAppointmentsError,
  getProviderAppointmentHistory,
  getProviderAppointmentHistorySuccess,
  getProviderAppointmentHistoryError,
  getPatientAppointmentHistory,
  getPatientAppointmentHistorySuccess,
  getPatientAppointmentHistoryError,
  getAdminUpcomingAppointments,
  getAdminUpcomingAppointmentsSuccess,
  getAdminUpcomingAppointmentsError,
  getAdminAppointmentHistory,
  getAdminAppointmentHistorySuccess,
  getAdminAppointmentHistoryError,
  getAdminAppointmentsBox,
  getAdminAppointmentsBoxSuccess,
  getAdminAppointmentsBoxError,
  getAdminUpcomingAppointmentsBox,
  getAdminUpcomingAppointmentsBoxSuccess,
  getAdminUpcomingAppointmentsBoxError,
} = Slice.actions;
export default Slice.reducer;
