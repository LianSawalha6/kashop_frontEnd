import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/useAuthStore'

export default function Navbar() {

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
    <Link to="/cart">cart</Link>
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
