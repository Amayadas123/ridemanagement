 import React from 'react'
 import { useNavigate} from "react-router-dom"
import './home.css'

 function home() {
  const token = localStorage.getItem("jwt")
  const navgitor = useNavigate()


const handleLogout = ()=>{
  localStorage.removeItem("jwt")
  window.location.reload()
}

   return (
<body>
  <img src=""></img>
     <div className='nav'>
 <ul className='home1'>
   <li><a href='#home'>HOME</a></li>

   <li><a href='#home' onClick={()=> navgitor("/Ride")}>RIDES</a></li>
   <li><a href='#about' onClick={()=> navgitor("/Profile")}>Profile</a></li>
   {
    token?
    
    <li><a onClick={handleLogout}>LOGOUT</a></li>
    :
  <li><a href='#login' onClick={()=> navgitor("/Login")}>LOGIN</a></li>
  }
 </ul>
 <div className='backgound'>
 <h1>HOME</h1>
 
</div>

    </div>
    </body>
   )
 }

export default home