import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useGetProfile = () => {
  const getProfileInfo=async()=>{
    try{
      const response=await authAxiosInstance.get('/Profile')
      return response.data;
    }catch(err){
      console.log(err)
    }
  }
  return useQuery({
      queryKey:['profile info'],
      queryFn:getProfileInfo,
      staleTime:1000*60*5,
  
    });
}

export default useGetProfile