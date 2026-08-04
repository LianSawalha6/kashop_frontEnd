import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import authAxiosInstance from '../api/authAxiosInstance'

const useCheckout = () => {
  const queryClient=useQueryClient()

  return useMutation({
    mutationFn: async({paymentMethod})=>{
      return await authAxiosInstance.post("/Checkouts",{
        PaymentMethod:paymentMethod,
      })},
    onSuccess:(response)=>{
      console.log(response)
      if(response.data.url){
        location.href=response.data.url
      }
      queryClient.invalidateQueries({
        queryKey:['cart items']
      })
    }
  })
}

export default useCheckout
