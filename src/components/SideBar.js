"use client"

import React from 'react';
import Link from 'next/link';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Dashboard, Place, Category, Report } from '@mui/icons-material';

const menuItems = [
  { href: "/dashboard", icon: <Dashboard />, text: "Dashboard" },
  { href: "/site", icon: <Place />, text: "Site" },
  { href: "/category", icon: <Category />, text: "Category" },
  { href: "/report", icon: <Report />, text: "Report" },
];

export default function NestedList() {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: "black" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: "1rem" }}>
          All Options
        </ListSubheader>
      }
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={item.text}>
          <Link href={item.href} passHref legacyBehavior>
            <ListItemButton component="a">
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
          {index < menuItems.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

