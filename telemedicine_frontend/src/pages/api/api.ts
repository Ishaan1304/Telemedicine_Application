import { PrescriptionAdd } from "@/components/provider_home/Prescription/PrescriptionForm";
import { getTodayDateWithTime } from "@/constants/helper";
import { SERVER_URL } from "@/constants/ServerPath";
import { UserFormData } from "@/redux/saga/registerSaga";
import { User } from "@/redux/slice/usersSlice";
import { start } from "repl";

export const apiLogin = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await fetch(SERVER_URL + "/api/v1/auth/authenticate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const apiLogout = async (payload: { token: string }) => {
  const response = await fetch(SERVER_URL + "/api/v1/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response;
  } else {
    throw new Error("Logout failed");
  }
};

export const getUserProfile = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/user/getUser/" + payload.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getMessages = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/message/get/" + payload.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const sendMessageAPI = async (payload: {
  id: number;
  message: string;
}) => {
  const messageToSend = {
    sender: {
      userID: Number(localStorage.getItem("id")),
    },
    recipient: {
      userID: payload.id,
    },
    messageContent: payload.message,
  };

  const response = await fetch(SERVER_URL + "/message/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(messageToSend),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getPatientProfileAPI = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/patient/user/" + payload.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getProvidersProfileAPI = async () => {
  const response = await fetch(SERVER_URL + "/provider/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getUpcomingAppointments = async (payload: { id: number }) => {
  const response = await fetch(
    SERVER_URL + "/appointments/upcoming/" + payload.id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const deleteAppointmentByAppointmentID = async (payload: {
  id: number;
}) => {
  const response = await fetch(
    SERVER_URL + "/appointments/delete/" + payload.id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getPrescribedProvidersAPI = async (payload: {
  patientID: number;
}) => {
  const response = await fetch(
    SERVER_URL + "/prescriptions/providers/" + payload.patientID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getProviderPrescriptionAPI = async (payload: {
  providerID: number;
  patientID: number;
}) => {
  const response = await fetch(
    SERVER_URL +
      "/prescriptions/provider/" +
      payload.providerID +
      "/patient/" +
      payload.patientID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const uploadDocumentAPI = async (payload: {appointmentId:number,userID:number,formData:FormData,fileType:string;}) => {
  try {
    const response = await fetch(`${SERVER_URL}/file/upload/${payload.userID}/${payload.appointmentId}?fileType=${payload.fileType}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: payload.formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    return response.json();
  } catch (error) {
    throw new Error("Upload failed");
  }
};

export const getRegisterPatientAPI = async (payload: UserFormData) => {
  

  const registerObject = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    username: payload.username,
    password: payload.password,
    role: payload.role,
    phone: payload.phone,
    countryName: payload.countryName,
    stateName: payload.stateName,
    cityName: payload.cityName,
    address: payload.address,
  };



  const response = await fetch(SERVER_URL + "/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerObject),
  });
  
  const responseJson = await response.json();



  const patientProfile = {
    dateOfBirth: "",
    gender: payload.gender,
    medicalHistory: "",
    allergies: "",
    medications: "",
    user: {
      userID: responseJson.id,
    },
  };

  

  const responseOne = await fetch(SERVER_URL + "/patient/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + responseJson.token,
    },
    body: JSON.stringify(patientProfile),
  });

  const formData = new FormData();
  formData.append("image", payload.image);

  const responseUpload = await fetch(
    `${SERVER_URL}/userProfile/upload/${responseJson.id}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + responseJson.token,
      },
      body: formData,
    }
  );

  // if (!responseUpload.ok) {
  //   const errorData = await responseUpload.json();
  //   throw new Error(errorData.message || "Upload failed");
  // }
  //const resultUpload = await responseUpload.json();
  return responseOne.json();
};



export const getRegisterProvierAPI = async (payload: UserFormData) => {


  const registerObject = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    username: payload.username,
    password: payload.password,
    role: payload.role,
    phone: payload.phone,
    countryName: payload.countryName,
    stateName: payload.stateName,
    cityName: payload.cityName,
    address: payload.address,
  };

  


  const response = await fetch(SERVER_URL + "/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerObject),
  });

  const responseJson = await response.json();

  const providerProfile = {
    gender: payload.gender,
    specialty: "",
    qualifications: "",
    consultationFee: 0,
    availableFrom:"",
    availableTo:"",
    user: {
      userID: responseJson.id,
    },
  };

 

  const responseOne = await fetch(SERVER_URL + "/provider/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + responseJson.token,
    },
    body: JSON.stringify(providerProfile),
  });

  const formData = new FormData();
  formData.append("image", payload.image);

  const responseUpload = await fetch(
    `${SERVER_URL}/userProfile/upload/${responseJson.id}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + responseJson.token,
      },
      body: formData,
    }
  );

  // if (!responseUpload.ok) {
  //   const errorData = await responseUpload.json();
  //   throw new Error(errorData.message || "Upload failed");
  // }
  // const resultUpload = await responseUpload.json();
  return responseOne.json();
};

// export const getRegisterProviderAPI = async (payload: UserFormData) => {
//   const registerObject = {
//     firstName: payload.firstName,
//     lastName: payload.lastName,
//     email: payload.email,
//     username: payload.username,
//     password: payload.password,
//     role: payload.role,
//     phone: payload.phone,
//     countryName: payload.countryName,
//     stateName: payload.stateName,
//     cityName: payload.cityName,
//     address: payload.address,
//   };

//   const response = await fetch(SERVER_URL + "/api/v1/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(registerObject),
//   });

//   const responseJson = await response.json();

//   const providerProfile = {
//     specialty: "",
//     gender: payload.gender,
//     qualifications: "",
//     consultationFee: 0,
//     availableFrom: "",
//     availableTo: "",
//     user: {
//       userID: responseJson.id,
//     },
//   };

//   const responseOne = await fetch(SERVER_URL + "/provider/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + responseJson.token,
//     },
//     body: JSON.stringify(providerProfile),
//   });

//   return responseOne.json();
// };

export const getPatientsAPI = async () => {
  const response = await fetch(SERVER_URL + "/patient/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const fetchUserPatient = async (userId: string, token: string) => {
  const response = await fetch(`${SERVER_URL}/patient/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const updateUserPatient = async (
  userId: string,
  token: string,
  userToUpdate: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
    phone: string;
    cityName: string;
    stateName: string;
    countryName: string;
    address: string;
  }
) => {
  const userToUpdateData = {
    firstName: userToUpdate.firstName,
    lastName: userToUpdate.lastName,
    email: userToUpdate.email,
    username: userToUpdate.username,
    password: userToUpdate.password,
    role: userToUpdate.role,
    phone: userToUpdate.phone,
    cityName: userToUpdate.cityName,
    stateName: userToUpdate.stateName,
    countryName: userToUpdate.countryName,
    address: userToUpdate.address,
  };

  const response = await fetch(`${SERVER_URL}/user/updateUser/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userToUpdateData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const fetchUserProvider = async (userId: string, token: string) => {
  const response = await fetch(`${SERVER_URL}/provider/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const updateUserProvider = async (
  userId: string,
  token: string,
  userToUpdate: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: string;
    phone: string;
    cityName: string;
    stateName: string;
    countryName: string;
    address: string;
  }
) => {
  const userToUpdateData = {
    firstName: userToUpdate.firstName,
    lastName: userToUpdate.lastName,
    email: userToUpdate.email,
    username: userToUpdate.username,
    password: userToUpdate.password,
    role: userToUpdate.role,
    phone: userToUpdate.phone,
    cityName: userToUpdate.cityName,
    stateName: userToUpdate.stateName,
    countryName: userToUpdate.countryName,
    address: userToUpdate.address,
  };

  const response = await fetch(`${SERVER_URL}/user/updateUser/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userToUpdateData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const fetchPatientProfile = async (patientID: number, token: string) => {
  const response = await fetch(`${SERVER_URL}/patient/user/${patientID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const updatePatientProfile = async (
  patientID: number,
  token: string,
  patientData: any
) => {
  const response = await fetch(`${SERVER_URL}/patient/update/${patientID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const fetchProviderData = async (id: string, token: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/provider/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateProviderData = async (
  providerID: number,
  data: any,
  token: string
) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/provider/update/${providerID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const getProviderProfileAPI = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/provider/user/" + payload.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getUpcomingAppointmentsOnProvider = async (payload: {
  id: number;
}) => {
  const token = localStorage.getItem("token");
  let apiPre = "http://localhost:8080/provider/user/" + payload.id;
  const responsePre = await fetch(apiPre, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!responsePre.ok) {
    console.error("Error fetching data:", responsePre.statusText);
    return;
  }
  const resultPre = await responsePre.json();

  const response = await fetch(
    SERVER_URL + "/appointments/upcomingProvider/" + resultPre.providerID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const updateAppointmentAPI = async (payload: {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
}) => {
  try {
    const dataToUpdate = {
      patientProfile: {
        patientID: payload.patientProfile.patientID,
      },
      providerProfile: {
        providerID: payload.providerProfile.providerID,
      },
      startTime: payload.startTime,
      endTime: payload.endTime,
    };

    

    const response = await fetch(
      SERVER_URL + "/appointments/update/" + payload.appointmentID,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataToUpdate),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const addPrescriptionAPI = async (payload: PrescriptionAdd[]) => {
  const response = await fetch(SERVER_URL + "/prescriptions/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });

  const responseOne = await fetch(
    SERVER_URL + "/appointments/done/" + payload[0].appointment.appointmentID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAllProviderAppointmentsAPI = async (payload: {
  id: number;
}) => {
  const response = await fetch(
    SERVER_URL + "/appointments/getAll/" + payload.id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const bookAppointment = async (data: any) => {
  const response = await fetch("http://localhost:8080/appointments/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export const addConsultationNoteAPI = async (payload: {
  patientID: number;
  providerID: number;
  notes: string;
}) => {
  const objToAdd = {
    patientProfile: {
      patientID: payload.patientID,
    },
    providerProfile: {
      providerID: payload.providerID,
    },
    notes: payload.notes,
  };

  const response = await fetch(SERVER_URL + "/notes/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(objToAdd),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAllConsultationNotesByPatientAndProviderAPI = async (payload: {
  patientID: number;
  providerID: number;
}) => {
  const response = await fetch(
    SERVER_URL +
      "/notes/search/" +
      payload.patientID +
      "/" +
      payload.providerID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getConsultationNotesByPatientAndProviderAPI = async (payload: {
  patientID: number;
  providerID: number;
}) => {
  const response = await fetch(
    SERVER_URL +
      "/notes/recent/" +
      payload.patientID +
      "/" +
      payload.providerID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const deleteConsultationNoteAPI = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/notes/" + payload.id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getUserDocumentsAPI = async (payload: { id: number }) => {
  const response = await fetch(SERVER_URL + "/file/images/user/" + payload.id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAllAppointmentsAPI = async () => {
  const response = await fetch(SERVER_URL + "/appointments/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAllUsersAPI = async () => {
  const response = await fetch(SERVER_URL + "/user/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAllUpcomingAppointmentsAPI = async () => {
  const response = await fetch(SERVER_URL + "/appointments/upcoming", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const deleteUserAPI = async (payload: number) => {
  const response = await fetch(SERVER_URL + "/user/deleteUser/" + payload, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const updateUserAPI = async (payload: User) => {
  const response = await fetch(SERVER_URL + "/user/update/" + payload.userID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getAvailableTimeSlotsAPI = async (payload: {
  id: number;
  start: string;
  end: string;
  date:string;
}) => {

  const objToSend = {
    date:payload.date,
    startTime: payload.start,
    endTime: payload.end,
  };
  const response = await fetch(
    SERVER_URL + "/appointments/provider/" + payload.id + "/available-times",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(objToSend),
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getProviderUpcomingAppointmentsAPI = async (payload: {
  id: number;
  page: number;
  rowsPerPage: number;
  search: string;
  startDate: string;
  endDate: string;
  emergency: boolean;
  status: string;
}) => {
  const token = localStorage.getItem("token");
  let apiPre = "http://localhost:8080/provider/user/" + payload.id;
  const responsePre = await fetch(apiPre, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!responsePre.ok) {
    console.error("Error fetching data:", responsePre.statusText);
    return;
  }
  const resultPre = await responsePre.json();

  //let api = `http://localhost:8080/appointments/page/upcomingProvider/${resultPre.providerID}?pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}&search=${payload.search}`;

  let api = `http://localhost:8080/appointments/page/upcoming/filter/${resultPre.providerID}?startDate=${payload.startDate}&endDate=${payload.endDate}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}&search=${payload.search}&emergency=${payload.emergency}&status=${payload.status}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getAdminUpcomingAppointmentsAPI = async (payload: {
  page: number;
  rowsPerPage: number;
  search: string;
  startDate: string;
  endDate: string;
  emergency: boolean;
  status: string;
}) => {
  const token = localStorage.getItem("token");
 

  //let api = `http://localhost:8080/appointments/page/upcomingProvider/${resultPre.providerID}?pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}&search=${payload.search}`;

  let api = `http://localhost:8080/appointments/page/upcoming/filter/admin?startDate=${payload.startDate}&endDate=${payload.endDate}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}&search=${payload.search}&emergency=${payload.emergency}&status=${payload.status}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};




export const getProviderTotalPatientsAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let apiPre = "http://localhost:8080/provider/user/" + payload.id;
  const responsePre = await fetch(apiPre, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!responsePre.ok) {
    console.error("Error fetching data:", responsePre.statusText);
    return;
  }
  const resultPre = await responsePre.json();

  const response = await fetch(
    SERVER_URL +
      "/appointments/patients/count/provider/" +
      resultPre.providerID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getProviderTodaysPatientsAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let apiPre = "http://localhost:8080/provider/user/" + payload.id;
  const responsePre = await fetch(apiPre, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!responsePre.ok) {
    console.error("Error fetching data:", responsePre.statusText);
    return;
  }
  const resultPre = await responsePre.json();

  const response = await fetch(
    SERVER_URL +
      "/appointments/patients/today/count/provider/" +
      resultPre.providerID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};

export const getProfilePicAPI = async (payload: number) => {
  const string = SERVER_URL + "/userProfile/images/user/" + payload;
  const response = await fetch(
    SERVER_URL + "/userProfile/images/user/" + payload,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Fetching failed");
  }
};


export const getProfilePicStringAPI = async (payload: number) => {
  const string = SERVER_URL + "/userProfile/images/user/" + payload;
  const response = await fetch(
    SERVER_URL + "/userProfile/images/user/" + payload,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const result = await response.json();
  return result.profilePic;
};



export const uploadProfilePicAPI = async (payload: {
  id: number;
  formData: FormData;
}) => {
  try {
    const response = await fetch(
      `${SERVER_URL}/userProfile/upload/${payload.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: payload.formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }
    const result = await response.json();

    const responseOne = await fetch(
      SERVER_URL + "/userProfile/images/user/" + payload.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (responseOne.ok) {
      return responseOne.json();
    } else {
      throw new Error("Fetching failed");
    }
  } catch (error) {
    throw new Error("Upload failed");
  }
};

export const getProviderTotalPatientsDistinctAPI = async (payload: {
  id: number;
  page: number;
  rowsPerPage: number;
  search: string;
  gender: string;
  allergies: string;
  disease: string;
}) => {
  const token = localStorage.getItem("token");
  let apiTest = `http://localhost:8080/appointments/providers/${payload.id}/latestAppointments?firstName=${payload.search}&gender=${payload.gender}&allergies=${payload.allergies}&disease=${payload.disease}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}`;
  //let api = `http://localhost:8080/appointments/page/users/${payload.id}?pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}&search=${payload.search}`;
  const response = await fetch(apiTest, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();

  return result;
};


export const fetchMedicalDocumentsByAppointmentId = async (appointmentId:number) => {
  const response = await fetch(`http://localhost:8080/file/by-appointment/${appointmentId}`);

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  return response.json();
};

export const getProviderPreviousAppointmentsAPI = async (payload: number) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/completed/patient/previous/${payload}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();

  return result;
};

export const getListOfPatientsAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/user/except/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};

export const getMessageProviderInitialAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/message/user/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};

export const getProviderAppointmentHistoryAPI = async (payload: {
  id: number;
  page: number;
  rowsPerPage: number;
  search: string;
  startDate: string;
  endDate: string;
  status: string;
  disease: string;
}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/history/${payload.id}?startDate=${payload.startDate}&endDate=${payload.endDate}&disease=${payload.disease}&status=${payload.status}&fullName=${payload.search}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getPatientAppointmentHistoryAPI = async (payload: {
  id: number;
  page: number;
  rowsPerPage: number;
  search: string;
  startDate: string;
  endDate: string;
  status: string;
  disease: string;
}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/history/patient/${payload.id}?startDate=${payload.startDate}&endDate=${payload.endDate}&disease=${payload.disease}&status=${payload.status}&fullName=${payload.search}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};



export const getAdminAppointmentHistoryAPI = async (payload: {
  page: number;
  rowsPerPage: number;
  search: string;
  startDate: string;
  endDate: string;
  status: string;
  disease: string;
}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/history/admin?startDate=${payload.startDate}&endDate=${payload.endDate}&disease=${payload.disease}&status=${payload.status}&fullName=${payload.search}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const updateProfileAPI = async (payload: {
  user: {
    userID: number;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    cityName: string;
    stateName: string;
    countryName: string;
  };
  providerID: number;
  gender: string;
  availableFrom: string;
  availableTo: string;
  consultationFee: number;
  specialty: string;
  qualifications: string;
}) => {
  const objToUpdate = {
    firstName: payload.user.firstName,
    lastName: payload.user.lastName,
    phone: payload.user.phone,
    cityName: payload.user.cityName,
    stateName: payload.user.stateName,
    countryName: payload.user.countryName,
    address: payload.user.address,
  };

  const response = await fetch(
    SERVER_URL + "/user/update/" + payload.user.userID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(objToUpdate),
    }
  );
  const result = response.json();

  const objToUpdateOne = {
    specialty: payload.specialty,
    gender: payload.gender,
    qualifications: payload.qualifications,
    consultationFee: payload.consultationFee,
    availableFrom: payload.availableFrom,
    availableTo: payload.availableTo,
    user: {
      userID: payload.user.userID,
    },
  };

  const responseOne = await fetch(
    SERVER_URL + "/provider/update/" + payload.providerID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(objToUpdateOne),
    }
  );
  const resultOne = responseOne.json();
  return resultOne;
};


export const updatePatientProfileAPI = async (payload: {
  user: {
    userID: number;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    cityName: string;
    stateName: string;
    countryName: string;
  };
  patientID: number;
  gender: string;
  dateOfBirth: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
}) => {

  const objToUpdate = {
    firstName: payload.user.firstName,
    lastName: payload.user.lastName,
    phone: payload.user.phone,
    cityName: payload.user.cityName,
    stateName: payload.user.stateName,
    countryName: payload.user.countryName,
    address: payload.user.address,
  };

  const response = await fetch(
    SERVER_URL + "/user/update/" + payload.user.userID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(objToUpdate),
    }
  );
  const result = response.json();

  const objToUpdateOne = {
    dateOfBirth: payload.dateOfBirth,
    gender: payload.gender,
    medicalHistory: payload.medicalHistory,
    allergies: payload.allergies,
    medications: payload.medications,
    user: {
      userID: payload.user.userID,
    },
  };

  const responseOne = await fetch(
    SERVER_URL + "/patient/update/" + payload.patientID,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(objToUpdateOne),
    }
  );
  const resultOne = responseOne.json();
  return resultOne;
};

export const getListOfUsersAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/user/except/admin/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};

export const getListOfProvidersAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/user/except/patient/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};

export const getMessagePatientInitialAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/message/user/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};



export const getMessageAdminInitialAPI = async (payload: { id: number }) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/message/user/${payload.id}`;
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getProviderListAPI = async (payload:{
  page: number;
  rowsPerPage: number;
  search: string;
  disease: string;
  gender: string;
  cityName: string;
  speciality: string;
}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/provider/filter?cityName=${payload.cityName}&specialty=${payload.speciality}&gender=${payload.gender}&disease=${payload.disease}&firstName=${payload.search}&pageNumber=${payload.page}&pageSize=${payload.rowsPerPage}`;

  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getPrescriptionByAppointmentIDAPI = async (payload:{
  id: number;
}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/prescriptions/appointment/${payload.id}`;
  
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getAdminUserAPI = async (payload:number) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/users/get/${payload}`;
  
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getAdminPatientsAPI= async (payload:{name:string;cityName:string;dateOfBirth:string;page:number;size:number;}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/patient/search?name=${payload.name}&cityName=${payload.cityName}&dateOfBirth=${payload.dateOfBirth}&page=${payload.page}&size=${payload.size}`;

  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};


export const getAdminProvidersAPI= async (payload:{name:string;cityName:string;page:number;size:number;}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/provider/search?name=${payload.name}&cityName=${payload.cityName}&page=${payload.page}&size=${payload.size}`;
  
  const response = await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  return result;
};



export const updateAdminPatientsAPI= async (payload:{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/user/update/${payload.userID}`;
  

  const objToUpdate={
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    cityName:payload.cityName,
    stateName:payload.stateName,
    countryName:payload.coutryName,
    address: payload.address,
  }

  const response = await fetch(api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objToUpdate),
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  
  try {
    const patientProfile = await getPatientProfileAPI({ id: payload.userID });
    return patientProfile; 
  } catch (error) {
    console.error("Failed to fetch patient profile:");
  }

};


export const updateAdminProvidersAPI= async (payload:{userID:number;firstName:string;lastName:string;email:string;phone:number;cityName:string;stateName:string;coutryName:string;address:string;}) => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/user/update/${payload.userID}`;
  

  const objToUpdate={
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    cityName:payload.cityName,
    stateName:payload.stateName,
    countryName:payload.coutryName,
    address: payload.address,
  }

  const response = await fetch(api, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objToUpdate),
  });
  if (!response.ok) {
    console.error("Error fetching data:", response.statusText);
    return;
  }
  const result = await response.json();
  
  try {
    const providerProfile = await getProviderProfileAPI({ id: payload.userID });
    return providerProfile; 
  } catch (error) {
    console.error("Failed to fetch patient profile:");
  }

};

export const getAdminPatientsBoxAPI= async () => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/patient/count`;
  
  const response = await fetch(api, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
  });
  if (!response.ok) {
   console.error("Error fetching data:", response.statusText);
   return;
 }
  const result = await response.json();
  return result;
};
export const getAdminProvidersBoxAPI= async () => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/provider/count`;

  const response = await fetch(api, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
  });
  if (!response.ok) {
   console.error("Error fetching data:", response.statusText);
   return;
 }
  const result = await response.json();
  return result;
};

export const getAdminAppointmentsBoxAPI= async () => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/count`;

  const response = await fetch(api, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
  });
  if (!response.ok) {
   console.error("Error fetching data:", response.statusText);
   return;
 }
  const result = await response.json();
  return result;
};


export const getAdminUpcomingAppointmentsBoxAPI= async () => {
  const token = localStorage.getItem("token");
  let api = `http://localhost:8080/appointments/upcoming/count`;

  const response = await fetch(api, {
   method: "GET",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
  });
  if (!response.ok) {
   console.error("Error fetching data:", response.statusText);
   return;
 }
  const result = await response.json();
  return result;
};