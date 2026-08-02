import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'
import useCart from '../../hooks/useCart'

export default function Navbar() {

  const {data}=useCart()
  const cartCount=data?.items.length||0
  console.log("cart data len",data.items.length)
  const navigate=useNavigate()
  const token =useAuthStore((state)=>state.token)
  const logout =useAuthStore((state)=>(state.logout))
  console.log("token",token)
  const handleLogout=()=>{
    logout()
    navigate('/login')
  }

  const handleLogin=()=>{
    
  }
  return (
    <>
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    {token?
    <>
    <Link to="/cart">cart {cartCount}</Link>
    <Link to="/" onClick={handleLogout}>logout</Link>
    </>
    :
    <>
    <Link to="/login">login</Link>
    <Link to="/register">register</Link>
    </>
    }

    </>
  )
}
