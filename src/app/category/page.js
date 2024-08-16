
"use client";

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DataTable from "@/components/DataTable.js";
import CategoryModal from "@/components/CategoryModal.js";
import axios from 'axios';

const columns = [
  { id: "categoryName", label: "Category Name", minWidth: 170 },
  { id: "editCategory", label: "Edit", minWidth: 100 },
  { id: "deleteCategory", label: "Delete", minWidth: 100 },
];

function Category() {
  const [rows, setRows] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category');
        const categories = response.data;

        // Transform the data to fit the DataTable format
        const transformedCategories = categories.map((category, index) => ({
          id: index + 1,
          categoryName: category.categoryName,
          editCategory: <Button variant="contained" color="primary">Edit</Button>,
          deleteCategory: <Button variant="contained" color="error">Delete</Button>,
        }));

        setRows(transformedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddCategory = async (categoryName) => {
    try {
      const response = await axios.post('/api/category', { categoryName });
      const newCategory = response.data;

      setRows((prevRows) => [
        ...prevRows,
        {
          id: prevRows.length + 1,
          categoryName: newCategory.categoryName,
          editCategory: <Button variant="contained" color="primary">Edit</Button>,
          deleteCategory: <Button variant="contained" color="error">Delete</Button>,
        },
      ]);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100%", margin: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 4,
          marginBottom: 1,
          marginTop: 4,
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #ccc",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Category
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add New Category
        </Button>
        <CategoryModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleAddCategory}
        />
      </Box>
      <DataTable columns={columns} rows={rows} />
    </Box>
  );
}

export default Category;
