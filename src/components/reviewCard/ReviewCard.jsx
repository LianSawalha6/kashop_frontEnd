import { Box, Rating, Typography } from "@mui/material";
import React from "react";

const ReviewCard = ({ ...review }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2.5,
        bgcolor: "#FAFAFA",
        borderRadius: 3,
        border: "1px solid #F0F0F0",
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 0.5,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#111",
            }}
          >
            {review.userName}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#A3A3A3",
            }}
          >
            {new Date(review.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Rating
          value={review.rating}
          size="small"
          readOnly
          sx={{
            mb: 1,
          }}
        />

        <Typography
          sx={{
            fontSize: 14,
            color: "#737373",
            lineHeight: 1.8,
          }}
        >
          {review.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;
