import React from 'react'
import { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance'
import useAuthStore from '../../store/useAuthStore'
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import useCart from '../../hooks/useCart'

export default function Cart() {

  // const token=useAuthStore((state)=>state.token)
  // console.log(token)
  // const getItems= async()=>{
  //   try{
  //     const response=await authAxiosInstance.get('/Carts')
  //     console.log(response.data)
  //     return response.data;
  //   }catch(error){
  //     console.error(error)
  //   }
  // }

  // useEffect(()=>{
  //   getItems()
  // },[])

  const {data,isLoading,isError,error}=useCart()

  if(isLoading){
      return <CircularProgress/>
    }
  
    if(isError){
      return <Typography color="error">{error}</Typography>
    }

    console.log(data)
  return (
    <Box component="section">
      <Typography variant='h1'>Cart</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Product name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Actions</TableCell>
          </TableHead>


          <TableBody>
            {data.items.map((item)=>(
            <TableRow key={item.id}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.totalPrice}</TableCell>
              <TableCell>pp</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  )
}
