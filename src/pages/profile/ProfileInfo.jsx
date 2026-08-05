import {Avatar,Box,CircularProgress,Divider,Grid,Paper,Typography} from "@mui/material";
import React from "react";
import useGetProfile from "../../hooks/useGetProfile";

const ProfileInfo = () => {
  const { data, isError, isLoading } = useGetProfile();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  return (
    <Box sx={{}}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
        }}
      >
        Personal settings
      </Typography>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "primary.main",
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          {data?.fullName?.charAt(0).toUpperCase()}
        </Avatar>

        <Box>
          <Typography variant="h5">
            {data?.fullName}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: 8,
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              mb: 2,
            }}
          >
            Email Address
          </Typography>
          {data.email}
        </Box>

        <Box
          sx={{
            borderRadius: 8,
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              mb: 2,
            }}
          >
            Phone Number
          </Typography>
          {data.phoneNumber}
        </Box>

        <Box
          sx={{
            borderRadius: 8,
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              mb: 2,
            }}
          >
            City
          </Typography>
          {data?.city || "Not set"}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfo;