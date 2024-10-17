import React, { useEffect, useState } from "react";
import {
  Paper,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  deleteAppointment,
  getAppointments,
} from "@/redux/slice/appointmentsSlice";
import { actionButtonStyle } from "@/components/provider_home/Dashboard/AppointmentTable/AppointmentTableStyles";
import { uploadDocument } from "@/redux/slice/documentsSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const MyAppointmentsPatient: React.FC = () => {
  const dispatch = useAppDispatch();
  const patientProfile = useAppSelector((state) => state.patientProfile);
  const appointments = useAppSelector(
    (state) => state.appointments.patientUpcomingAppointments
  );

  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [selectedAppointmentID, setSelectedAppointmentID] = useState<
    number | null
  >(null);
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    if (patientProfile.patientID !== 0) {
      dispatch(getAppointments({ id: patientProfile.patientID }));
    }
  }, [patientProfile]);

  const handleUpload = () => {
    const id=localStorage.getItem('id');
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
  
    
    
      if(id && selectedAppointmentID && filename)  dispatch(uploadDocument({appointmentId:selectedAppointmentID,userID:+id,fileType:filename,formData:formData}))
    
  
      setOpenUploadModal(false); 
      setFile(null);
      setFilename(""); 
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleCancel = (appointmentID: number) => {
    dispatch(deleteAppointment({ id: appointmentID }));
  };

  return (
    <Paper sx={{ border: "1px solid black", minHeight: "80%" }}>
      <Modal open={openUploadModal} onClose={() => setOpenUploadModal(false)}>
        <Box sx={style}>
          <h2 style={{marginBottom:"20px"}}>Upload Document</h2>
          <TextField
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            fullWidth
            required
          />
          <input
            type="file"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                setFile(files[0]);
              } else {
                setFile(null);
              }
            }}
          />
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Upload
          </Button>
        </Box>
      </Modal>

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
              <TableCell sx={{ width: "200px" }}>Time</TableCell>
              <TableCell sx={{ width: "150px" }}>Disease</TableCell>
              <TableCell sx={{ width: "100px" }}></TableCell>
              <TableCell sx={{ width: "100px" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.appointment.appointmentID}>
                <TableCell sx={{ padding: "8px" }}>
                  {appointment.userPic ? (
                    <div style={{ borderRadius: "50%" }}>
                      <img
                        src={
                          "http://localhost:8080/userProfile/images/get/" +
                          appointment.userPic
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
                        justifyContent: "center",
                      }}
                    >
                      <h3>
                        {`${appointment.appointment.patientProfile.user.firstName
                          .charAt(0)
                          .toUpperCase()}${appointment.appointment.patientProfile.user.lastName
                          .charAt(0)
                          .toUpperCase()}`}
                      </h3>
                    </div>
                  )}
                </TableCell>
                <TableCell>{`${appointment.appointment.providerProfile.user.firstName} ${appointment.appointment.providerProfile.user.lastName}`}</TableCell>
                <TableCell>
                  {appointment.appointment.providerProfile.gender}
                </TableCell>
                <TableCell>
                  {appointment.appointment.providerProfile.user.phone}
                </TableCell>
                <TableCell>
                  {appointment.appointment.providerProfile.user.cityName}
                </TableCell>
                <TableCell>
                  {new Date(
                    appointment.appointment.startTime
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {appointment.appointment.startTime.substring(11)}
                </TableCell>
                <TableCell>{appointment.appointment.disease}</TableCell>
                <TableCell>
                  <Button
                    sx={{
                      ...actionButtonStyle,
                      marginLeft: 1,
                      backgroundColor: "blue",
                      ":hover": { backgroundColor: "lightblue" },
                    }}
                    onClick={() => {
                      setSelectedAppointmentID(
                        appointment.appointment.appointmentID
                      );
                      setOpenUploadModal(true);
                    }}
                  >
                    Add 📄
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
                    onClick={() =>
                      handleCancel(appointment.appointment.appointmentID)
                    }
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MyAppointmentsPatient;
