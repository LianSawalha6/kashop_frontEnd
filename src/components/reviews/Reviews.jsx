import React from 'react'
import useProductDetails from '../../hooks/useProductDetails'
import { Box, Typography } from '@mui/material'
import ReviewCard from '../reviewCard/ReviewCard'

const Reviews = ({id}) => {
  const{data}=useProductDetails(id)
  console.log("reviews",data.response.reviews)
  return (
    <Box
      sx={{
        width: "100%",
        mt: 8,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: 32,
          fontWeight: 700,
          mb: 4,
          color: "#111",
        }}
      >
        Reviews
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {data.response.reviews.map((review) => (
          <ReviewCard key={review.createdAt} {...review} />
        ))}
      </Box>
    </Box>
  );
}

export default Reviews