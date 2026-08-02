import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

const useRemoveFromCart = () => {

  const queryClient=useQueryClient()
  return useMutation({
    mutationFn:async(id)=>{
      return await authAxiosInstance.delete(`Carts/${id}`)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:['cart items']
      })
    }
  })
}

export default useRemoveFromCart