import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getAvailableTimeSlots, updateAppointment } from "@/redux/slice/appointmentsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

export interface Appointment {
  appointmentID: number;
  patientProfile: {
    user: {
      firstName: string;
      lastName: string;
    };
  };
  providerProfile: {
    providerID: number;
    availableFrom: string;
    availableTo: string;
    user: {
      firstName: string;
      lastName: string;
    };
  };
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
  profilePic: string;
}

interface RescheduleAppointmentProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

const RescheduleAppointment: React.FC<RescheduleAppointmentProps> = ({
  open,
  onClose,
  appointment,
}) => {
  const dispatch = useAppDispatch();
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<{ start: string; end: string }[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<string>("");

  const timeSlotsList = useAppSelector((state) => state.appointments.availableTimeSlots);

  const handleDateChange = async (date: string) => {
    setSelectedDate(date);
    if (appointment?.providerProfile.providerID !== undefined) {
      setLoading(true);
      await dispatch(
        getAvailableTimeSlots({
          id: +appointment.providerProfile.providerID,
          start: appointment.providerProfile.availableFrom,
          end: appointment.providerProfile.availableTo,
          date: date,
        })
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeSlots(timeSlotsList);
  }, [timeSlotsList]);

  // const validateTime = (startTime: string, endTime: string) => {
  //   let error = "";

  //   if (startTime && endTime) {
  //     const startDateTime = new Date(`${selectedDate}T${startTime}:00`);
  //     const endDateTime = new Date(`${selectedDate}T${endTime}:00`);
  //     const diffInMinutes = (endDateTime.getTime() - startDateTime.getTime()) / 60000;

  //     if (diffInMinutes < 20) {
  //       error = "The time difference must be at least 20 minutes.";
  //     } else if (diffInMinutes > 40) {
  //       error = "The time difference must not exceed 40 minutes.";
  //     }

  //     const isWithinTimeSlots = timeSlots.some((slot) => {
  //       const slotStart = new Date(slot.start);
  //       const slotEnd = new Date(slot.end);
  //       return startDateTime >= slotStart && endDateTime <= slotEnd;
  //     });

  //     if (!isWithinTimeSlots) {
  //       error = "Selected time must be within the available time slots.";
  //     }
  //   }
  //   setTimeError(error);
  //   return error === "";
  // };

  const validateTime = (startTime: string, endTime: string) => {
    let error = "";
    const now = new Date();

    if (startTime && endTime) {
        const startDateTime = new Date(`${selectedDate}T${startTime}:00`);
        const endDateTime = new Date(`${selectedDate}T${endTime}:00`);

        // Check if the start time is in the past
        if (startDateTime < now) {
            error = "Start time cannot be in the past.";
        } else if (endDateTime < now) {
            error = "End time cannot be in the past.";
        } else if (startDateTime >= endDateTime) {
            error = "Start time must be before end time.";
        } else {
            const diffInMinutes = (endDateTime.getTime() - startDateTime.getTime()) / 60000;

            if (diffInMinutes < 20) {
                error = "The time difference must be at least 20 minutes.";
            } else if (diffInMinutes > 40) {
                error = "The time difference must not exceed 40 minutes.";
            }

            const isWithinTimeSlots = timeSlots.some((slot) => {
                const slotStart = new Date(slot.start);
                const slotEnd = new Date(slot.end);
                return startDateTime >= slotStart && endDateTime <= slotEnd;
            });

            if (!isWithinTimeSlots) {
                error = "Selected time must be within the available time slots.";
            }
        }
    }

    setTimeError(error);
    return error === "";
};

  const handleTimeChange = (timeType: 'start' | 'end', value: string) => {
    setSelectedTimes((prev) => ({ ...prev, [timeType]: value }));
    validateTime(
      timeType === 'start' ? value : selectedTimes.start,
      timeType === 'end' ? value : selectedTimes.end
    );
  };

  const handleReschedule = () => {
    if (validateTime(selectedTimes.start, selectedTimes.end) && appointment) {
     

      const startDateTime = `${selectedDate}T${selectedTimes.start}:00`;
      const endDateTime = `${selectedDate}T${selectedTimes.end}:00`;
  
      
      dispatch(updateAppointment({
        appointmentID: appointment.appointmentID,
        patientProfile: appointment.patientProfile,
        providerProfile: appointment.providerProfile,
        startTime: startDateTime,
        endTime: endDateTime,
      }));

    }

    setSelectedDate("");
    setSelectedTimes({ start: "", end: "" });
    setTimeError("");
    onClose();
  };

  const isFormValid = () => {
    return selectedDate && selectedTimes.start && selectedTimes.end && !timeError;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reschedule Appointment</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Select Date</Typography>
        <TextField
          type="date"
          onChange={(e) => handleDateChange(e.target.value)}
          variant="outlined"
          inputProps={{
            min: today.toISOString().split("T")[0],
            max: tenDaysLater.toISOString().split("T")[0],
          }}
          sx={{ marginBottom: 2 }}
        />
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          selectedDate && timeSlots.length > 0 && (
            <Box>
              <Typography variant="h6">Available Time Slots for {selectedDate}</Typography>
              <Grid container spacing={1}>
                {timeSlots.map((slot, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        setSelectedTimes({ start: slot.start.substring(11), end: slot.end.substring(11) });
                        validateTime(slot.start.substring(11), slot.end.substring(11));
                      }}
                    >
                      {slot.start.substring(11)} - {slot.end.substring(11)}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
        )}
        <br/>
        <TextField
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Time"
          type="time"
          variant="outlined"
          fullWidth
          value={selectedTimes.start}
          onChange={(e) => handleTimeChange('start', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <br/>
        <TextField
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End Time"
          type="time"
          variant="outlined"
          fullWidth
          value={selectedTimes.end}
          onChange={(e) => handleTimeChange('end', e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {timeError && (
          <Typography color="error" sx={{ marginBottom: 2, fontSize: "small" }}>
            {timeError}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
            setSelectedDate("");
            setSelectedTimes({ start: "", end: "" });
            setTimeError("");
            onClose()}} color="primary">
          Cancel
        </Button>
        <Button onClick={handleReschedule} color="primary" disabled={!isFormValid()}>
          Reschedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RescheduleAppointment;
