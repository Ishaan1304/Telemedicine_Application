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
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
  Alert,
  Box,
  SelectChangeEvent,
  Button,
  Tooltip,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getProviderAppointmentHistory,
  getProviderTotalPatients,
  InitialStateAppointments,
} from "@/redux/slice/appointmentsSlice";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const AppointmentHistoryComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [diseaseFilter, setDiseaseFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [dateRangeString, setDateRangeString] = useState<[string, string]>([
    "",
    "",
  ]);

  const appointmentHistoryList = useAppSelector(
    (root:{appointments:InitialStateAppointments}) => root.appointments.providerAppointmentHistory
  );
  const totalAppointmentHistory = useAppSelector(
    (root:{appointments:InitialStateAppointments}) => root.appointments.providerAppointmentHistoryTotal
  );

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(
        getProviderAppointmentHistory({
          id: +id,
          page: page,
          rowsPerPage: rowsPerPage,
          search: searchTerm,
          startDate: dateRangeString[0],
          endDate: dateRangeString[1],
          status: statusFilter,
          disease: diseaseFilter,
        })
      );
    }
  }, [
    page,
    rowsPerPage,
    searchTerm,
    diseaseFilter,
    dateRangeString,
    statusFilter,
  ]);

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
    setPage(0);
  };

  const handleStatusChange = (event:SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value as string);
    setPage(0);
  };

  const handleDiseaseChange = (event: SelectChangeEvent<string>) => {
    setDiseaseFilter(event.target.value as string);
  };

  const handleDateChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    const startDate = newValue[0] ? newValue[0].format("YYYY-MM-DD") : "";
    const endDate = newValue[1] ? newValue[1].format("YYYY-MM-DD") : "";
    setDateRangeString([startDate, endDate]);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDiseaseFilter("");
    setDateRange([null, null]);
    setPage(0);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const truncateDescription = (description: string | null | undefined) => {
    const maxLength = 10;

    if (!description) {
      return "";
    }

    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <Paper sx={{ border: "1px solid black", minHeight: "80%" }}>
      <Grid container spacing={2} padding={1} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              slotProps={{ textField: { size: "small" } }}
              name="dateRange"
              value={dateRange}
              onChange={handleDateChange}
              sx={{ minWidth: 200 }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
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
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              value={statusFilter}
              labelId="status-select-label"
              onChange={handleStatusChange}
              variant="outlined"
              label="Status"
            >
              <MenuItem value="">ALL</MenuItem>
              <MenuItem value="BOOKED">BOOKED</MenuItem>
              <MenuItem value="CANCELLED">CANCELLED</MenuItem>
              <MenuItem value="RESCHEDULED">RESCHEDULED</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button variant="outlined" color="primary" onClick={resetFilters}>
            Reset
          </Button>
        </Grid>
      </Grid>

      <TableContainer sx={{ height: "350px", overflowY: "auto" }}>
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
              <TableCell sx={{ width: "100px" }}>Status</TableCell>
              <TableCell sx={{ width: "200px" }}>Description</TableCell>
              <TableCell sx={{ width: "150px" }}>Allergies</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentHistoryList.map((appointment: any, index: number) => (
              <TableRow key={index}>
                <TableCell
                >
                  {appointment.profilePic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          appointment.profilePic
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
                          appointment.patientProfile.user.firstName,
                          appointment.patientProfile.user.lastName
                        )}
                      </h3>
                    </div>
                  )}
                </TableCell>
                <TableCell>{`${appointment.patientProfile.user.firstName} ${appointment.patientProfile.user.lastName}`}</TableCell>
                <TableCell>{appointment.patientProfile.gender}</TableCell>
                <TableCell>{appointment.patientProfile.user.phone}</TableCell>
                <TableCell>{appointment.patientProfile.user.address}</TableCell>
                <TableCell>
                  {new Date(appointment.startTime).toLocaleString()}
                </TableCell>
                <TableCell>{appointment.disease}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell
                  sx={{
                    padding: "8px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Tooltip title={appointment.description} arrow>
                    <span>{truncateDescription(appointment.description)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{appointment.patientProfile.allergies}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={totalAppointmentHistory}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AppointmentHistoryComponent;
