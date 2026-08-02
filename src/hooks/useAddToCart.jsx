import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

const useAddToCart = () => {

  return useMutation({
    mutationFn: async(values)=>{
      return await authAxiosInstance.post("/Carts",{
        ProductId:values.productId,
        Count:values.count
      })}
  })
  
}

export default useAddToCart