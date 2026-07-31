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
import { loginSchema } from '../../validations/LoginSchema';

export default function Login() {

  const [serverErrors,setServerErrors]=useState([])

  const {register, handleSubmit,formState:{errors,isSubmitting}}=useForm({
    resolver:yupResolver(loginSchema)
  })
  const loginForm=async (data)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`,data)
        localStorage.setItem('accessToken',response.data.accessToken)
    }catch(error){
      setServerErrors(error.response.data.errors)
    }
  }
  return (
    <Box component="section" className="login">
      <Typography component="h2" variant='h2'>Login</Typography>
      { serverErrors?.length > 0? serverErrors.map((error)=>{
         return <Typography variant='body2' color='error'>{error}</Typography>
      }) :''}

      <Box onSubmit={handleSubmit(loginForm)} component="form" className="login-form" sx={{marginTop:2, display:'flex', flexDirection:'column', gap:2}}>
        
        <TextField fullWidth {...register("email",{required:true})} label="Email" variant="outlined" 
        error={errors.email}
        helperText={errors.email?.message}
        />
        <TextField fullWidth {...register("password",{required:true})} label="Password" variant="outlined" 
        error={errors.password}
        helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'login'}
        </Button>
      </Box>
    </Box>
  )
}
