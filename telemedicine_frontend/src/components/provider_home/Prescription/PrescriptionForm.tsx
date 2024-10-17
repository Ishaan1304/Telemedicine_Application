import React, { useState, FormEvent, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dynamic from "next/dynamic";
import Editor from "@/components/Common/JoditEditor/JoditEditor";
import { useRouter } from "next/router";
import { addPrescription } from "@/redux/slice/prescriptionSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { fetchMedicalDocumentsByAppointmentId } from "@/pages/api/api";

export interface PrescriptionAdd {
  patientProfile: {
    patientID: number;
  };
  providerProfile: {
    providerID: number;
  };
  appointment: {
    appointmentID: number;
  };
  medication: string;
  dosage: string;
  instructions: string;
}

interface MedicalDocument {
  documentId: number;
  documentName: string;
  documentType: string;
  uploadedAt: string;
}

interface MedicalDocumentsListProps {
  appointmentId: number;
}

const PrescriptionForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { patientId, providerId, appointmentID } = router.query;

  const [medication, setMedication] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [prescriptions, setPrescriptions] = useState<PrescriptionAdd[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentID) {
      const fetchDocuments = async () => {
        try {
          const data = await fetchMedicalDocumentsByAppointmentId(
            +appointmentID
          );
          setDocuments(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchDocuments();
    }
  }, [appointmentID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (medication && dosage && instructions) {
      setPrescriptions((prev) => [
        ...prev,
        {
          patientProfile: { patientID: Number(patientId) },
          providerProfile: { providerID: Number(providerId) },
          appointment: { appointmentID: Number(appointmentID) },
          medication,
          dosage,
          instructions,
        },
      ]);
      setMedication("");
      setDosage("");
      setInstructions("");
    }
  };

  const handleDelete = (index: number) => {
    setPrescriptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrescribe = () => {
    setOpen(true);
  };

  const handleConfirmPrescribe = () => {
    dispatch(addPrescription(prescriptions));
    setPrescriptions([]);
    setOpen(false);
  };

  const handleCancelPrescribe = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        p={1}
        bgcolor="#fff"
        sx={{
          justifyContent: "space-between",
          margin: 1.5,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box flex={1} p={1} sx={{ marginRight: 0 }}>
          <Typography>Add Prescription</Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Box display="flex" mb={0.5}>
              <TextField
                label="Medication"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{}}
              />
              &nbsp;
              <TextField
                label="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                fullWidth
                required
                margin="normal"
                size="small"
                sx={{}}
              />
              &nbsp;
              <TextField
                label="Instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                fullWidth
                required
                margin="normal"
                size="small"
              />
              &nbsp;
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "300px", mt: 2, height: "40px" }}
              >
                Add
              </Button>
              &nbsp;
              <Button
                variant="outlined"
                color="secondary"
                onClick={handlePrescribe}
                disabled={prescriptions.length === 0}
                sx={{ width: "350px", mt: 2, height: "40px", mr: 0 }}
                size="small"
              >
                Prescribe
              </Button>
            </Box>
          </form>
          <Box
            mt={0.5}
            sx={{
              maxHeight: "200px",
              overflowY: "auto",
              borderRadius: "4px",
              padding: 0.1,
            }}
          >
            <Typography>Prescription List</Typography>
            <List>
              {prescriptions
                .slice()
                .reverse()
                .map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      mb: 0.5,
                      fontSize: "12px",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                    }}
                  >
                    <ListItemText
                      primary={`${item.medication} - ${item.dosage}`}
                      secondary={item.instructions}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Box>
        </Box>
        <Box flex={1} p={1}>
          <Editor />
        </Box>
        <Dialog open={open} onClose={handleCancelPrescribe}>
          <DialogTitle>Confirm Prescription</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to prescribe the following medications?
            </Typography>
            <List>
              {prescriptions.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${item.medication} - ${item.dosage}`}
                    secondary={item.instructions}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelPrescribe} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmPrescribe} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <div>
        <List>
          {documents.map((doc) => (
            <ListItem key={doc.documentId}>
              <ListItemText
                primary={
                  <Link
                    href={`http://localhost:8080/file/images/${doc.documentName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="primary"
                  >
                    {doc.documentType}
                  </Link>
                }
                secondary={`${doc.documentType} - Uploaded at ${new Date(
                  doc.uploadedAt
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default PrescriptionForm;
