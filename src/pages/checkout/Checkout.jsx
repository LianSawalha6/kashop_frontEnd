import React, { useState } from 'react'
import useCart from '../../hooks/useCart'
import useCheckout from '../../hooks/useCheckout'
import { Box, Button, Card, CardContent, CircularProgress, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';

const Checkout = () => {
  const {data,isError,error,isLoading}=useCart()

  const [paymentMethod,setPaymentMethod]=useState('')
  const {mutate:checkout,isPending}=useCheckout()
  if(isError) return <Box >{error.message}</Box>
  if(isLoading)return <CircularProgress/>

  const subtotalCost = data.items.reduce((sum, item) => sum +item.totalPrice, 0);
  console.log(subtotalCost)
  
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: {
          xs: "stretch",
          md: "center",
        },
        justifyContent: "center",
        gap: 4,
        p: {
          xs: 2,
          sm: 3,
          md: 5,
        },
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flex: 2,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableCell>Product name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableHead>

          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>{item.count}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.totalPrice}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Card
        sx={{
          flex: 1,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: 2,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
            }}
          >
            Order Summary
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography>Subtotal ({data.items.length} items)</Typography>
            <Typography>{subtotalCost}$</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography>shipping</Typography>
            <Typography>Free</Typography>
          </Box>
          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Typography fontWeight={700}>Total</Typography>

            <Typography variant="h5" fontWeight={700}>
              ${subtotalCost}
            </Typography>
          </Box>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="demo-simple-select-label">
              Payment Method
            </InputLabel>
            <Select
              sx={{
                mb: 3,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              label="Payment"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            >
              <MenuItem value={"Cash"}>Cash</MenuItem>
              <MenuItem value={"Visa"}>Visa</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={() => checkout({ paymentMethod })}
            sx={{
              my: 5,
            }}
          >
            Pay now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Checkout