import axios from 'axios';
import axiosInstance from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';


export default function useCategories() {
  const getCategories=async()=>{
    try{
      const response=await axiosInstance.get('/Categories',{
        token
      })
      return response.data;
    }catch(err){
      console.log(err)
    }
  }
  const query=useQuery({
      queryKey:['categories'],
      queryFn:getCategories,
      staleTime:1000*60*5,
  
    });
    return query;
}
