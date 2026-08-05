import React from "react";
import useProducts from "../../hooks/useProducts";
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
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProductCard from "../productCard/ProductCard";

export default function Products() {
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useProducts();
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error...</Typography>;
  }

  console.log("products", data.response.data);
  return (
    <Box component="section" className="products">
      <Typography
        component="h2"
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#111111",
        }}
      >
        {t("Products")}
      </Typography>

      <Grid container spacing={3}>
        {data.response.data.map((product) => (
          <Grid
            key={product.id}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
