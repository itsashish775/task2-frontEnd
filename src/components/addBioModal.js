import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { updateBio } from '../API/updateBio';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddBioModal({ open, setOpen }) {
    const [bio, setBio] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (event) => {
        setBio(event.target.value);
        setError(''); // Clear error when user starts typing
    };

    const handleSave = async () => {
        // Validate bio length
        if (bio.trim().length < 10) {
            setError('Bio must be at least 10 characters long.');
            return;
        }

        if (bio.length > 1000) {
            setError('Bio must not exceed 1000 characters.');
            return;
        }

        // Handle saving the bio here
        console.log('Bio:', bio);
        try {
            setIsDisabled(true)
            let data = {
                id: localStorage.getItem("userId"),
                bio: bio
            }
            setIsDisabled(false)
            const res = await updateBio(data)
        } catch (error) {

        }

        setOpen(false)// Close the modal after saving
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Bio
                </Typography>
                <TextField
                    id="bio-input"
                    label="Bio"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={bio}
                    onChange={handleChange}
                    error={!!error} // Display error style if there's an error
                    helperText={error} // Display the error message below the input
                    sx={{ mt: 2 }}
                />
                <Button
                    disabled={isDisabled}
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
}

export default AddBioModal;
