import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface User {
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
export interface InitialStateUsers {
  users: User[];
  userProfile:{id:number;
    user:User;
    profilePic:string;
    createdDate:string;
  } | null;
  userProviderProfileString:string;
  updatingProfilePic:boolean;
  prescriptionUserProfile:{id:number;
    user:User;
    profilePic:string;
    createdDate:string;
  } | null;
  updatingPrescriptionUserProfilePic:boolean;
  adminUser:User | null;
}

const initialState: InitialStateUsers = {
  users: [],
  adminUser:null,
  userProfile: null,
  updatingProfilePic:false,
  prescriptionUserProfile:null,
  updatingPrescriptionUserProfilePic:false,
  userProviderProfileString:"",
};

const Slice = createSlice({
  name: "users",
  initialState,
  reducers: {



    getAdminUser: (
      state: InitialStateUsers,
      action: PayloadAction<number>
    ) => {
      
    },
    getAdminUserSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<User>
    ) => {
        state.adminUser=action.payload;
    },
    getAdminUserError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      console.log("aaaaaaaaaaaaaaaaaaaa");
    },


    getUserProviderProfilePicString: (
      state: InitialStateUsers,
      action: PayloadAction<number>
    ) => {
      
    },
    getUserProviderProfilePicStringSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<string>
    ) => {
        state.userProviderProfileString=action.payload;
    },
    getUserProviderProfilePicStringError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      console.log("aaaaaaaaaaaaaaaaaaaa");
    },

    getPrescriptionPatientUserProfilePic: (
      state: InitialStateUsers,
      action: PayloadAction<number>
    ) => {
      
    },
    getPrescriptionPatientUserProfilePicSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<{id:number;
        user:User;
        profilePic:string;
        createdDate:string;
      }>
    ) => {
        state.prescriptionUserProfile=action.payload;
    },
    getPrescriptionPatientUserProfilePicError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      console.log("aaaaaaaaaaaaaaaaaaaa");
    },


    getUserProfilePic: (
      state: InitialStateUsers,
      action: PayloadAction<number>
    ) => {
      
    },
    getUserProfilePicSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<{id:number;
        user:User;
        profilePic:string;
        createdDate:string;
      }>
    ) => {
        state.userProfile=action.payload;
    },
    getUserProfilePicError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      console.log("aaaaaaaaaaaaaaaaaaaa");
    },


    uploadUserProfilePic: (
      state: InitialStateUsers,
      action: PayloadAction<{id:number,formData:FormData}>
    ) => {
      state.updatingProfilePic=true
     
    },
    uploadUserProfilePicSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<{id:number;
        user:User;
        profilePic:string;
        createdDate:string;
      }>
    ) => {
      state.updatingProfilePic=false;
        state.userProfile=action.payload;
    },
    uploadUserProfilePicError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      state.updatingProfilePic=false;
      alert(action.payload.message);
    },

    
    getAllUsers: (
      state: InitialStateUsers
    ) => {},
    getAllUsersSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<User[]>
    ) => {
        state.users=action.payload;
    },
    getAllUsersError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },



    deleteUser: (
      state: InitialStateUsers,
      action: PayloadAction<number>
    ) => {},
    deleteUserSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<User>
    ) => {
      state.users=state.users.filter((user)=> user.userID!==action.payload.userID);
    },
    deleteUserError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },


    updateUser: (
      state: InitialStateUsers,
      action: PayloadAction<User>
    ) => {},
    updateUserSuccess: (
      state: InitialStateUsers,
      action: PayloadAction<User>
    ) => {
      state.users.map((user)=> {
        if(user.userID==action.payload.userID){
          user.address=action.payload.address;
          user.cityName=action.payload.cityName;
          user.countryName=action.payload.countryName;
          user.email=action.payload.email;
          user.firstName=action.payload.firstName;
          user.lastName=action.payload.lastName;
          user.password=action.payload.password;
          user.phone=action.payload.phone;
          user.role=action.payload.role;
          user.stateName=action.payload.stateName;
          user.username=action.payload.username;
        }
      });
    },
    updateUserError: (
      state: InitialStateUsers,
      action: PayloadAction<{ message: string }>
    ) => {
      alert("something went wrong");
    },

    
  },
});

export const {
    getAllUsers,
    getAllUsersSuccess,
    getAllUsersError,
    deleteUser,
    deleteUserSuccess,
    deleteUserError,
    updateUser,
    updateUserSuccess,
    updateUserError,
    getUserProfilePic,
    getUserProfilePicSuccess,
    getUserProfilePicError,
    uploadUserProfilePic,
    uploadUserProfilePicSuccess,
    uploadUserProfilePicError,
    getPrescriptionPatientUserProfilePic,
    getPrescriptionPatientUserProfilePicSuccess,
    getPrescriptionPatientUserProfilePicError,
    getUserProviderProfilePicString,
    getUserProviderProfilePicStringSuccess,
    getUserProviderProfilePicStringError,
    getAdminUser,
    getAdminUserSuccess,
    getAdminUserError,
} = Slice.actions;
export default Slice.reducer;
