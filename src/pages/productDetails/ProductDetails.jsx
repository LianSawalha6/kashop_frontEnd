import React, { useEffect, useState } from "react";
import useProductDetails from "../../hooks/useProductDetails";
import { useParams } from "react-router-dom";
import {CircularProgress,Typography,Box,Button,Grid,Rating,Collapse,} from "@mui/material";
import useAddToCart from "../../hooks/useAddToCart";

export default function ProductDetails() {
  const [expanded, setExpanded] = useState(false);

  const { productId } = useParams();
  const { mutate: addToCart } = useAddToCart();

  const { data, isLoading, isError, error } = useProductDetails(productId);
  console.log("product details", data);
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    if (data?.response?.image) {
      setSelectedImage(data.response.image);
    }
  }, [data]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography color="error">Error...</Typography>;
  }
  return (
    <Grid
      container
      spacing={6}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        p: 3,
      }}
    >

      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            bgcolor: "#F5F5F5",
            borderRadius: 4,
            height: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={selectedImage}
            alt={data.response.name}
            sx={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 2,
          }}
        >
          <Box
            onClick={() => {
              setSelectedImage(data.response.image);
            }}
            component="img"
            src={data.response.image}
            sx={{
              width: 80,
              height: 80,
              objectFit: "contain",
              bgcolor: "#F5F5F5",
              borderRadius: 2,
              cursor: "pointer",

              opacity: selectedImage === data.response.image ? 1 : 0.6,

              "&:hover": {
                opacity: 1,
              },
            }}
          />

          {data.response.subImages.map((img, index) => (
            <Box
              key={index}
              onClick={() => {
                setSelectedImage(img);
              }}
              component="img"
              src={img}
              sx={{
                width: 80,
                height: 80,
                objectFit: "contain",
                bgcolor: "#F5F5F5",
                borderRadius: 2,
                cursor: "pointer",

                opacity: selectedImage === img ? 1 : 0.6,

                "&:hover": {
                  opacity: 1,
                },
              }}
            />
          ))}
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 700,
            color: "#111",
            mb: 2,
          }}
        >
          {data.response.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 700,
              mb: 3,
            }}
          >
            ${data.response.price}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <Rating
              size="small"
              value={data.response.rate}
              precision={0.5}
              readOnly
            />

            <Typography color="text.secondary">
              {data.response.rate} out of 5
            </Typography>
            <Typography color={"primary"}>
              ({data.response.reviews.length} reviews)
            </Typography>
          </Box>
        </Box>

        <Collapse in={expanded} collapsedSize={120}>
          <Typography
            sx={{
              color: "#737373",
              whiteSpace: "pre-line",
              mb: 1,
            }}
          >
            {data.response.description}
          </Typography>
        </Collapse>

        <Button
          onClick={() => setExpanded(!expanded)}
          sx={{
            mb: 3,
            color: "#CA8A04",
            textTransform: "none",
            fontWeight: 600,

            "&:hover": {
              background: "transparent",
              color: "#111",
            },
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </Button>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            addToCart({
              productId: product.id,
              count: 1,
            });
          }}
        >
          Add to Cart
        </Button>
      </Grid>
    </Grid>
  );
}
