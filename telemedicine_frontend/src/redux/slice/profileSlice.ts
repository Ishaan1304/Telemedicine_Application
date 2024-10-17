
import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";


export interface InitialStateProfile {
    data: any;
}

const initialState: InitialStateProfile = {
    data:""
};

const Slice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        getProfile:(state:InitialStateProfile,action:PayloadAction<{id:number}>)=>{
        },
        getProfileSuccess:(state:InitialStateProfile,action:PayloadAction<{data: any;}>)=>{
            state.data=action.payload.data;
        },
        getProfileError:(state:InitialStateProfile,action:PayloadAction<{message: string;}>)=>{
        }
    }
});

export const { getProfile,getProfileSuccess,getProfileError } = Slice.actions
export default Slice.reducer;