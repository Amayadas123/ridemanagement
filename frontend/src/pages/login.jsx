import { useState } from 'react';
import './login.css'
import axios from 'axios';
import{useNavigate} from 'react-router-dom'

function login() {

  // const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const[password,setpassword]= useState("")

  const token =localStorage.getItem("jwt")

 const navigate =useNavigate()

  const handleClick=()=>{
     console.log({email,password});
     axios.post("http://localhost:7000/login",
     { email:email,
       password:password
    }).then((res)=>{
      console.log(res.data);
      localStorage.setItem("jwt",res.data)
      navigate("/")
    }).catch((err)=>{

     })
    }
    return (
      
      <div className='log'>
        {
        token?
        <button
          onClick={()=>localStorage.removeItem("jwt")}
          
   >Logout </button>
       :
       <button>Login</button>
    
        }

      <div className="form1">
 
   <form>
     <label>Email:
       <input type="Email"onChange={(e)=>setemail(e.target.value)} />
     </label><br></br><br></br>
     <label >password:
       <input type="password" onChange={(e)=>setpassword(e.target.value)}/>
     </label>
     <br></br><br></br>
 

   </form>



   <button className="col" onClick={handleClick}>Login</button>
   </div>
   <a href="/registration">Create account</a>
   </div>
    )
  }
  export default login
