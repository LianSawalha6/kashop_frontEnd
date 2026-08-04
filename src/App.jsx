import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './i18next'
import { useTranslation } from 'react-i18next'
import { CssBaseline, ThemeProvider } from '@mui/material'
import getTheme from './theme'
import useThemeStore from './store/useThemeStore'
export default function App() {

  const {i18n}=useTranslation()
  useEffect(()=>{
    const direction=i18n.language==="ar"?"rtl":"ltr"
    document.documentElement.dir=direction
  },[i18n.language])
  const queryClient = new QueryClient();
  const mode=useThemeStore((state)=>state.mode)
  console.log(mode)

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={getTheme(mode)}>
        <CssBaseline/>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </QueryClientProvider>
    </>
  )
}
