import  React,{ useState } from 'react'
import "./registration.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


 function registration () {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [image, setimage] = useState(null)

const navigate = useNavigate()


  const handleClick =()=>{
  console.log({name,email,password});

  const formData = new FormData()

  formData.append("name",name)
  formData.append("email",email)
  formData.append("password",password)
  formData.append("file",image)
    
 axios.post("http://localhost:7000/Registration",formData).then((res)=>{
  console.log(res.data);
  navigate("/login")

 }).catch((err)=>{
  console.log(err);
})
}
  return (
 
    <div className='body'>
          
<h1>REGISTER NOW</h1>

 {/* 1 */}
<div className='user'>
<label>NAME<br></br>
</label>
</div>
<input type="text" onChange={(e) =>setname(e.target.value)}/>

 {/* 2 */}
<div className='email'>
<br></br>
<label > EMAIL <br></br>
</label>
</div>
<input className="em"type="email"  onChange={(e) =>setemail(e.target.value)}/>
 

 {/* 3 */}
  <div className='phno'>
<br></br>
<label > PHONE NO <br></br>
</label>
</div>
<input className="em"type="number" onChange={(e) =>setname(e.target.value)}/>
  

 {/* 4 */}
 <div className='add'>
<br></br>
<label > ADDRESS <br></br>
</label>
</div>
<input className="adr"type="text"  onChange={(e) =>setname(e.target.value)}/>

 {/* 5 */}
 <div className='pass'>
<br></br>
<label > PASSWORD <br></br>
</label>
</div>
<input type="password" onChange={(e)=> setpassword(e.target.value)}/><br></br>


<div className='pass'>
<br></br>
<label > profile image<br></br>
</label>
</div>
<input type="file" onChange={(e)=>setimage(e.target.files[0])}/><br></br>


<button className='btn' onClick={handleClick}>SUBMIT</button>
</div>

  )
}
export default registration 