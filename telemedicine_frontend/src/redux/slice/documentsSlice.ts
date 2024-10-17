import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export interface InitialStateDocuments {
  data:any
  list:string[]
}

const initialState: InitialStateDocuments = {
  data:0,
  list:[]
};

const Slice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    uploadDocument: (
      state: InitialStateDocuments,
      action: PayloadAction<{appointmentId:number,userID:number,formData:FormData,fileType:string;}>
    ) => {
      
    },
    uploadDocumentSuccess: (
      state: InitialStateDocuments,
      action: PayloadAction<any>
    ) => {
      toast.success("Successfully Uploaded");
    },
    uploadDocumentError: (
      state: InitialStateDocuments,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    getUserDocuments: (
      state: InitialStateDocuments,
      action: PayloadAction<{id:number}>
    ) => {
      
    },
    getUserDocumentsSuccess: (
      state: InitialStateDocuments,
      action: PayloadAction<string[]>
    ) => {
      state.list=action.payload;
    },
    getUserDocumentsError: (
      state: InitialStateDocuments,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },


  },
});

export const {
    uploadDocument,
    uploadDocumentSuccess,
    uploadDocumentError,
    getUserDocuments,
    getUserDocumentsSuccess,
    getUserDocumentsError,
} = Slice.actions;
export default Slice.reducer;
