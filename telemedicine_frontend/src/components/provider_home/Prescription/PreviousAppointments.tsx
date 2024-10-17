import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useRouter } from 'next/router';
import { getProviderPreviousAppointments, InitialStateAppointments } from '@/redux/slice/appointmentsSlice';
import Image from 'next/image';

interface User {
  userID: number;
  firstName: string;
  lastName: string;
}

interface PatientProfile {
  patientID: number;
  user: User;
}

interface ProviderProfile {
  providerID: number;
  user: User;
}

interface Prescription {
  prescriptionId: number;
  medication: string;
  dosage: string;
  instructions: string;
}

interface Appointment {
  appointmentID: number;
  patientProfile: PatientProfile;
  providerProfile: ProviderProfile;
  status: string;
  description: string;
  startTime: string;
  endTime: string;
  documents: any;
  prescriptions: Prescription[];
}

const PreviousAppointments: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { patientId } = router.query;

  const appointments = useAppSelector(
    (state: { appointments: InitialStateAppointments }) => state.appointments.providerPreviousAppointments
  );

  const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    if (patientId !== undefined && patientId !== "") {
      dispatch(getProviderPreviousAppointments(+patientId));
    }
  }, [patientId]);

  const handleChange = (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 0.5, p: 2 }}>
      <Typography variant="h5" gutterBottom align="center">
        Previous Prescriptions
      </Typography>
      <Paper sx={{ maxHeight: 500, overflow: 'auto', padding: 2, borderRadius: 2 }}>
        {appointments.map((appointment) => (
          <Accordion
            key={appointment.appointmentID}
            expanded={expanded === appointment.appointmentID}
            onChange={handleChange(appointment.appointmentID)}
            sx={{ marginBottom: 1, width: '100%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${appointment.appointmentID}-content`}
              id={`panel-${appointment.appointmentID}-header`}
            >
              <Typography>
                {`Appointment with ${appointment.providerProfile.user.firstName} ${appointment.providerProfile.user.lastName} on ${new Date(appointment.startTime).toLocaleDateString()}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Patient:</strong> {`${appointment.patientProfile.user.firstName} ${appointment.patientProfile.user.lastName}`}<br />
                  <strong>Status:</strong> {appointment.status}<br />
                  <strong>Description:</strong> {appointment.description}<br />
                  <strong>Start Time:</strong> {new Date(appointment.startTime).toLocaleString()}<br />
                  <strong>End Time:</strong> {new Date(appointment.endTime).toLocaleString()}<br />
                </Typography>

                <Box
                  sx={{
                    border: '1px solid black',
                    borderRadius: 1,
                    p: 1,
                    pb: 2,
                    mb: 1,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <Typography align="center" sx={{ mb: 1 }}>
                    Prescriptions
                  </Typography>
                  <List>
                    {appointment.prescriptions.map((prescription: any) => (
                      <ListItem key={prescription.prescriptionId} sx={{ padding: 0 }}>
                        <ListItemText
                          primary={prescription.medication}
                          secondary={`Dosage: ${prescription.dosage} | Instructions: ${prescription.instructions}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box
                  sx={{
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 0.1 }}>
                    <strong>Documents:</strong>
                  </Typography>
                  <List>
                    {appointment.documents.map((doc: any) => (
                      <ListItem key={doc.documentID} sx={{ padding: 0 }}>
                        <ListItemText
                          primary={doc.documentType}
                          secondary={
                            <Button
                              variant="text"
                              onClick={() => window.open("http://localhost:8080/file/images/" + doc.documentName, '_blank')}
                            >
                              Open
                            </Button>
                          }
                        />
                        <Image src={"http://localhost:8080/file/images/" + doc.documentName} alt='img' width={50} height={50} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Box>
  );
};

export default PreviousAppointments;
