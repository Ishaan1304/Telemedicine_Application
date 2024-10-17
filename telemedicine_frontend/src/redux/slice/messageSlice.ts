import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Message {
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

export interface InitialStateMessage {
  message: Message[];
  listOfPatients: User[];
  initialMessages:Message[];
  listOfProviders: User[];
  initialMessagesPatient:Message[];
  listOfUsers:User[];
  initialMessagesAdmin:Message[]
}

const initialState: InitialStateMessage = {
  message: [],
  listOfPatients: [],
  initialMessages:[],
  listOfProviders: [],
  initialMessagesPatient:[],
  listOfUsers:[],
  initialMessagesAdmin:[],
};

const Slice = createSlice({
  name: "message",
  initialState,
  reducers: {


    getMessageAdminInitial: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getMessageAdminInitialSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: Message[] }>
    ) => {
      state.initialMessagesAdmin = action.payload.data;
    },
    getMessageAdminInitialError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},


    getMessageProviderInitial: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getMessageProviderInitialSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: Message[] }>
    ) => {
      state.initialMessages = action.payload.data;
    },
    getMessageProviderInitialError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},


    getMessagePatientInitial: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getMessagePatientInitialSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: Message[] }>
    ) => {
      state.initialMessagesPatient = action.payload.data;
    },
    getMessagePatientInitialError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},



    getListOfUsers: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getListOfUsersSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: User[] }>
    ) => {
      state.listOfUsers = action.payload.data;
    },
    getListOfUsersError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},


    getListOfPatients: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getListOfPatientsSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: User[] }>
    ) => {
      state.listOfPatients = action.payload.data;
    },
    getListOfPatientsError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},



    getListOfProviders: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getListOfProvidersSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: User[] }>
    ) => {
      state.listOfProviders = action.payload.data;
    },
    getListOfProvidersError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},

    getMessage: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number }>
    ) => {},
    getMessageSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<{ data: any }>
    ) => {
      state.message = action.payload.data;
    },
    getMessageError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},
    sendMessage: (
      state: InitialStateMessage,
      action: PayloadAction<{ id: number; message: string }>
    ) => {},
    sendMessageSuccess: (
      state: InitialStateMessage,
      action: PayloadAction<Message>
    ) => {
      state.initialMessages.push(action.payload);
      toast.success("Sent Successfully");
    },
    sendMessageError: (
      state: InitialStateMessage,
      action: PayloadAction<{ message: string }>
    ) => {},
  },
});

export const {
  getMessage,
  getMessageSuccess,
  getMessageError,
  sendMessage,
  sendMessageSuccess,
  sendMessageError,
  getListOfPatients,
  getListOfPatientsSuccess,
  getListOfPatientsError,
  getMessageProviderInitial,
  getMessageProviderInitialSuccess,
  getMessageProviderInitialError,
  getMessagePatientInitial,
  getMessagePatientInitialSuccess,
  getMessagePatientInitialError,
  getListOfProviders,
  getListOfProvidersSuccess,
  getListOfProvidersError,
  getMessageAdminInitial,
  getMessageAdminInitialSuccess,
  getMessageAdminInitialError,
  getListOfUsers,
  getListOfUsersSuccess,
  getListOfUsersError,
} = Slice.actions;
export default Slice.reducer;
