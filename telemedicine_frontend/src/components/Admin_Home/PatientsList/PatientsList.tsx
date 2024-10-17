import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { deleteAdminPatients, getAdminPatients, updateAdminPatients } from "@/redux/slice/patientsSlice";
import { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import { SignUpPatient } from "@/components/SignupLogin/SignupPatient/signuppatient";
import { AddPatient } from "../AddPatient/AddPatient";

export const PatientsList = () => {
  const dispatch = useAppDispatch();
  const patients = useAppSelector((state) => state.patients.adminPatients);
  const totalPatients = useAppSelector(
    (state) => state.patients.adminPatientsNumber
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cityNameFilter, setCityNameFilter] = useState<string>("");
  const [dateOfBirthFilter, setDateOfBirthFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  const [firstName, setFirstName] = useState(
    selectedPatient?.patientProfile.user.firstName || ""
  );
  const [lastName, setLastName] = useState(
    selectedPatient?.patientProfile.user.lastName || ""
  );
  const [phone, setPhone] = useState(
    selectedPatient?.patientProfile.user.phone || ""
  );
  const [cityName, setCityName] = useState(
    selectedPatient?.patientProfile.user.cityName || ""
  );
  const [stateName, setStateName] = useState(
    selectedPatient?.patientProfile.user.stateName || ""
  );
  const [countryName, setCountryName] = useState(
    selectedPatient?.patientProfile.user.countryName || ""
  );

  const handleOpenUpdateModal = (patient: {
    patientProfile: any;
    userPic?: string;
  }) => {
    setSelectedPatient(patient);
    setFirstName(patient.patientProfile.user.firstName);
    setLastName(patient.patientProfile.user.lastName);
    setPhone(patient.patientProfile.user.phone);
    setCityName(patient.patientProfile.user.cityName);
    setStateName(patient.patientProfile.user.stateName);
    setCountryName(patient.patientProfile.user.countryName);
    setOpenUpdateModal(true);
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(
        getAdminPatients({
          name: searchTerm,
          cityName: cityNameFilter,
          dateOfBirth: dateOfBirthFilter,
          page,
          size: rowsPerPage,
        })
      );
    }
  }, [
    page,
    rowsPerPage,
    searchTerm,
    cityNameFilter,
    dateOfBirthFilter,
    dispatch,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirthFilter(e.target.value);
    setPage(0);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleOpenDeleteModal = (patient: any) => {
    setSelectedPatient(patient);
    setOpenDeleteModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedPatient(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPatient(null);
  };


  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const isValidPhoneNumber = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  return (
    <Paper sx={{margin:"10px",padding:"5px"}}>
      <Typography variant="h4" gutterBottom sx={{textAlign:"center"}}>
        Patients List
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Search by name"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: "16px" }}
        />
        <FormControl sx={{ width: "150px" }}>
          <InputLabel id="city-select-label"  size="small">City</InputLabel>
          <Select
            value={cityNameFilter}
            labelId="city-select-label"
            variant="outlined"
            size="small"
            label="City"
            onChange={(e) => {
              const value = e.target.value;
              setCityNameFilter(value);
              setPage(0);
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Ujjain">Ujjain</MenuItem>
            <MenuItem value="Indore">Indore</MenuItem>
            <MenuItem value="Bhopal">Bhopal</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Date of Birth"
          size="small"
          type="date"
          variant="outlined"
          value={dateOfBirthFilter}
          onChange={handleDateOfBirthChange}
          InputLabelProps={{ shrink: true }}
          style={{ marginLeft: "16px" ,display:"none"}}
          sx={{display:"hidden"}}
        />
        <AddPatient />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.patientProfile.user.userID}>
                <TableCell
                  sx={{
                    padding: "8px",
                  }}
                >
                  {patient.userPic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          patient.userPic
                        }
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "50%",
                        textAlign: "center",
                        width: "40px",
                        height: "40px",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <h3>
                        {getInitials(
                          patient.patientProfile.user.firstName,
                          patient.patientProfile.user.lastName
                        )}
                      </h3>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {patient.patientProfile.user.firstName}{" "}
                  {patient.patientProfile.user.lastName}
                </TableCell>
                <TableCell>{patient.patientProfile.user.email}</TableCell>
                <TableCell>{patient.patientProfile.user.phone}</TableCell>
                <TableCell>{patient.patientProfile.user.address}</TableCell>
                <TableCell>{patient.patientProfile.user.cityName}</TableCell>
                <TableCell>{patient.patientProfile.user.stateName}</TableCell>
                <TableCell>{patient.patientProfile.user.countryName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenUpdateModal(patient)}
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(patient)}
                    color="secondary"
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[4, 8, 12, 16]}
        component="div"
        count={totalPatients}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <Dialog
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Update Patient</DialogTitle>
        <DialogContent dividers sx={{ height: "auto", padding: "24px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                size="small"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                size="small"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                value={selectedPatient?.patientProfile.user.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                size="small"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                error={!isValidPhoneNumber(phone)}
                helperText={!isValidPhoneNumber(phone) ? "Invalid phone number" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                size="small"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                size="small"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                variant="outlined"
                fullWidth
                size="small"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdateModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const updatedPatient = {
                ...selectedPatient,
                patientProfile: {
                  ...selectedPatient.patientProfile,
                  user: {
                    ...selectedPatient.patientProfile.user,
                    firstName,
                    lastName,
                    phone,
                    cityName,
                    stateName,
                    countryName,
                  },
                },
              };
             
              dispatch(updateAdminPatients({userID:updatedPatient.patientProfile.user.userID,firstName:updatedPatient.patientProfile.user.firstName,lastName:updatedPatient.patientProfile.user.lastName,email:updatedPatient.patientProfile.user.email,phone:updatedPatient.patientProfile.user.phone,cityName:updatedPatient.patientProfile.user.cityName,stateName:updatedPatient.patientProfile.user.stateName,coutryName:updatedPatient.patientProfile.user.countryName,address:updatedPatient.patientProfile.user.address}));
              handleCloseUpdateModal();
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Delete Patient</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete{" "}
            {selectedPatient?.patientProfile.user.firstName}{" "}
            {selectedPatient?.patientProfile.user.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
             
              dispatch(deleteAdminPatients(selectedPatient.patientProfile.user.userID));
              handleCloseDeleteModal();
            }} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
