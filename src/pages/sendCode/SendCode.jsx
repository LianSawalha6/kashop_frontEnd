import React, { useState } from 'react'
import useSendCode from '../../hooks/useSendCode'
import { Alert, Box, Button, CircularProgress, Link, Snackbar, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { sendCodeSchema } from '../../validations/SendCodeSchema'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const SendCode = () => {
  const{mutate:sendCode,isPending}=useSendCode()
  const [open,setOpen]=useState(false)
  
  const onSubmit = (data) => {
  sendCode(data, {
    onSuccess: () => {
      setOpen(true);
    },
  });
};
  const{register,handleSubmit,formState:{errors,isSubmitting}}=useForm({
    resolver:yupResolver(sendCodeSchema)
  })
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 4,
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            mb: 6,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography component="h4" variant="h4">
            Forgot your password?
          </Typography>
          <Typography variant="body2">
            Enter your email and we'll send you a verification code to reset it.
          </Typography>
        </Box>

        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          className="login-form"
          sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 5 }}
        >
          <TextField
            fullWidth
            {...register("email", { required: true })}
            label="Email"
            variant="outlined"
            error={errors.email}
            helperText={errors.email?.message}
          />
          <Button variant="contained" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              "Send verification code"
            )}
          </Button>
          <Box
            component={RouterLink}
            to="/login"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              color: "GrayText",
              textDecoration: "none",
            }}
          >
            <ArrowBackIcon />
            <Link underline="none">Back to log in</Link>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setOpen(false)}
        >
          Verification code sent successfully. Please check your email.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SendCode