
import {useEffect,useState} from "react";
// import axiosInstance from "./api";
import axios from "axios"



const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {

    const fetchData = async () => {
      
      setLoading(true);
      setError("");
  
      try {
        let res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await  axios.get(url) ;
      setData(res.data);

    
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setLoading(false);
  };

  return { data, loading, error,reFetch};
};

export default useFetch;

