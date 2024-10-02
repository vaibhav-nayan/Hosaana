import { useContext,useState } from "react";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";
// import axiosInstance from "../../hooks/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username:undefined,
        password:undefined,
    })
    const navigate = useNavigate()

    const {loading,error,dispatch}=useContext(AuthContext)

    const handleChange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    };

    const handleClick= async (e)=>{
        e.preventDefault();

        dispatch({type:"LOGIN_START"})
        try {
           const  res= await axios.post("auth/login",credentials);
           if(res.data.isAdmin){
           dispatch({type:"LOGIN_SUCCESS",payload: res?.data.details}) 
           navigate("/")
           }else
           {
            dispatch({type:"LOGIN_FAILURE",payload:{message:"you are not allowed!"}})
           }
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE",payload:err.response?.data})
        }
    };

  return (
    <div className="login">
        <div className="lContainer">
            <input type="text" placeholder="username" id="username"  name="username" onChange={(e)=>handleChange(e)} className="lInput" />
            <input type="password" placeholder="password" id="password" name="password" onChange={(e)=>handleChange(e)} className="lInput" />
            <button disabled={loading} onClick={(e)=>handleClick(e)} className="lButton">Login</button> 
            {error && <span>{error.message}</span>}
            
        </div>
    </div>
  )
}
