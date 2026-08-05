import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  CardActions,
  CardActionArea,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const ProductCard = ({ ...product }) => {
  return (
    <Card
      sx={{
        border: 1,
        borderColor: "divider",
        cursor: "pointer",
        transition: "all 0.2s ease",

        "&:hover": {
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea
      component={Link}
          to={`/products/${product.id}`}
      >
      <Box
        sx={{
          p: 2,
          bgcolor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 220,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            transition: "transform .5s ease",

            ".MuiCard-root:hover &": {
              transform: "scale(1.05)",
            },
          }}
        />
      </Box>

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            transition: "all 0.2s ease",
            
            ".MuiCard-root:hover &": {
              color: "#CA8A04",
            },
          }}
        >
          {product.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Rating size="small" value={product.rate} precision={0.5} readOnly />
          <Typography>{product.rate}</Typography>
        </Box>
        <Typography
          variant="h6"
          component="p"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          to={`/products/${product.id}`}
        >
          View
        </Button>
        <Button variant="outlined" title="Add to cart">
          <ShoppingCartOutlinedIcon />
        </Button>
      </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
