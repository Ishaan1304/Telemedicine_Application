import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  tableContainerStyle,
  textFieldStyle,
  tableStyle,
  tableRowStyle,
  containerStyle,
  actionButtonStyle,
  tableHeadStyle,
} from "./AdminAppointmentTableStyles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  deleteAppointment,
  getAdminUpcomingAppointments,
  getProviderUpcomingAppointments,
  InitialStateAppointments,
} from "@/redux/slice/appointmentsSlice";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { Dayjs } from "dayjs";
import { useRouter } from "next/router";
import { ToggleComponents } from "@/components/provider_home/Toggler/Toggler";
import { BookAppointment } from "../BookAppointment/BookAppointment";
import RescheduleAppointment from "@/components/Common/RescheduleAppointment/RescheduleAppointment";

interface Appointment {
  appointmentID: number;
  patientProfile: any;
  providerProfile: any;
  startTime: string;
  endTime: string;
  status: string;
  emergency: boolean;
  description: string;
  profilePic: string;
}

const AdminAppointmentTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [emergencyFilter, setEmergencyFilter] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const appointmentsList = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.allAdminAppointmentsUpcoming
  );

  const paginationTotalElements: number = useAppSelector(
    (state: { appointments: InitialStateAppointments }) =>
      state.appointments.totalAdminPaginationElements
  );

  const [dateRange, setDateRange] = useState<any>([null, null]);

  const [dateRangeString, setDateRangeString] = useState<[string, string]>([
    "",
    "",
  ]);

  const handleDateChange = (newValue: [Dayjs | null, Dayjs | null]) => {
    const startDate = newValue[0] ? newValue[0].format("YYYY-MM-DD") : "";
    const endDate = newValue[1] ? newValue[1].format("YYYY-MM-DD") : "";
    setDateRangeString([startDate, endDate]);
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
    
      dispatch(
        getAdminUpcomingAppointments({
          page,
          rowsPerPage,
          search: searchTerm,
          startDate: dateRangeString[0],
          endDate: dateRangeString[1],
          emergency: emergencyFilter,
          status: statusFilter,
        })
      );
    }
  }, [
    page,
    rowsPerPage,
    searchTerm,
    emergencyFilter,
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

  const handleCancel = (appointmentID: number) => {
    dispatch(deleteAppointment({ id: appointmentID }));
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

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setSearchTerm("");
    setDateRange([null, null]);
    setDateRangeString(["", ""]);
    setEmergencyFilter(false);
    setStatusFilter("");
  };

  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  };

  const [openReschedule, setOpenReschedule] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

  const handleReschedule = (appointment: Appointment) => {
    setCurrentAppointment(appointment);
    setOpenReschedule(true);
  };

  const handleCloseReschedule = () => {
    setOpenReschedule(false);
    setCurrentAppointment(null);
  };

  return (
    <Paper sx={containerStyle}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 2,
          flexWrap: "nowrap",
          gap: 2,
        }}
      >
        <TextField
          label="Search by Name"
          variant="outlined"
          sx={textFieldStyle}
          size="small"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(0);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            slotProps={{ textField: { size: "small" } }}
            name="dateRange"
            value={dateRange}
            onChange={handleDateChange}
            sx={{ marginTop: 1, minWidth: 200 }}
          />
        </LocalizationProvider>

        <FormControl size="small" sx={{ width: "150px", marginTop: 1 }}>
          <InputLabel id="demo-simple-select-label">Emergency</InputLabel>
          <Select
            value={emergencyFilter}
            labelId="demo-simple-select-label"
            variant="outlined"
            label="Emergency"
            onChange={(e) => {
              const value =
                e.target.value === "true"
                  ? true
                  : e.target.value === "false"
                  ? false
                  : false;
              setEmergencyFilter(value);
              setPage(0);
            }}
          >
            <MenuItem value="true">Yes</MenuItem>
            <MenuItem value="false">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ width: "150px", marginTop: 1 }}>
          <InputLabel id="demo-simple-select-label1">Status</InputLabel>
          <Select
            value={statusFilter}
            labelId="demo-simple-select-label1"
            variant="outlined"
            label="Status"
            onChange={(e) => {
              const value = e.target.value;
              setStatusFilter(value);
              setPage(0);
            }}
          >
            <MenuItem value="">ALL</MenuItem>
            <MenuItem value="BOOKED">BOOKED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
            <MenuItem value="RESCHEDULED">RESCHEDULED</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={handleReset}
          variant="outlined"
          sx={{
            color: "black",
            height: "40px",
            border: "1px solid gray",
            marginTop: "13px",
          }}
        >
          Reset
        </Button>
        <div style={{}}>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              height: "40px",
              border: "1px solid gray",
              marginTop: "13px",
              marginRight: "10px",
            }}
            onClick={handleOpen}
          >
            Add
          </Button>
        </div>
      </Box>
      <TableContainer sx={tableContainerStyle}>
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow sx={tableHeadStyle}>
              <TableCell sx={{ width: "50px" }}></TableCell>
              <TableCell sx={{ width: "200px" }}>Patient Name</TableCell>
              <TableCell sx={{ width: "200px" }}>Provider Name</TableCell>
              <TableCell sx={{ width: "100px" }}>Time</TableCell>
              <TableCell sx={{ width: "100px" }}>Status</TableCell>
              <TableCell sx={{ width: "100px" }}>Emergency</TableCell>
              <TableCell sx={{ width: "200px" }}>Description</TableCell>
              <TableCell sx={{ width: "150px" }}>Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentsList.map((row) => (
              <TableRow key={row.appointmentID} sx={tableRowStyle}>
                <TableCell
                  sx={{
                    padding: "8px",
                  }}
                >
                  {row.profilePic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          row.profilePic
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
                          row.patientProfile.user.firstName,
                          row.patientProfile.user.lastName
                        )}
                      </h3>
                    </div>
                  )}
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  {row.patientProfile.user.firstName +
                    " " +
                    row.patientProfile.user.lastName}
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  {row.providerProfile.user.firstName +
                    " " +
                    row.providerProfile.user.lastName}
                </TableCell>

                <TableCell sx={{ padding: "8px" }}>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }).format(new Date(row.startTime))}
                </TableCell>
                <TableCell sx={{ padding: "8px" }}>{row.status}</TableCell>
                <TableCell sx={{ padding: "8px" }}>
                  {row.emergency ? "Yes" : "No"}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "8px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Tooltip title={row.description} arrow>
                    <span>{truncateDescription(row.description)}</span>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ padding: "8px" }}>
                  <Button
                    sx={{
                      ...actionButtonStyle,
                      marginLeft: 1,
                      backgroundColor: "orange",
                      ":hover": { backgroundColor: "lightyellow" },
                    }}
                    onClick={() => handleReschedule(row)}
                  >
                    Change
                  </Button>
                </TableCell>
                <TableCell sx={{ padding: "8px" }}>
                  <Button
                    sx={{
                      ...actionButtonStyle,
                      marginLeft: 1,
                      backgroundColor: "red",
                      ":hover": { backgroundColor: "pink" },
                    }}
                    onClick={() => handleCancel(row.appointmentID)}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25]}
        component="div"
        count={paginationTotalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Appointment</DialogTitle>
        <DialogContent>
          <BookAppointment />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <RescheduleAppointment
        open={openReschedule}
        onClose={handleCloseReschedule}
        appointment={currentAppointment} 
      />
    </Paper>
  );
};

export default AdminAppointmentTable;
