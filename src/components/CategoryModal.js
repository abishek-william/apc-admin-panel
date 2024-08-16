
"use client";

import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

export default function CategoryModal({ open, onClose, onSubmit }) {
  // console.log("onSubmit : " + onSubmit);
  const [categoryName, setCategoryName] = useState('');

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = () => {
    if (categoryName.trim() === '') {
      alert('Please enter a category name');
      return;
    }
    onSubmit(categoryName);  // Make sure onSubmit is correctly called
    setCategoryName(''); // Clear the input after submission
  };

  const handleCancel = () => {
    setCategoryName(''); // Clear the input when the modal is closed
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="input-modal-title"
      aria-describedby="input-modal-description"
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
        <Typography id="input-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Add New Category
        </Typography>
        <TextField
          fullWidth
          label="Category Name"
          value={categoryName}
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
