import React, { useState } from 'react'
import { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance'
import useAuthStore from '../../store/useAuthStore'
import { Avatar, Box, Button, CircularProgress, IconButton, Pagination, PaginationItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import useCart from '../../hooks/useCart'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import useUpdataCartItem from '../../hooks/useUpdataCartItem'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router-dom'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useClearCart from '../../hooks/useClearCart'

export default function Cart() {

    const {t}=useTranslation()
    const navigate=useNavigate()
  
  const {data,isLoading,isError,error}=useCart()
  const {mutate:removeItem,isPending}=useRemoveFromCart()
  const {mutate:updateQuantity,isPending:updateQuantityPending}=useUpdataCartItem()
  const {mutate:clearCart,isPending:isClearCartPending}=useClearCart()

  const [page, setPage] = useState(1);
  
    const rowsPerPage = 5;

   

  if(isLoading){
      return <CircularProgress/>
    }
  
    if(isError){
      return <Typography color="error">{error.message}</Typography>
    }

     const displayedItems = data.items.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

    const handleUpdate=(productId,action)=>{
      const item=data?.items?.find(i=>i.productId==productId)
    
      if(action=="-"){
        if (item.count === 1) {
          removeItem(productId);
          return;
        }
        updateQuantity({productId,count:item.count-1})
      }
      else
        updateQuantity({productId,count:item.count+1})

    }
    
  return (
    <Box
      component="section"
      sx={{
        p: 5,
      }}
    >
      <Typography variant="h1">{t("Cart")}</Typography>

      {displayedItems.length === 0 ? (
        <Box
          sx={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: "60px",
              height: "60px",
            }}
          >
            <ShoppingCartOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h6">Your cart is empty</Typography>
          <Typography variant="body2">
            Looks like you haven't added anything yet. Browse our collection to
            get started.
          </Typography>
          <Button onClick={() => navigate("/")}>Browse products</Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={clearCart} disabled={isClearCartPending}>Clear Cart</Button>
          </Box>
          <TableContainer
            sx={{
              borderRadius: 3,
              border: "1px solid #e5e7eb",
              boxShadow: "none",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "primary.main",
                }}
              >
                <TableCell>Product name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableHead>

              <TableBody>
                {displayedItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.price}$</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleUpdate(item.productId, "-");
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => {
                            handleUpdate(item.productId, "+");
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell>{item.totalPrice}$</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        disabled={isPending}
                        onClick={() => {
                          removeItem(item.productId);
                        }}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {displayedItems.length > 5 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Pagination
                count={Math.ceil(data.items.length / rowsPerPage)}
                onChange={(event, value) => setPage(value)}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </Box>
          ) : (
            ""
          )}

          <Box
            sx={{
              mt: 8,
              display: "flex",
              justifyContent: "flex-end",
              gap: 5,
            }}
          >
            <Button variant="contained" onClick={() => navigate("/checkout")}>
              Process to Checkout
            </Button>
            <Button onClick={() => navigate("/")}>Continue shopping</Button>
          </Box>
        </>
      )}
    </Box>
  );
}
