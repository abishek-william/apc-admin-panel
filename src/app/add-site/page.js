"use client"

import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DataTable from '@/components/DataTable';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size (km²)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const rows = [
  { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1324171354 / 3287263 },
  { name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 1403500365 / 9596961 },
  // Add more rows here...
];



function AddSite() {
  return (
    <Box sx={{ height: '100vh', width: '100%',margin: 2 }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 4,
        marginBottom: 1,
        marginTop:4,
        backgroundColor: '#f5f5f5',
        borderTop: "1px solid #ccc",
      }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          All Site's
        </Typography>
        <Button variant="contained" color="primary">
          Add New Site
        </Button>
      </Box>
      <DataTable columns={columns} rows={rows} />
    </Box>
  )
}

export default AddSite