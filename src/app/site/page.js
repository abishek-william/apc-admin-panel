"use client"

import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DataTable from '@/components/DataTable.js';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'totaldays', label: 'Total Day', minWidth: 100 },
  { id: 'totalnight', label: 'Total Night', minWidth: 100 },
  {
    id: 'totalmanpower',
    label: 'Total Manpower',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'details',
    label: 'Details',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

const rows = [
  { id: 1, name: 'SS Mall', totaldays: 2, totalnight: 4, totalmanpower: 32, details: <Button variant="contained" color="primary">View</Button>},
  { id: 2, name: 'KS Mall', totaldays: 2, totalnight: 4, totalmanpower: 32, details: <Button variant="contained" color="primary">View</Button> },
  { id: 3, name: 'LS Mall', totaldays: 2, totalnight: 4, totalmanpower: 32, details: <Button variant="contained" color="primary">View</Button> },
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