// PopupModal.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface PopupModalProps {
  onClose: () => void;
  onSubmit: (data: { disease: string; location: string; specialty: string; description: string }) => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ onClose, onSubmit }) => {
  const [open, setOpen] = useState(true);
  const [disease, setDisease] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [specialty, setSpecialty] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose prop to notify the parent
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ disease, location, specialty, description }); // Pass data to parent
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Patient Information Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name of the Disease"
            fullWidth
            margin="normal"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
          <TextField
            label="Preferred Location"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <TextField
            label="Specialty of the Doctor"
            fullWidth
            margin="normal"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupModal;
