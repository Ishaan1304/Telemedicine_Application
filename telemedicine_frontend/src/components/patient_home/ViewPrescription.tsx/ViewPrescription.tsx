import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getPrescriptionByAppointmentID } from "@/redux/slice/prescriptionSlice";
import { useEffect } from "react";
import { Typography, List, ListItem, Box, Paper, Divider } from "@mui/material";

interface ViewPrescriptionProps {
    appointmentId: number;
}

interface User {
    userID: number;
    firstName: string;
    lastName: string;
}

interface Provider {
    providerID: number;
    specialty: string;
    gender: string;
    qualifications: string;
    consultationFee: number;
    availableFrom: string;
    availableTo: string;
    user: User;
}

interface Prescription {
    prescriptionId: number;
    patientProfile: {
        patientID: number;
        user: User;
    };
    providerProfile: {
        providerID: number;
        user: User;
    };
    appointment: {
        appointmentID: number;
    };
    medication: string;
    dosage: string;
    instructions: string;
    issuedAt: string;
}

export const ViewPrescription: React.FC<ViewPrescriptionProps> = ({ appointmentId }) => {
    const dispatch = useAppDispatch();
    const prescriptions: Prescription[] = useAppSelector((state) => state.prescription.prescriptionByAppointmentID);

    useEffect(() => {
        if (appointmentId !== null && appointmentId !== undefined) {
            dispatch(getPrescriptionByAppointmentID({ id: appointmentId }));
        }
    }, [appointmentId, dispatch]);

    return (
        <Box sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', border:"2px solid gray", height:560 }}>
            <Paper elevation={0} sx={{ width: '1000px'}}>
                {prescriptions.length === 0 ? (
                    <Typography variant="h6" align="center">No Prescription for this Appointment</Typography>
                ) : (
                    <Box sx={{ height :550}}>
                        <Typography variant="h4" gutterBottom align="center">
                            Dr. {prescriptions[0].providerProfile.user.firstName} {prescriptions[0].providerProfile.user.lastName}
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />
                        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
                            <List>
                                {prescriptions.map((prescription) => (
                                    <ListItem key={prescription.prescriptionId} sx={{ display: 'block', marginBottom: 2 }}>
                                        <Typography variant="h6"><strong>Medication:</strong> {prescription.medication}</Typography>
                                        <Typography variant="body1"><strong>Dosage:</strong> {prescription.dosage}</Typography>
                                        <Typography variant="body2"><strong>Instructions:</strong> {prescription.instructions}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};
