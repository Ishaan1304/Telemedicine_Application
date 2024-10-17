import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';

const PatientForm: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [disease, setDisease] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [specialty, setSpecialty] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        setDisease('');
        setLocation('');
        setSpecialty('');
        setDescription('');
        onClose(); // Close the dialog after submission
    };

    return (
        <Dialog open={open} onClose={onClose}>
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};