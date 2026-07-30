import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
    <Link to="/cart">cart</Link>
    <Link to="/login">login</Link>
    <Link to="/register">register</Link>

    </>
  )
}
