"use client";

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DataTable from '@/components/DataTable';
import AddSiteModal from '@/components/AddSiteModal';
import axios from 'axios';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'totaldays', label: 'Total Day', minWidth: 100 },
  {
    id: 'totalmanpower',
    label: 'Total Manpower',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 100,
    align: 'right',
  },
];

function AddSite() {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch sites on component mount
    const fetchSites = async () => {
      try {
        const response = await axios.get('/api/site');
        const sites = response.data;

        // Transform the data to fit the DataTable format
        const transformedSites = sites.map((site, index) => ({
          id: index + 1,
          name: site.name,
          totaldays: site.totaldays || 0,
          totalnight: site.totalnight || 0,
          totalmanpower: site.totalmanpower || 0,
          details: <Button variant="contained" color="primary">View</Button>,
        }));

        setRows(transformedSites);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddSite = async (siteName) => {
    try {
      const response = await axios.post('/api/site', { name: siteName });
      const newSite = response.data;

      setRows((prevRows) => [
        ...prevRows,
        {
          id: prevRows.length + 1,
          name: newSite.name,
          totaldays: newSite.totaldays || 0,
          totalmanpower: newSite.totalmanpower || 0,
          details: <Button variant="contained" color="primary">View</Button>,
        },
      ]);
    } catch (error) {
      console.error("Error adding site:", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100%', margin: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
          marginBottom: 1,
          marginTop: 4,
          backgroundColor: '#f5f5f5',
          borderTop: "1px solid #ccc",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          All Site's
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add New Site
        </Button>
      </Box>
      <DataTable columns={columns} rows={rows} />
      <AddSiteModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddSite}
      />
    </Box>
  );
}

export default AddSite;
