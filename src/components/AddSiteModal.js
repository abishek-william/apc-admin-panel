"use client";

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

export default function AddSiteModal({ open, onClose, onSubmit }) {
  const [siteName, setSiteName] = useState('');

  const handleInputChange = (event) => {
    setSiteName(event.target.value);
  };

  const handleSubmit = () => {
    if (siteName.trim() === '') {
      alert('Please enter a site name');
      return;
    }
    onSubmit(siteName); // Pass the site name to the parent component
    setSiteName(''); // Clear the input after submission
  };

  const handleCancel = () => {
    setSiteName(''); // Clear the input when the modal is closed
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="add-site-modal-title"
      aria-describedby="add-site-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="add-site-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Add New Site
        </Typography>
        <TextField
          fullWidth
          label="Site Name"
          value={siteName}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 3 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

