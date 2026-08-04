import React from 'react'
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCart from '../../hooks/useCart'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18next'
import { Button } from '@mui/material'
import useThemeStore from '../../store/useThemeStore'
export default function Navbar() {

  const {t}=useTranslation()
  const changeLanguage=()=>{
    const newLng=i18n.language==="ar"?"en":"ar"
    i18n.changeLanguage(newLng)
  }
  const {data}=useCart()
  const cartCount=data?.items.length??0
  console.log("cart data len",data?.items.length)
  const navigate=useNavigate()
  const token =useAuthStore((state)=>state.token)
  const logout =useAuthStore((state)=>(state.logout))
  console.log("token",token)
  const handleLogout=()=>{
    logout()
    navigate('/login')
  }

  const {mode,toggleMode}=useThemeStore()


  return (
    <>
    <Button onClick={changeLanguage}>
      {i18n.language==='ar'?"ar":"en"}
    </Button>
    <Button onClick={toggleMode}>
      {mode==='light'?"dark":"light"}
    </Button>
    <Link to="/">{t("Home")} </Link>
    <Link to="/products">{t("Products")} </Link>
    {token?
    <>
    <Link to="/cart">{t("Cart")} {cartCount} </Link>
    <Link to="/" onClick={handleLogout}>{t("Logout")} </Link>
    <Link to="/profile" >{t("Profile")} </Link>
    </>
    :
    <>
    <Link to="/login">{t("Login")} </Link>
    <Link to="/register">{t("Register")} </Link>
    </>
    }

    </>
  )
}
