import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';


const useProductDetails=(productId)=>{
  const getProductDetails=async()=>{
    try{
      const response=await axiosInstance.get(`Products/${productId}`)
      return response.data
    }catch(err){
      console.log(err)
    }
  }
  const query=useQuery({
      queryKey:['productDetails','en',productId],
      queryFn:getProductDetails,
      staleTime:1000*60*5,
  
    });
    return query;
}
export default useProductDetails;