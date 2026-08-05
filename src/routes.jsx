import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/productDetails/ProductDetails";
import ProtectedRouter from "./ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";
import ProfileLayout from "./pages/profile/ProfileLayout";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfileOrders from "./pages/profile/ProfileOrders";

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
    },
    {
      path:'checkout',
      element:
      <ProtectedRouter>
        <Checkout/>
      </ProtectedRouter>
    },
    {
      path:'profile',
      element:
      <ProtectedRouter>
        <ProfileLayout/>
      </ProtectedRouter>,
      children:[
        {
          index:true,
          element:<ProfileInfo/>
        },
        {
          path:"orders",
          element:<ProfileOrders/>
        }
      ]
    }

  ]
  }
])
export default router;