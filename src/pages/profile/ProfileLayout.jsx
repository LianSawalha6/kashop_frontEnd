import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <Box>
      <Typography>My Profile</Typography>

      <Link to=''>Info</Link>
      <Link  to="orders">Orders</Link>
      <Box>
      <Outlet/>
      </Box>
    </Box>
  )
}

export default ProfileLayout