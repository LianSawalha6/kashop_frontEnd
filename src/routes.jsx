import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
// import Products from "./pages/products/Products";
import ProductDetails from "./pages/product/ProductDetails";
import ProtectedRouter from "./ProtectedRouter";

const router=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
    {
      index:true,
      element: <Home/>
    },
    {
      path:'login',
      element:<Login/>
    },
    {
      path:'register',
      element:<Register/>
    },
    {
      path:'cart',
      element:<ProtectedRouter>
        <Cart/>
      </ProtectedRouter>
      
    },
    // {
    //   path:'products',
    //   element:<Products/>
    // },
    {
      path:'products/:productId',
      element:<ProductDetails/>
    }

  ]
  }
])
export default router;