import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {

  const getItems=async()=>{
    try{
      const response=await authAxiosInstance.get('/Carts')
      return response.data;
    }catch(err){
      console.log(err)
    }
  }
  return useQuery({
      queryKey:['cart items'],
      queryFn:getItems,
      staleTime:1000*60*5,
  
    });
}

export default useCart