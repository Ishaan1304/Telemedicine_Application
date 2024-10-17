import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PatientLayout from "@/components/patient_home/PatientLayout/PatientLayout";
import { format } from 'date-fns';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { getProviderProfile } from "@/redux/slice/providerProfileSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getUserProviderProfilePicString } from "@/redux/slice/usersSlice";
import { getAvailableTimeSlots } from "@/redux/slice/appointmentsSlice";

const BookAppointment: React.FC = () => {
  const router = useRouter();
  const { userID, providerID, patientID } = router.query;

  const dispatch = useAppDispatch();
  //const today = format(new Date(), 'yyyy-MM-dd');

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
  const [disease,setDisease]=useState<string>("");

  const providerProfile = useAppSelector((state) => state.providerProfile);

  const providerPhotoString = useAppSelector(
    (state) => state.users.userProviderProfileString
  );

  const profilePicUrl =
    providerPhotoString !== null
      ? `http://localhost:8080/userProfile/images/get/${providerPhotoString}`
      : "/assets/profile.png";

  useEffect(() => {
    if (userID !== null && userID !== undefined) {
      dispatch(getProviderProfile({ id: +userID }));
      dispatch(getUserProviderProfilePicString(+userID));
    }
  }, [userID]);

  const timeSlotsList = useAppSelector(
    (state) => state.appointments.availableTimeSlots
  );
  

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    
    if (providerID !== undefined) {
      
      dispatch(
        getAvailableTimeSlots({
          id: +providerID,
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

    if (patientID !== undefined) {
      const appointmentData = {
        patientProfile: { patientID: +patientID },
        providerProfile: { providerID: providerProfile.providerID },
        startTime: `${selectedDate}T${selectedStartTime}:00`,
        endTime:`${selectedDate}T${selectedEndTime}:00`,
        description: conditionDescription,
        isEmergency: isEmergency === "true",
        fee: providerProfile.consultationFee,
        disease:disease,
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
        const diffInMinutes = (end.getTime() - start.getTime()) / 60000;

        // Check if the start time is in the past
        if (start < now) {
            error = "Start time cannot be in the past.";
        } 
        // Check if the end time is in the past
        else if (end < now) {
            error = "End time cannot be in the past.";
        }
        // Check if the start time is greater than or equal to the end time
        else if (start >= end) {
            error = "Start time must be earlier than end time.";
        } 
        // Check time difference
        else if (diffInMinutes < 20 || diffInMinutes > 40) {
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

    setTimeError(error);
    return error === "";
};



  return (
    <PatientLayout>
      <Box sx={{ padding: 2, backgroundColor: "#fff8e1", height: "88vh" }}>
        <Grid
          container
          spacing={4}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                width: "700px",
              }}
            >
              <Avatar
                src={profilePicUrl}
                alt="Profile Picture"
                sx={{
                  width: 120,
                  height: 120,
                  marginRight: 3,
                  border: "2px solid white",
                  boxShadow: 2,
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: "text.primary" }}
                    >
                      {providerProfile.user.firstName}{" "}
                      {providerProfile.user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {providerProfile.qualifications}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {providerProfile.specialty}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      <b>Consultation Fee: </b>
                      {providerProfile.consultationFee}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Availability: </b>
                      {providerProfile.availableFrom} to{" "}
                      {providerProfile.availableTo}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="text.secondary">
                      <b>Phone: </b>
                      {providerProfile.user.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <b>Address: </b>
                      {providerProfile.user.address},{" "}
                      {providerProfile.user.cityName},{" "}
                      {providerProfile.user.stateName},{" "}
                      {providerProfile.user.countryName}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Typography variant="h6">Select Date</Typography>
            <TextField
              type="date"
              onChange={(e) => handleDateChange(e.target.value)}
              variant="outlined"
              //inputProps={{ min: today }}
              inputProps={{
                min: today.toISOString().split('T')[0], // sets min to today
                max: tenDaysLater.toISOString().split('T')[0], // sets max to 10 days from today
              }}
              sx={{ marginBottom: 2 }}
            />
            {selectedDate && timeSlots.length > 0 && (
              <Box>
                <Typography variant="h6">
                  Available Time Slots for {selectedDate}
                </Typography>
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
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                Note : Make Sure while booking Appointment time difference of
                appointment should
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; be
                between 20-40 mins.
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">Book Appointment</Typography>
              <TextField
                label=" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time"
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
                <Typography
                  color="error"
                  sx={{ marginBottom: 2, fontSize: "small" }}
                >
                  {timeError}
                </Typography>
              )}
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 2 }}
              >
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
                disabled={
                  !selectedStartTime || !selectedEndTime || !selectedDate
                }
              >
                Confirm Appointment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PatientLayout>
  );
};

export default BookAppointment;
