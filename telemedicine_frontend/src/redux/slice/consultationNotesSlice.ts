import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConsultationNote = {
  consultationNoteID: number;
  patientProfile: {
    patientID: number;
  };
  providerProfile: {
    providerID: number;
  };
  notes: string;
  dateTime: string;
};

export interface InitialStateConsultationNotes {
  data: ConsultationNote[];
  addNote: ConsultationNote;
  getConsultationNote:string;
}

const initialState: InitialStateConsultationNotes = {
  data: [],
  addNote: {
    consultationNoteID: 0,
    patientProfile: {
      patientID: 0,
    },
    providerProfile: {
      providerID: 0,
    },
    notes: "",
    dateTime: "",
  },
  getConsultationNote:"",
};

const Slice = createSlice({
  name: "consultationNote",
  initialState,
  reducers: {
    addConsultationNote: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{
        patientID: number;
        providerID: number;
        notes: string;
      }>
    ) => {},
    addConsultationNoteSuccess: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<ConsultationNote>
    ) => {
      state.addNote = action.payload;
      state.data.push(action.payload);
    },
    addConsultationNoteError: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{ message: string }>
    ) => {
      
    },


    getConsultationNotesByPatientAndProvider: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{
        patientID: number;
        providerID: number;
      }>
    ) => {},
    getConsultationNotesByPatientAndProviderSuccess: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<ConsultationNote>
    ) => {
      state.getConsultationNote = action.payload.notes;
    },
    getConsultationNotesByPatientAndProviderError: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{ message: string }>
    ) => {
      
    },

    

    getAllConsultationNotesByPatientAndProvider: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{
        patientID: number;
        providerID: number;
      }>
    ) => {},
    getAllConsultationNotesByPatientAndProviderSuccess: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<ConsultationNote[]>
    ) => {
      state.data = action.payload;
    },
    getAllConsultationNotesByPatientAndProviderError: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{ message: string }>
    ) => {
      
    },

    deleteConsultationNote: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{
        id: number;
      }>
    ) => {},
    deleteConsultationNoteSuccess: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<ConsultationNote>
    ) => {
      state.data = state.data.filter(
        (note) => note.consultationNoteID !== action.payload.consultationNoteID
      );
    },
    deleteConsultationNoteError: (
      state: InitialStateConsultationNotes,
      action: PayloadAction<{ message: string }>
    ) => {
      
    },
  },
});

export const {
  addConsultationNoteSuccess,
  addConsultationNote,
  addConsultationNoteError,
  getAllConsultationNotesByPatientAndProvider,
  getAllConsultationNotesByPatientAndProviderSuccess,
  getAllConsultationNotesByPatientAndProviderError,
  deleteConsultationNote,
  deleteConsultationNoteSuccess,
  deleteConsultationNoteError,
  getConsultationNotesByPatientAndProvider,
  getConsultationNotesByPatientAndProviderSuccess,
  getConsultationNotesByPatientAndProviderError,
} = Slice.actions;
export default Slice.reducer;
