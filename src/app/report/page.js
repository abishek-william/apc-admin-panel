"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sites, setSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSite, setSelectedSite] = useState('');
  const [categoryValues, setCategoryValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [siteResponse, categoryResponse, reportResponse] = await Promise.all([
          axios.get('/api/site'),
          axios.get('/api/category'),
          axios.get('/api/report')
        ]);

        setSites(siteResponse.data);
        setCategories(categoryResponse.data);
        setReports(reportResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  const handleCategoryChange = (categoryId, value) => {
    setCategoryValues((prevValues) => ({
      ...prevValues,
      [categoryId]: value,
    }));
  };

  const handleSubmit = async () => {
    const reportData = {
      siteId: selectedSite,
      categories: categoryValues,
    };

    try {
      const response = await axios.post("/api/report", reportData);
      setReports((prevReports) => [...prevReports, response.data]);
      alert("Report added successfully!");
      handleCloseModal();
    } catch (error) {
      console.error("Error adding report:", error);
      alert("Failed to add report.");
    }
    finally{
      const response = await axios.get("/api/report")
      setReports(response.data);
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
          Daily Reports
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add New Report
        </Button>
      </Box>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Add New Report
          </Typography>

          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <InputLabel id="site-select-label">Select Site</InputLabel>
            <Select
              labelId="site-select-label"
              value={selectedSite}
              onChange={handleSiteChange}
              label="Select Site"
            >
              {sites?.map((site) => (
                <MenuItem key={site._id} value={site._id}>
                  {site.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {categories?.map((category) => (
            <TextField
              key={category._id}
              label={`Number of ${category.categoryName}s`}
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              onChange={(e) => handleCategoryChange(category._id, e.target.value)}
            />
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Site</TableCell>
              <TableCell>Date</TableCell>
              {categories.map((category) => (
                <TableCell key={category._id}>{category.categoryName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report._id}>
                <TableCell>{report?.siteId?.name}</TableCell>
                <TableCell>
                  {new Date(report.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                {categories.map((category) => (
                  <TableCell key={category._id}>
                    {report.categories[category._id] || 0}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
