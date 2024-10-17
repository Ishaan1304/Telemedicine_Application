import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  TablePagination,
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getProviderTotalPatients } from "@/redux/slice/appointmentsSlice";

const PatientList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [allergiesFilter, setAllergiesFilter] = useState<string>("");
  const [diseaseFilter, setDiseaseFilter] = useState<string>("");

  const patients = useAppSelector(
    (root) => root.appointments.providerTotalPatients
  );
  const pageTotal = useAppSelector(
    (root) => root.appointments.providerTotalPatientsNumber
  );

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(
        getProviderTotalPatients({
          id: +id,
          search: searchTerm,
          page,
          rowsPerPage,
          allergies: allergiesFilter,
          gender: genderFilter,
          disease: diseaseFilter,
        })
      );
    }
  }, [page, rowsPerPage, searchTerm, allergiesFilter, genderFilter,diseaseFilter, dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenderFilter(event.target.value);
  };

  const handleAllergiesChange = (event: SelectChangeEvent<string>) => {
    setAllergiesFilter(event.target.value as string);
  };

  const handleDiseaseChange = (event: SelectChangeEvent<string>) => {
    setDiseaseFilter(event.target.value as string);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setAllergiesFilter("");
    setPage(0);
    setRowsPerPage(4);
  };

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <Paper sx={{ border: "1px solid black", minHeight: "80%" }}>
      <Grid container spacing={2} padding={1} alignItems="center">
  <Grid item xs={3}>
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={handleSearchChange}
      size="small"
    />
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>Allergies</InputLabel>
      <Select
        value={allergiesFilter}
        onChange={handleAllergiesChange}
        label="Allergies"
        size="small"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Peanuts">Peanuts</MenuItem>
        <MenuItem value="Shellfish">Shellfish</MenuItem>
        <MenuItem value="Dairy">Dairy</MenuItem>
        <MenuItem value="Dust">Dust</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel>Disease</InputLabel>
      <Select
        value={diseaseFilter}
        onChange={handleDiseaseChange}
        label="Disease"
        size="small"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="Typhoid">Typhoid</MenuItem>
        <MenuItem value="Malaria">Malaria</MenuItem>
        <MenuItem value="Dengue">Dengue</MenuItem>
        <MenuItem value="Cancer">Cancer</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={3}>
    <RadioGroup row value={genderFilter} onChange={handleGenderChange}>
      <FormControlLabel value="" control={<Radio />} label="All" />
      <FormControlLabel value="MALE" control={<Radio />} label="Male" />
      <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
    </RadioGroup>
  </Grid>
  <Grid item xs={12}>
    <Button variant="contained" color="primary" onClick={resetFilters}>
      Reset Filters
    </Button>
  </Grid>
</Grid>

      <TableContainer sx={{ minHeight: "350px", overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50px" }}></TableCell>
              <TableCell sx={{ width: "200px" }}>Name</TableCell>
              <TableCell sx={{ width: "100px" }}>Gender</TableCell>
              <TableCell sx={{ width: "100px" }}>Phone</TableCell>
              <TableCell sx={{ width: "100px" }}>Address</TableCell>
              <TableCell sx={{ width: "200px" }}>Date</TableCell>
              <TableCell sx={{ width: "150px" }}>Disease</TableCell>
              <TableCell sx={{ width: "150px" }}>Allergies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>
                  {patient.profilePic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          patient.profilePic
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
                        {getInitials(patient.firstName, patient.lastName)}
                      </h3>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {patient.firstName + " " + patient.lastName}
                </TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.startTime.substring(0,10)}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>{patient.allergies}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={pageTotal}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PatientList;
