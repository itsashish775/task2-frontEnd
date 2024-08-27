import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { uploadVideo } from '../API/uploadVideo';
import { uploadVideoContent } from '../API/uploadVideoConent';

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

function AddVideoModal({ open, setOpen }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);


    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Video file size must not exceed 5MB.');
                setVideoFile(null);
            } else {
                setVideoFile(file);
                setError('');
            }
        }
    };

    const handleUpload = async () => {
        if (!videoFile) {
            setError('Please select a valid video file.');
            return;
        }

        // Validate title
        if (!title || title.length < 5 || title.length > 100) {
            setError('Title must be between 5 and 100 characters.');
            return;
        }

        // Validate description
        if (!description || description.length < 10 || description.length > 1000) {
            setError('Description must be between 10 and 1000 characters.');
            return;
        }

        try {
            setIsUploading(true)
            const res = await uploadVideo({ file: videoFile });

            // Handle the upload logic here
            if (res.status === 200) {  // Use '===' for comparison
                console.log('Title:', title);
                console.log('Description:', description);
                console.log('Video File:', res.url);
            }
            let sendData = { title, description, videoURL: res.url, uploadedBy: localStorage.getItem("userId") }
            console.log(sendData);
            await uploadVideoContent(sendData)
            setIsUploading(false)

        } catch (error) {
            console.log(error);
        }

        // Close the modal after upload
        setOpen(false);
    };


    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                    Add Video
                </Typography>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    value={description}
                    onChange={handleDescriptionChange}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    disabled={isUploading}
                >
                    Upload Video
                    <input
                        type="file"
                        accept="video/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    disabled={isUploading}
                    onClick={handleUpload}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Save Video
                </Button>
            </Box>
        </Modal>
    );
}

export default AddVideoModal;
