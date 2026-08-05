import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

const useClearCart = () => {
  const queryClient=useQueryClient()

  return useMutation({
    mutationFn: async()=>{
      return await authAxiosInstance.delete(`Carts/clear`)},
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart items']
      })
    }
  })
}

export default useClearCart