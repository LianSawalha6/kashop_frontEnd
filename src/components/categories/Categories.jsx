import React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useCategories from '../../hooks/useCategories';

export default function Categories() {
  
  const {isLoading, isError, data} = useCategories();

  if(isLoading){
    return <CircularProgress/>
  }

  if(isError){
    return <Typography color="error">Error...</Typography>
  }
  return (
    <Box component="section" className="home">
      <Typography component="h2" variant='h2'>Categories</Typography>
      {data.response.data.map((category)=>{
        return <Typography key={category.id} component="h3" variant='h3'>{category.name}</Typography>
      })}
    
    </Box>
  )
}
