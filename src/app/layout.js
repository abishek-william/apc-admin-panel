import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from "@/components/NavBar.js";
import SideBar from "@/components/SideBar.js";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Arrow Point Constructions",
  description: "Generated by create next app",

};

export default function RootLayout(props) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <CssBaseline />
          <Box>
            <NavBar />
            <Box component="main" sx={{ display: "flex",bgcolor: '#e3e1e1' }}>
            <SideBar />
            
              {props.children}
            </Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
