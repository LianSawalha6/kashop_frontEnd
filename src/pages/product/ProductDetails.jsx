import React from 'react'
import useProductDetails from '../../hooks/useProductDetails'
import { useParams } from 'react-router-dom'
import { CircularProgress, Typography,Box, Button } from '@mui/material'
import useAddToCart from '../../hooks/useAddToCart'

export default function ProductDetails() {

  const {productId}=useParams()
  const {mutate:addToCart}=useAddToCart()

  const{data,isLoading,isError,error}=useProductDetails(productId)
  console.log(data)
  if(isLoading){
      return <CircularProgress/>
    }
  
    if(isError){
      return <Typography color="error">Error...</Typography>
    }
  return (
    <Box>
      <Typography component="h2" variant='h2'>{data.response.name}</Typography>
      <Typography component="h2" variant='h2'>{data.response.description}</Typography>
      <Button onClick={()=>{addToCart({productId:data.response.id,count:1})}}>Add to cart</Button>
    </Box>
  )
}
