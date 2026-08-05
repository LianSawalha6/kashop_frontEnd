import {Box,MenuItem,MenuList,Paper,Typography,} from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import useGetProfile from "../../hooks/useGetProfile";

const ProfileLayout = () => {
  const { data } = useGetProfile();
  console.log("profile info: ",data)

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" 
      sx={{
        mb:5,
      }}>
        My Profile
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Paper
          elevation={3}
          sx={{
            width: 250,
            borderRadius: 3,
            overflow: "hidden",
            height: "fit-content",
          }}
        >
          <MenuList>
            <MenuItem
              component={Link}
              to=""
              sx={{
                py: 2,
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Profile Info
            </MenuItem>

            <MenuItem
              component={Link}
              to="orders"
              sx={{
                py: 2,
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              My Orders
            </MenuItem>

          </MenuList>
        </Paper>

        <Paper
          sx={{
            flex: 1,
            p: 8,
            borderRadius: 3,
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfileLayout;