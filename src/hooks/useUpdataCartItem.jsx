import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

const useUpdataCartItem = () => {

  const queryClient=useQueryClient()
  return useMutation({
    mutationFn:async({productId,count})=>{
      return await authAxiosInstance.patch(`Carts/${productId}`,{
        count
      })
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart items']
      })
    }
  })
}

export default useUpdataCartItem