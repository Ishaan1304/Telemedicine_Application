import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hooks';
import { InitialStatePatientProfile, updateProfile } from '@/redux/slice/patientProfileSlice';

const PatientProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const patientProfile = useAppSelector((state: { patientProfile: InitialStatePatientProfile }) => state.patientProfile);

  const [firstName, setFirstName] = useState(patientProfile.user.firstName);
  const [lastName, setLastName] = useState(patientProfile.user.lastName);
  const [email, setEmail] = useState(patientProfile.user.email);
  const [phone, setPhone] = useState(patientProfile.user.phone);
  const [gender, setGender] = useState(patientProfile.gender);
  const [dateOfBirth, setDateOfBirth] = useState(patientProfile.dateOfBirth);
  const [medicalHistory, setMedicalHistory] = useState(patientProfile.medicalHistory);
  const [allergies, setAllergies] = useState(patientProfile.allergies);
  const [medications, setMedications] = useState(patientProfile.medications);
  const [address, setAddress] = useState(patientProfile.user.address);
  const [city, setCity] = useState(patientProfile.user.cityName);
  const [state, setState] = useState(patientProfile.user.stateName);
  const [country, setCountry] = useState(patientProfile.user.countryName);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    setFirstName(patientProfile.user.firstName);
    setLastName(patientProfile.user.lastName);
    setEmail(patientProfile.user.email);
    setPhone(patientProfile.user.phone);
    setGender(patientProfile.gender);
    setAddress(patientProfile.user.address);
    setCity(patientProfile.user.cityName);
    setState(patientProfile.user.stateName);
    setCountry(patientProfile.user.countryName);
    setDateOfBirth(patientProfile.dateOfBirth);
    setMedicalHistory(patientProfile.medicalHistory);
    setAllergies(patientProfile.allergies);
    setMedications(patientProfile.medications);
  }, [patientProfile]);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10,15}$/; 
    return phoneRegex.test(number);
  };

  const handleEditClick = () => {
    if (isEditing) {
      if (validatePhoneNumber(phone)) {
        setPhoneError(false); 
        dispatch(updateProfile({
          user: {
            userID: patientProfile.user.userID,
            firstName,
            lastName,
            phone,
            address,
            cityName: city,
            stateName: state,
            countryName: country,
          },
          patientID: patientProfile.patientID,
          gender,
          dateOfBirth,
          medicalHistory,
          allergies,
          medications,
        }));
      } else {
        setPhoneError(true);
        alert('Invalid phone number. Please enter 10 to 15 digits.'); 
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <Box sx={{ padding: 3, width: "100%", maxHeight: "88vh", margin: 'auto', overflowY: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Profile
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleEditClick} 
        sx={{ marginBottom: 2 }}
      >
        {isEditing ? 'Save' : 'Edit'}
      </Button>

      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">Basic Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Contact Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              variant="outlined"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="State"
              variant="outlined"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Country"
              variant="outlined"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) {
                  setPhoneError(false);
                }
              }}
              disabled={!isEditing}
              fullWidth
              margin="normal"
              error={phoneError}
              helperText={phoneError ? 'Invalid phone number. Please enter 10 to 15 digits.' : ''}
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h6">Patient Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label=""
              variant="outlined"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Allergies"
              variant="outlined"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Medical History"
              variant="outlined"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Medications"
              variant="outlined"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PatientProfile;
