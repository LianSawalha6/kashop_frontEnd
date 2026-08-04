import React from 'react'
import { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance'
import useAuthStore from '../../store/useAuthStore'
import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import useCart from '../../hooks/useCart'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import useUpdataCartItem from '../../hooks/useUpdataCartItem'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Cart() {

    const {t}=useTranslation()
    const navigate=useNavigate()
  
  const {data,isLoading,isError,error}=useCart()
  const {mutate:removeItem,isPending}=useRemoveFromCart()
  const {mutate:updateQuantity,isPending:updateQuantityPending}=useUpdataCartItem()

  if(isLoading){
      return <CircularProgress/>
    }
  
    if(isError){
      return <Typography color="error">{error}</Typography>
    }

    const handleUpdate=(productId,action)=>{
      const item=data?.items?.find(i=>i.productId==productId)
      if(action=="+"){
        updateQuantity({productId,count:item.count+1})
      }
      else
        updateQuantity({productId,count:item.count-1})

    }
    
  return (
    <Box component="section">
      <Typography variant='h1'>{t("Cart")}</Typography>
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
              <TableCell>{item.price}$</TableCell>
              <TableCell>
                <Box sx={{display:'flex',alignItems:'center'}}>
                  <IconButton size='small' onClick={()=>{handleUpdate (item.productId,"-")}}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography>{item.count}</Typography>
                  <IconButton size='small' onClick={()=>{handleUpdate (item.productId,"+")}}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>{item.totalPrice}$</TableCell>
              <TableCell><Button color='error' disabled={isPending} onClick={()=>{removeItem(item.productId)}}>Remove</Button></TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Button variant='contained' onClick={()=>navigate('/checkout')}>Process to Checkout</Button>
        <Button onClick={()=>navigate('/')}>Continue shopping</Button>
      </Box>

    </Box>
  )
}
