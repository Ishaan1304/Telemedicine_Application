import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
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
import { AddProvider } from "../AddProvider/AddProvider";
import { deleteAdminProviders, getAdminProviders, updateAdminProviders } from "@/redux/slice/providersSlice";

export const ProvidersList = () => {
  const dispatch = useAppDispatch();
  const providers = useAppSelector((state) => state.providers.adminProviders);
  const totalProviders = useAppSelector(
    (state) => state.providers.adminProvidersNumber
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cityNameFilter, setCityNameFilter] = useState<string>("");
  const [dateOfBirthFilter, setDateOfBirthFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const [firstName, setFirstName] = useState(
    selectedProvider?.providerProfile.user.firstName || ""
  );
  const [lastName, setLastName] = useState(
    selectedProvider?.providerProfile.user.lastName || ""
  );
  const [phone, setPhone] = useState(
    selectedProvider?.providerProfile.user.phone || ""
  );
  const [cityName, setCityName] = useState(
    selectedProvider?.providerProfile.user.cityName || ""
  );
  const [stateName, setStateName] = useState(
    selectedProvider?.providerProfile.user.stateName || ""
  );
  const [countryName, setCountryName] = useState(
    selectedProvider?.providerProfile.user.countryName || ""
  );

  const handleOpenUpdateModal = (provider: {
    providerProfile: any;
    userPic?: string;
  }) => {
    setSelectedProvider(provider);
    setFirstName(provider.providerProfile.user.firstName);
    setLastName(provider.providerProfile.user.lastName);
    setPhone(provider.providerProfile.user.phone);
    setCityName(provider.providerProfile.user.cityName);
    setStateName(provider.providerProfile.user.stateName);
    setCountryName(provider.providerProfile.user.countryName);
    setOpenUpdateModal(true);
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(
        getAdminProviders({
          name: searchTerm,
          cityName: cityNameFilter,
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

  const handleOpenDeleteModal = (provider: any) => {
    setSelectedProvider(provider);
    setOpenDeleteModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedProvider(null);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedProvider(null);
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
        Providers List
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
          style={{ marginLeft: "16px",display:"none" }}
          sx={{display:"hidden"}}
        />
        <AddProvider />
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
            {providers.map((provider) => (
              <TableRow key={provider.providerProfile.user.userID}>
                <TableCell
                  sx={{
                    padding: "8px",
                  }}
                >
                  {provider.userPic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          provider.userPic
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
                          provider.providerProfile.user.firstName,
                          provider.providerProfile.user.lastName
                        )}
                      </h3>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {provider.providerProfile.user.firstName}{" "}
                  {provider.providerProfile.user.lastName}
                </TableCell>
                <TableCell>{provider.providerProfile.user.email}</TableCell>
                <TableCell>{provider.providerProfile.user.phone}</TableCell>
                <TableCell>{provider.providerProfile.user.address}</TableCell>
                <TableCell>{provider.providerProfile.user.cityName}</TableCell>
                <TableCell>{provider.providerProfile.user.stateName}</TableCell>
                <TableCell>{provider.providerProfile.user.countryName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenUpdateModal(provider)}
                    color="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(provider)}
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
        count={totalProviders}
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
                value={selectedProvider?.providerProfile.user.email}
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
                ...selectedProvider,
                providerProfile: {
                  ...selectedProvider.providerProfile,
                  user: {
                    ...selectedProvider.providerProfile.user,
                    firstName,
                    lastName,
                    phone,
                    cityName,
                    stateName,
                    countryName,
                  },
                },
              };
              
              dispatch(updateAdminProviders({userID:updatedPatient.providerProfile.user.userID,firstName:updatedPatient.providerProfile.user.firstName,lastName:updatedPatient.providerProfile.user.lastName,email:updatedPatient.providerProfile.user.email,phone:updatedPatient.providerProfile.user.phone,cityName:updatedPatient.providerProfile.user.cityName,stateName:updatedPatient.providerProfile.user.stateName,coutryName:updatedPatient.providerProfile.user.countryName,address:updatedPatient.providerProfile.user.address}));
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
            {selectedProvider?.providerProfile.user.firstName}{" "}
            {selectedProvider?.providerProfile.user.lastName}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
             
              dispatch(deleteAdminProviders(selectedProvider.providerProfile.user.userID));
              handleCloseDeleteModal();
            }} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
