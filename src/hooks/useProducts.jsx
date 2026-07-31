import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';


export default function useProducts() {
  const getProducts=async()=>{
    try{
      const response=await axiosInstance.get('/Products')
      return response.data;
    }catch(err){
      console.log(err)
    }
  }
  const query=useQuery({
      queryKey:['products'],
      queryFn:getProducts,
      staleTime:1000*60*5,
  
    });
    return query;
}
