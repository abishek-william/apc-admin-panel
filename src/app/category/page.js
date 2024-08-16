"use client"

import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DataTable from '@/components/DataTable.js';

const columns = [
  { id: 'categoryName', label: 'Category Name', minWidth: 170 },
  { id: 'editCategory', label: 'Edit', minWidth: 100 },
  { id: 'deleteCategory', label: 'Delete', minWidth: 100 }
];

const rows = [
  { id: 1, categoryName: 'Painter', editCategory: <Button variant="contained" color="primary">Edit</Button> , deleteCategory: <Button variant="contained" color="error">Delete</Button>},
  { id: 1, categoryName: 'Mason', editCategory: <Button variant="contained" color="primary">Edit</Button> , deleteCategory: <Button variant="contained" color="error">Delete</Button>},
  { id: 1, categoryName: 'Plumber', editCategory: <Button variant="contained" color="primary">Edit</Button> , deleteCategory: <Button variant="contained" color="error">Delete</Button>},
];



function Category() {
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
          Category
        </Typography>
        <Button variant="contained" color="primary">
          Add New Category
        </Button>
      </Box>
      <DataTable columns={columns} rows={rows} />
    </Box>
  )
}

export default Category