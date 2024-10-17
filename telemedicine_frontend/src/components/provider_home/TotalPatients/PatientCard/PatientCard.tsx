import React from "react";
import styles from "./PatientCard.module.css";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface PatientCardProps {
  patientName: string;
  patientGender: string;
  appointmentDate: string;
  patientCity:string;
  patientState:string;
  patientCountry:string;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patientName,
  patientGender,
  appointmentDate,
  patientCity,
  patientState,
  patientCountry,
}) => {
  return (
    <Card className={styles.card} sx={{ marginBottom: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">Patient: {patientName}</Typography>
        <Typography variant="body2">Gender: {patientGender}</Typography>
        <Typography variant="body2">Address: {patientCity}</Typography>
        <Typography variant="body2">{patientState+" "+patientCountry}</Typography>
        <Typography variant="body2">Date: {appointmentDate}</Typography>
      </CardContent>
    </Card>
  );
};

export default PatientCard;