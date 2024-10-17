
import { createSlice, current, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


export interface InitialState {
    loggedIn: boolean;
    token: string;
    role:string;
    errorMessage:string | null;
    id:number;
    errMess:string | null;
    loading: boolean;
}

const initialState: InitialState = {
    loggedIn: false,
    token: "",
    role:"",
    errorMessage:null,
    id:0,
    errMess:null,
    loading: false,
};

const Slice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginUser:(state:InitialState,action:PayloadAction<{email:string;password:string}>)=>{
            state.loading = true;
        },
        loginSuccessful:(state:InitialState,action:PayloadAction<{id: number; role: string; token: string;}>)=>{
            state.loading = false; 
            state.loggedIn=true;
            state.role=action.payload.role;
            state.token=action.payload.token;
            state.id=action.payload.id;
            state.errorMessage=null;
            state.errMess="Success Login"
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("role",action.payload.role);
            localStorage.setItem("id",action.payload.id.toString());
            if(action.payload.role==="PATIENT") localStorage.setItem('modalShown', 'false');
        },
        loginError:(state:InitialState,action:PayloadAction<{message: string;}>)=>{
            state.loading = false; 
            state.loggedIn=false;
            state.role=""
            state.token=""
            state.errMess="Error Login"
            state.errorMessage=action.payload.message;
        },
        resetErrMess:(state:InitialState)=>{
            state.errMess=null;
        },

        logoutUser:(state:InitialState,action:PayloadAction<{token: string;}>)=>{
            
        },
        logoutSuccessful:(state:InitialState,action:PayloadAction<{message: string;}>)=>{
            
            state.loggedIn=false;
            state.role="";
            state.token="";
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('id');
            localStorage.removeItem('modalData');
            if(state.role==="PATIENT") localStorage.removeItem('modalShown');
            toast.success("Successfully Logout");
        },
        logoutError:(state:InitialState,action:PayloadAction<{message: string;}>)=>{
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
        
    }
});

export const { loginUser,loginError,loginSuccessful,logoutUser,logoutSuccessful,logoutError,resetErrMess} = Slice.actions
export default Slice.reducer;