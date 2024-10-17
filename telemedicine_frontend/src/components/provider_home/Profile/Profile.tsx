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
import { InitialStateProviderProfile, updateProfile } from '@/redux/slice/providerProfileSlice';

const Profile: React.FC = () => {
  
  const dispatch = useAppDispatch();
  const providerProfile = useAppSelector((state: { providerProfile: InitialStateProviderProfile }) => state.providerProfile);

  const [firstName, setFirstName] = useState(providerProfile.user.firstName);
  const [lastName, setLastName] = useState(providerProfile.user.lastName);
  const [email, setEmail] = useState(providerProfile.user.email);
  const [phone, setPhone] = useState(providerProfile.user.phone);
  const [gender, setGender] = useState(providerProfile.gender);

  const [availableFrom, setAvailableFrom] = useState(providerProfile.availableFrom);
  const [availableTo, setAvailableTo] = useState(providerProfile.availableTo);
  const [consultationFee, setConsultationFee] = useState(providerProfile.consultationFee);
  const [specialty, setSpecialty] = useState(providerProfile.specialty);
  const [qualifications, setQualifications] = useState(providerProfile.qualifications);

  const [address, setAddress] = useState(providerProfile.user.address);
  const [city, setCity] = useState(providerProfile.user.cityName);
  const [state, setState] = useState(providerProfile.user.stateName);
  const [country, setCountry] = useState(providerProfile.user.countryName);

  const [isEditing, setIsEditing] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    setFirstName(providerProfile.user.firstName);
    setLastName(providerProfile.user.lastName);
    setEmail(providerProfile.user.email);
    setPhone(providerProfile.user.phone);
    setGender(providerProfile.gender);
    setAddress(providerProfile.user.address);
    setCity(providerProfile.user.cityName);
    setState(providerProfile.user.stateName);
    setCountry(providerProfile.user.countryName);
    setAvailableFrom(providerProfile.availableFrom);
    setAvailableTo(providerProfile.availableTo);
    setConsultationFee(providerProfile.consultationFee);
    setSpecialty(providerProfile.specialty);
    setQualifications(providerProfile.qualifications);
  }, [providerProfile]);

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
          userID:providerProfile.user.userID,
          firstName,
          lastName,
          phone,
          address,
          cityName: city,
          stateName: state,
          countryName: country,
        },
        providerID:providerProfile.providerID,
        gender,
        availableFrom,
        availableTo,
        consultationFee,
        specialty,
        qualifications,
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
              value={providerProfile.user.email}
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
        <Typography variant="h6">Provider Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Available From"
              variant="outlined"
              type="time"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Available To"
              variant="outlined"
              type="time"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Consultation Fee"
              variant="outlined"
              type="number"
              value={consultationFee}
              onChange={(e) => setConsultationFee(Number(e.target.value))}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Specialty"
              variant="outlined"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              disabled={!isEditing}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Qualifications"
              variant="outlined"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
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

export default Profile;
