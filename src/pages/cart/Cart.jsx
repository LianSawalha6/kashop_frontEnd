import React from 'react'
import { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance'
import useAuthStore from '../../store/useAuthStore'
import { Button } from '@mui/material'

export default function Cart() {

  const token=useAuthStore((state)=>state.token)
  console.log(token)
  const getItems= async()=>{
    try{
      const response=await authAxiosInstance.get('/Carts')
      console.log(response.data)
      return response.data;
    }catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    getItems()
  },[])
  return (
    <>
      <div>Cart</div>
    </>
  )
}
