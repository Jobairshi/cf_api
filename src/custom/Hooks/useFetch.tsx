import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";



export default function useFetch(url:string, options:AxiosRequestConfig) {
  const [data,setData]  = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,setError] = useState('');
  useEffect(()=>{
    const fetchData = async()=>{
        try{
        //  console.log('asdas')
            const response =  await axios.get(url,options);
           // console.log(response.data)
         //   console.log(response.data.result.problemStatistics)
            setData(response.data.result.problems)
            
        }catch(err){
          
            const msg:string = (err as Error).message;
        //    console.log(msg)
            setError(msg);
        }
        finally{
       //   console.log(';finfas')
            setLoading(false);
        }
    }
    fetchData();
    
  },[url,options]) 
  return {data,loading,error};
}
