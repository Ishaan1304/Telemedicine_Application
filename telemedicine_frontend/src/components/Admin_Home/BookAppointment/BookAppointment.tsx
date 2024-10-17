import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAvailableTimeSlots } from "@/redux/slice/appointmentsSlice";
import { getPatients } from "@/redux/slice/patientsSlice";
import { getProviders } from "@/redux/slice/providersSlice";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

interface ProviderProfileResponse {
  providerID: number;
  availableFrom: string;
  availableTo: string;
  gender: string;
  specialty: string;
  qualifications: string;
  consultationFee: number;
  user: User;
}

export const BookAppointment = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  const [selectedPatient, setSelectedPatient] = useState<PatientProfileResponse | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfileResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
  const [isEmergency, setIsEmergency] = useState("no");
  const [conditionDescription, setConditionDescription] = useState("");
  const [disease, setDisease] = useState<string>("");
  const [timeError, setTimeError] = useState<string>("");

  const patientProfiles = useAppSelector((state) => state.patients.patients);
  const providerProfiles = useAppSelector((state) => state.providers.providers);
  const availableTimeSlots = useAppSelector((state) => state.appointments.availableTimeSlots);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(getPatients());
      dispatch(getProviders());
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedDate && selectedProvider?.providerID) {
      dispatch(
        getAvailableTimeSlots({
          id: selectedProvider.providerID,
          start: selectedProvider.availableFrom,
          end: selectedProvider.availableTo,
          date: selectedDate,
        })
      );
    }
  }, [selectedDate, selectedProvider, dispatch]);

  useEffect(() => {
    setTimeSlots(availableTimeSlots);
  }, [availableTimeSlots]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedStartTime(""); 
    setSelectedEndTime("");
  };

  const handleBooking = () => {
    const isValid = validateTime(selectedStartTime, selectedEndTime);
    if (!isValid) {
      return;
    }

    if (selectedProvider !== null && selectedPatient !== null) {
      const appointmentData = {
        patientProfile: { patientID: selectedPatient?.patientID },
        providerProfile: { providerID: selectedProvider.providerID },
        startTime: `${selectedDate}T${selectedStartTime}:00`,
        endTime: `${selectedDate}T${selectedEndTime}:00`,
        description: conditionDescription,
        isEmergency: isEmergency === "true",
        fee: selectedProvider.consultationFee,
        disease: disease,
      };
      const encodedData = encodeURIComponent(JSON.stringify(appointmentData));
      router.push(`/payment?data=${encodedData}`);
    }
  };

  // const validateTime = (startTime: string, endTime: string) => {
  //   setTimeError("");
  //   let error = "";

  //   if (startTime && endTime) {
  //     const start = new Date(`${selectedDate}T${startTime}:00`);
  //     const end = new Date(`${selectedDate}T${endTime}:00`);
  //     const diffInMinutes = (end.getTime() - start.getTime()) / 60000;

  //     if (diffInMinutes < 20 || diffInMinutes > 40) {
  //       error = "Allowed time difference is between 20 and 40 minutes.";
  //     }

  //     const isWithinTimeSlots = timeSlots.some((slot) => {
  //       const slotStart = new Date(slot.start);
  //       const slotEnd = new Date(slot.end);
  //       return start >= slotStart && end <= slotEnd;
  //     });

  //     if (!isWithinTimeSlots) {
  //       error = "Selected time must be within the available time slots.";
  //     }
  //   }
  //   setTimeError(error);
  //   return error === "";
  // };


  const validateTime = (startTime: string, endTime: string) => {
    setTimeError("");
    let error = "";

    if (startTime && endTime) {
        const start = new Date(`${selectedDate}T${startTime}:00`);
        const end = new Date(`${selectedDate}T${endTime}:00`);
        const now = new Date();

        // Check if the start time is in the past
        if (start < now) {
            error = "Start time cannot be in the past.";
        } 
        // Check if the end time is in the past
        else if (end < now) {
            error = "End time cannot be in the past.";
        }
        // Check if the start time is greater than the end time
        else if (start >= end) {
            error = "Start time must be earlier than end time.";
        } else {
            // Check time difference
            const diffInMinutes = (end.getTime() - start.getTime()) / 60000;
            if (diffInMinutes < 20 || diffInMinutes > 40) {
                error = "Allowed time difference is between 20 and 40 minutes.";
            }

            // Check if the selected time is within available time slots
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={patientProfiles}
            getOptionLabel={(option) => `${option.user.firstName} ${option.user.lastName}`}
            onChange={(event, newValue) => setSelectedPatient(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Search Patient" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Autocomplete
            options={providerProfiles}
            getOptionLabel={(option) => `${option.user.firstName} ${option.user.lastName}`}
            onChange={(event, newValue) => {
              setSelectedProvider(newValue);
              setTimeSlots([]); // Clear previous time slots when provider changes
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search Provider" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Select Date</Typography>
          <TextField
            type="date"
            onChange={(e) => handleDateChange(e.target.value)}
            variant="outlined"
            inputProps={{
              min: today.toISOString().split('T')[0],
              max: tenDaysLater.toISOString().split('T')[0],
            }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Grid>

        {selectedDate && timeSlots.length > 0 && (
          <Grid item xs={12}>
            <Box>
              <Typography variant="h6">Available Time Slots for {selectedDate}</Typography>
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
                    >
                      {slot.start.substring(11)} - {slot.end.substring(11)}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                Note: Make sure the appointment duration is between 20 and 40 minutes.
              </Typography>
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 ,width:"550px"}}>
            <Typography variant="h6">Book Appointment</Typography>
            <TextField
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time"
              type="time"
              variant="outlined"
              fullWidth
              value={selectedStartTime}
              onChange={(e) => setSelectedStartTime(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            <TextField
              label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time"
              type="time"
              variant="outlined"
              fullWidth
              value={selectedEndTime}
              onChange={(e) => setSelectedEndTime(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            {timeError && (
              <Typography color="error" sx={{ marginBottom: 2 }}>
                {timeError}
              </Typography>
            )}

            <FormControl variant="outlined" fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Is this an emergency?</InputLabel>
              <Select
                value={isEmergency}
                onChange={(e) => setIsEmergency(e.target.value)}
                label="Is this an emergency?"
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
      </Grid>
    </>
  );
};

