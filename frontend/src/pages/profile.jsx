import React, { useEffect, useState } from 'react'
import './profile.css'
import axios from 'axios'
import { Form,useNavigate } from 'react-router-dom'


 function profile() {
 const [name,setname]=useState("")
 const [email,setemail]= useState("") 
 const[imagepath,setimagepath] =useState("")


 const navigate =useNavigate()


   const getUser =() => {
     const token =localStorage.getItem("jwt");
     if (token){
       axios.post("http://localhost:7000/getUser",{
        token:token
      }).then((res)=>{
       console.log(res.data);

       setimagepath(res.data.Profile_image)
        setname(res.data.name);
        setemail(res.data.email);
      }).catch((err)=>{
        console.log(err);
      })
      
    }else{
      navigate("/login")
    }
  }
 

  useEffect(()=>{

    getUser()
  },[])
 
  return (
<>
<button  onClick={()=>navigate("/")}>Back To Home</button>
    <body>
    <div>
      <div class="card">
      <h1 className=' pro'>profile</h1>
  <img src={"http://localhost:7000/"+imagepath}/>
  <div class="container">
    <h2><b>{name}</b></h2> 
    <h2><b>{email}</b></h2> 

 <h2>Education</h2>
 <h5>M.ARCH</h5>
    <p>Architect .southern california insititue </p> 
    <p>Architecture, 2004 </p> 
    <h5>B.A</h5>
    <p>sociology and Anthropology,holy crosd college</p>
    <p>1995</p>
  </div>
</div>
    </div>
    </body>
    </>
  )
}

export default profile

