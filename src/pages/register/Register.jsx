import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { registerSchema } from '../../validations/RegisterSchema';

export default function Register() {

  const [serverErrors,setServerErrors]=useState([])

  const {register, handleSubmit,formState:{errors,isSubmitting}}=useForm({
    resolver:yupResolver(registerSchema)
  })
  const registerForm=async (data)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`,data)
        console.log(response)
    }catch(error){
      setServerErrors(error.response.data.errors)
    }
  }
  return (
    <Box component="section" className="register">
      <Typography component="h2" variant='h2'>Register</Typography>
      { serverErrors?.length > 0? serverErrors.map((error)=>{
         return <Typography variant='body2' color='error'>{error}</Typography>
      }) :''}

      <Box onSubmit={handleSubmit(registerForm)} component="form" className="register-form" sx={{marginTop:2, display:'flex', flexDirection:'column', gap:2}}>
        <TextField fullWidth {...register("userName",{required:true})}  label="Username" variant="outlined" 
        error={errors.userName}
        helperText={errors.userName?.message}
        />
        <TextField fullWidth {...register("fullName",{required:true})} label="Full Name" variant="outlined" 
        error={errors.fullName}
        helperText={errors.fullName?.message}
        />
        <TextField fullWidth {...register("email",{required:true})} label="Email" variant="outlined" 
        error={errors.email}
        helperText={errors.email?.message}
        />
        <TextField fullWidth {...register("password",{required:true})} label="Password" variant="outlined" 
        error={errors.password}
        helperText={errors.password?.message}
        />
        <TextField fullWidth {...register("phoneNumber",{required:true})} label="Phone Number" variant="outlined" 
        error={errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  )
}
