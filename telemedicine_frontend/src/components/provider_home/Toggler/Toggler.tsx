import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Autocomplete,
  TextField,
  Grid,
  Box,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getRegisterPatient,
  InitialStateRegister,
  resetErrMess,
} from "@/redux/slice/registerSlice";
import { toast } from "react-toastify";
import styles from "./Toggler.module.css";
import { getPatients, InitialStatePatients } from "@/redux/slice/patientsSlice";
import {
  getProviderProfile,
  InitialStateProviderProfile,
} from "@/redux/slice/providerProfileSlice";
import { useRouter } from "next/router";

import { getAvailableTimeSlots } from "@/redux/slice/appointmentsSlice";

interface UserFormData {
  userID: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  gender: string;
  countryName: string;
  stateName: string;
  cityName: string;
  image: any;
}

export const ComponentA: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    userID: 0,
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    gender: "",
    countryName: "India",
    stateName: "Madhya Pradesh",
    cityName: "Ujjain",
    image: null,
  });

  const { errMess } = useAppSelector(
    (state: { register: InitialStateRegister }) => state.register
  );

  useEffect(() => {
    if (errMess !== null) {
      if (errMess === "Success Register") {
        // toast.success("Register successful!");
      } else if (errMess === "Error Register") {
        toast.error("Not Registered!");
      }
      dispatch(resetErrMess());
    }
  }, [errMess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    formData.role = "PATIENT";
    formData.username = makeid(10);
    
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key as keyof UserFormData]);
    }

    dispatch(getRegisterPatient(formData));
    setFormData({
      role: "",
      userID: 0,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      phone: "",
      address: "",
      gender: "",
      countryName: "India",
      stateName: "Madhya Pradesh",
      cityName: "Ujjain",
      image: null,
    });
  };

  function makeid(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <h4 className={styles.title} style={{ textAlign: "center" }}>
          Register User
        </h4>
        <form onSubmit={handleSubmit}>
          {(
            [
              "firstName",
              "lastName",
              "email",
              "password",
              "phone",
              "address",
            ] as Array<keyof UserFormData>
          ).map((field) => (
            <div key={field}>
              <input
                required
                type={
                  field === "password"
                    ? "password"
                    : field === "email"
                    ? "email"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className={styles.text_field}
              />
            </div>
          ))}
          <input type="hidden" name="username" value={makeid(10)} />
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={styles.text_field}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="countryName"
              value={formData.countryName}
              onChange={handleChange}
              className={styles.text_field}
              placeholder="Country"
            />
          </div>
          <div>
            <input
              type="text"
              name="stateName"
              value={formData.stateName}
              onChange={handleChange}
              className={styles.text_field}
              placeholder="State"
            />
          </div>
          <div>
            <input
              type="text"
              name="cityName"
              value={formData.cityName}
              onChange={handleChange}
              className={styles.text_field}
              placeholder="City"
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.text_field}
              style={{border:"none"}}
            />
          </div>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

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

interface PatientProfileResponse {
  patientID: number;
  dateOfBirth: string;
  gender: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  user: User;
}

interface ProviderProfile {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}

export const ComponentB: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<PatientProfileResponse | null>(null);
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>(
    []
  );
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [isEmergency, setIsEmergency] = useState("no");
  const [conditionDescription, setConditionDescription] = useState("");
  const [disease, setDisease] = useState<string>("");

  const patientProfiles = useAppSelector(
    (state: { patients: { patients: PatientProfileResponse[] } }) =>
      state.patients.patients
  );

  const providerProfile: ProviderProfile = useAppSelector(
    (state: { providerProfile: InitialStateProviderProfile }) =>
      state.providerProfile
  );

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(getPatients());
      dispatch(getProviderProfile({ id: +id }));
    }
  }, [dispatch]);

  const timeSlotsList = useAppSelector(
    (state) => state.appointments.availableTimeSlots
  );
 

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    
    if (providerProfile.providerID !== undefined) {
      
      dispatch(
        getAvailableTimeSlots({
          id: +providerProfile.providerID,
          start: providerProfile.availableFrom,
          end: providerProfile.availableTo,
          date: date,
        })
      );
    }
    setTimeSlots(timeSlotsList);
  };

  useEffect(() => {
    setTimeSlots(timeSlotsList);
  }, [timeSlotsList]);

  const [timeError, setTimeError] = useState<string>("");

  const handleBooking = () => {
    const isValid = validateTime(selectedStartTime, selectedEndTime);
    if (!isValid) {
      
      return;
    }

    if (value?.patientID !== undefined) {
      const appointmentData = {
        patientProfile: { patientID: +value.patientID },
        providerProfile: { providerID: providerProfile.providerID },
        startTime: `${selectedDate}T${selectedStartTime}:00`,
        endTime: `${selectedDate}T${selectedEndTime}:00`,
        description: conditionDescription,
        isEmergency: isEmergency === "true",
        fee: providerProfile.consultationFee,
        disease: disease,
      };
      const encodedData = encodeURIComponent(JSON.stringify(appointmentData));
      router.push(`/payment?data=${encodedData}`);
    }
  };

  
  const validateTime = (startTime: string, endTime: string) => {
    setTimeError("");
    let error = "";

    if (startTime && endTime) {
      const start = new Date(`${selectedDate}T${startTime}:00`);
      const end = new Date(`${selectedDate}T${endTime}:00`);
      const now = new Date();

      
      if (start < now) {
        error = "Start time cannot be in the past.";
      }
    
      else if (end < now) {
        error = "End time cannot be in the past.";
      }
      
      else if (start >= end) {
        error = "Start time must be earlier than end time.";
      } else {
        const diffInMinutes = (end.getTime() - start.getTime()) / 60000;

        // Check time difference
        if (diffInMinutes < 20 || diffInMinutes > 40) {
          error = "Allowed time difference is between 20 and 40 minutes.";
        }

       
        const isWithinTimeSlots = timeSlots.some((slot) => {
          const slotStart = new Date(slot.start);
          const slotEnd = new Date(slot.end);
         
          return start >= slotStart && end <= slotEnd;
        });

        if (!isWithinTimeSlots) {
          error = "Selected time must be within the available time slots.";
        }
      }
    }

    setTimeError(error);
    return error === "";
  };

  return (
    <>
      <Autocomplete
        options={patientProfiles}
        getOptionLabel={(option) => option.user.firstName}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by First Name"
            variant="outlined"
            size="small"
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Typography>
              {option.user.firstName} {option.user.lastName}
            </Typography>
          </li>
        )}
      />
      <Typography>Select Date</Typography>
      <TextField
        type="date"
        onChange={(e) => handleDateChange(e.target.value)}
        variant="outlined"
        inputProps={{
          min: today.toISOString().split("T")[0],
          max: tenDaysLater.toISOString().split("T")[0],
        }}
        sx={{ marginBottom: 2 }}
        size="small"
      />
      {selectedDate && timeSlots.length > 0 && (
        <Box>
          <Typography>Available Time Slots for {selectedDate}</Typography>
          <Grid container spacing={1}>
            {timeSlots.map((slot, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setSelectedStartTime(slot.start);
                    setSelectedEndTime(slot.end);
                  }}
                  size="small"
                >
                  {slot.start.substring(11)} - {slot.end.substring(11)}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Grid item xs={12} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <TextField
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time"
                type="time"
                variant="outlined"
                fullWidth
                value={selectedStartTime}
                onChange={(e) => setSelectedStartTime(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time"
                type="time"
                variant="outlined"
                fullWidth
                value={selectedEndTime}
                onChange={(e) => setSelectedEndTime(e.target.value)}
                size="small"
              />
            </Grid>
          </Grid>
          {timeError && (
            <Typography
              color="error"
              sx={{ marginBottom: 2, fontSize: "small" }}
            >
              {timeError}
            </Typography>
          )}
          <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Is this an emergency?</InputLabel>
            <Select
              value={isEmergency}
              onChange={(e) => setIsEmergency(e.target.value)}
              label="Is this an emergency?"
              size="small"
            >
              <MenuItem value="true">Yes</MenuItem>
              <MenuItem value="false">No</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Disease"
            variant="outlined"
            fullWidth
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            label="Describe your condition"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={conditionDescription}
            onChange={(e) => setConditionDescription(e.target.value)}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleBooking}
            disabled={!selectedStartTime || !selectedEndTime || !selectedDate}
          >
            Confirm Appointment
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

interface ToggleComponentsProps {
  onClose: () => void;
}

export const ToggleComponents: React.FC<ToggleComponentsProps> = ({
  onClose,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>("A");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <Dialog
      open
      onClose={onClose}
      PaperProps={{
        sx: {
          maxHeight: "600px",
          margin: "10px",
          overflowY: "auto",
        },
      }}
    >
      <DialogTitle>Select Option</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup row value={selectedComponent} onChange={handleChange}>
            <FormControlLabel
              value="A"
              control={<Radio />}
              label="New Patient"
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label="Existing Patient"
            />
          </RadioGroup>
        </FormControl>
        <div>{selectedComponent === "A" ? <ComponentA /> : <ComponentB />}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
