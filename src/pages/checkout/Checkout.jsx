import React, { useState } from 'react'
import useCart from '../../hooks/useCart'
import useCheckout from '../../hooks/useCheckout'
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';

const Checkout = () => {
  const {data,isError,error,isLoading}=useCart()

  const [paymentMethod,setPaymentMethod]=useState('')
  const {mutate:checkout,isPending}=useCheckout()
  if(isError) return <Box >{error.message}</Box>
  if(isLoading)return <CircularProgress/>
  
  return (
    <Box>
    <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Product name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableHead>


          <TableBody>
            {data.items.map((item)=>(
            <TableRow key={item.id}>
              <TableCell>{item.productName}</TableCell>
              <TableCell>{item.price}$</TableCell>
              <TableCell>
                <Box sx={{display:'flex',alignItems:'center'}}>
                  
                  <Typography>{item.count}</Typography>
                  
                </Box>
              </TableCell>
              <TableCell>{item.totalPrice}$</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    
    <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={paymentMethod}
    label="Payment"
    onChange={(e)=>{setPaymentMethod(e.target.value)}}
  >
    <MenuItem value={"Cash"}>Cash</MenuItem>
    <MenuItem value={'Visa'}>Visa</MenuItem>
  </Select>
</FormControl>
<Button variant='contained'onClick={()=>checkout({paymentMethod})}>Pay now</Button>
    </Box>
  )
}

export default Checkout