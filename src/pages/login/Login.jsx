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
import useAuthStore from '../../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate=useNavigate()

  const setToken=useAuthStore((state)=>(state.setToken))
  const [serverErrors,setServerErrors]=useState([])

  const {register, handleSubmit,formState:{errors,isSubmitting}}=useForm({
    resolver:yupResolver(loginSchema)
  })
  const loginForm=async (data)=>{
    try{
        const response=await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Login`,data)
        setToken(response.data.accessToken)
        navigate("/")
    }catch(error){
      setServerErrors(error.response.data.errors)
    }
  }
  return (
    <Box
    component="section" sx={{
      minHeight:"100vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"}}
    >
    <Box sx={{
      width: "100%",
      maxWidth:"500px",
      p:4,
      borderRadius:4,
      boxShadow:2,
    }}
    >
      <Typography component="h2" variant='h2'
      sx={{
        textAlign:"center",
        py:6,
        mb:5
      }}>Login</Typography>
      { serverErrors?.length > 0? serverErrors.map((error)=>{
         return <Typography variant='body2' color='error'>{error}</Typography>
      }) :''}

      <Box onSubmit={handleSubmit(loginForm)} component="form" className="login-form" sx={{mt:3, display:'flex', flexDirection:'column', gap:5}}>
        
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
        <Typography sx={{
          textAlign:"center"
        }}>Don't have an account?<Link to="/register">Sign up</Link></Typography>
      </Box>
    </Box>
    </Box>
  )
}
