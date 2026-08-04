import React from 'react'
import useProducts from '../../hooks/useProducts'
import { CircularProgress, Typography,Box, CardMedia, Grid, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function Products() {

  const {t}=useTranslation()
  
  const {data,isLoading,isError,error}=useProducts()
  if(isLoading){
    return <CircularProgress/>
    }
  
    if(isError){
      return <Typography color="error">Error...</Typography>
    }

    console.log(data.response.data)
    return (
    <Box component="section" className="products">
      <Typography component="h2" variant='h2' color='primary'>{t("Products")}</Typography>
      <Grid container spacing={{xs:2,md:3}}>
      {data.response.data.map((product)=>{
        return <Grid key={product.id} size={{xs:12,sm:6,md:4}}>
          <Link to={`/products/${product.id}`} style={{textDecoration:'none'}}>
          <Card  sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 2 }}>
          <CardMedia
            component="img"
            image={product.image}
          />
          <CardContent>
            <Typography component="h3" variant='h3'>{product.name}</Typography>
            <Typography component="p" variant='p'>{product.rate}</Typography>
            <Typography component="p" variant='p'>{product.price}</Typography>
          </CardContent>
        </Card>
          </Link>
          </Grid>
      })}

      </Grid>
    </Box>
  )
}
