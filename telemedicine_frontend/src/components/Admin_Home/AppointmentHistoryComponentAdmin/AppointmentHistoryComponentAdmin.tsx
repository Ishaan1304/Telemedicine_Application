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
  Modal,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getAdminAppointmentHistory,
  getPatientAppointmentHistory,
  getProviderAppointmentHistory,
  getProviderTotalPatients,
  InitialStateAppointments,
} from "@/redux/slice/appointmentsSlice";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { ViewPrescription } from "@/components/patient_home/ViewPrescription.tsx/ViewPrescription";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const AppointmentHistoryComponentAdmin: React.FC = () => {
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

  const appointmentHistoryListAdmin = useAppSelector(
    (root: { appointments: InitialStateAppointments }) =>
      root.appointments.adminAppointmentHistory
  );

  const totalAppointmentHistoryAdmin = useAppSelector(
    (root: { appointments: InitialStateAppointments }) =>
      root.appointments.adminAppointmentHistoryTotal
  );

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(
        getAdminAppointmentHistory({
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

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const [selectedAppointment, setSelectedAppointment] = useState<{
    appointmentID: number;
    patientProfile: any;
    providerProfile: any;
    startTime: string;
    endTime: string;
    status: string;
    emergency: string;
    description: string;
    profilePic: string;
    disease: string;
  } | null>();

  const handleOpenView = (appointment: {
    appointmentID: number;
    patientProfile: any;
    providerProfile: any;
    startTime: string;
    endTime: string;
    status: string;
    emergency: string;
    description: string;
    profilePic: string;
    disease: string;
  }) => {
    setSelectedAppointment(appointment);
    setOpen(true);
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
              <TableCell sx={{ width: "200px" }}>Doctor Name</TableCell>
              <TableCell sx={{ width: "100px" }}>Gender</TableCell>
              <TableCell sx={{ width: "100px" }}>Phone</TableCell>
              <TableCell sx={{ width: "100px" }}>Address</TableCell>
              <TableCell sx={{ width: "200px" }}>Date</TableCell>
              <TableCell sx={{ width: "150px" }}>Disease</TableCell>
              <TableCell sx={{ width: "100px" }}>Status</TableCell>
              <TableCell sx={{ width: "100px" }}>Prescription</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentHistoryListAdmin.map(
              (appointment: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
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
                  <TableCell>{`${appointment.providerProfile.user.firstName} ${appointment.providerProfile.user.lastName}`}</TableCell>
                  <TableCell>{appointment.patientProfile.gender}</TableCell>
                  <TableCell>{appointment.patientProfile.user.phone}</TableCell>
                  <TableCell>
                    {appointment.patientProfile.user.address}
                  </TableCell>
                  <TableCell>
                    {new Date(appointment.startTime).toLocaleString()}
                  </TableCell>
                  <TableCell>{appointment.disease}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenView(appointment)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={totalAppointmentHistoryAdmin}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {selectedAppointment && (
            <ViewPrescription appointmentId={selectedAppointment.appointmentID} />
          )}
        </Box>
      </Modal>
    </Paper>
  );
};

export default AppointmentHistoryComponentAdmin;
