import { createTheme } from '@mui/material'
import React from 'react'

const getTheme=(mode)=>{
 return createTheme({
  spacing:4,
  palette:{
    mode:mode,
    primary:{
      main:'#CA8A04'
    }
  },
  typography:{
    h2:{
      fontSize:'3rem'
    }
  }
})
}

export default getTheme