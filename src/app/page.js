import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
   
        <Box sx={{ bgcolor: '#e3e1e1', height: '100vh', width:"100%" }}>

            {/* Your application content here */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

        </Box>

    </React.Fragment>
  );
}
