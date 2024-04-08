import React, { useEffect, useState } from 'react'
import './Rideprofile.css'
 import Image from "../assets/ferris.jpg"
 import axios from 'axios'
  import { Form,useNavigate ,useParams } from 'react-router-dom'




function Rideprofile() {
 
 const Navigate= useNavigate()

  const {rideid} = useParams()

  const[ridename,setridename] = useState("")
  const[ridedesc,setridedesc] = useState("")
  const[rideimgpath,setrideimgpath] = useState("")

  console.log(rideid);


  const [ feedbackname, setfeedbackname] = useState("")
  const [feedbackdescription, setfeedbackdescription] = useState("")
  const [feedbacks, setfeedbacks] = useState([])


  const getRide_id = () => {
    axios.post("http://localhost:7000/ride_with_id/" + rideid).then((res) => {
      console.log(res.data);


      setridename(res.data.ridename)
      setridedesc(res.data.ridedesc)
      setrideimgpath(res.data.rideimg)



    }).catch(err => {
      console.log(err);
    })
  }



  const handleClick =()=>{
    console.log({feedbackname,feedbackdescription});
    axios.post("http://localhost:7000/addfeedback"
   ,{
    ride_name:ridename,
    ride_id:rideid,
    feedbackname:feedbackname,
    feedbackdesc:feedbackdescription,
    
   }).then((res)=>{
     console.log(res.data);
     getfeedback()
   }).catch((err)=>{
     console.log(err);
   })
   }
    const [state,setstate] = useState(0)


    const getfeedback =()=>{
      axios.post("http://localhost:7000/viewfeedback/"+rideid).then((res)=>{
        console.log(res.data);
        setfeedbacks(res.data)
      }).catch((err)=>{
        console.log(err);
      })
    }

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };



    useEffect(() => {
      getfeedback()
     getRide_id()
    }, [])
    
  return (
    <>
    <button  onClick={()=>Navigate("/Ride")}className='btn'> Back Ride</button>

    <div className='ride_profilecontainer' >
  <div className='navb'>  
    <ul>
  <li><a href="#active" onClick={()=>setstate(0)} >Profile</a></li>
  <li><a href="#news" onClick={()=>setstate(1)}>feedback</a></li>
</ul>
 </div>
 
<div className="right">

{
    state==0?

    <div className='ferries'>
 <h5>{ridename}</h5>
<img src={"http://localhost:7000/"+rideimgpath}/>

<p>{ridedesc}</p>
</div>:

 <div className='ferries'>
    <h1 className='hedaing'>Add feedback</h1>
<div className='class1'>
  <br></br>

<label for="fname">Title  :</label>
<input type="text"  onChange={(e) => setfeedbackname(e.target.value)}></input><br></br>

<br></br>

<label className='description' for="iname">Description  :</label>
<textarea name="message" rows="5" cols="30"  onChange={(e) => setfeedbackdescription(e.target.value)}></textarea><br></br>


<button onClick={handleClick}>submit</button>

</div>

<div className="feedbacks">
{feedbacks.map((ele,index)=>

  <div className="feedback" key={index} >
    <h3 className="title_1">{ele.ride_name}</h3>
    <h3 className="title_1">{ele.feedbackname}</h3>
    <h3 className="title_1">{ele.feedbackdesc}</h3>
    <h3 className="title_1">Date :{formatDate(ele.date)}</h3>
    <h3 className="title_1">issue :{ele.verify?"solved":"pending"}</h3>


  </div>
    )}
 
</div>

</div>
}


  </div>
</div>
</>
  )
}

export default Rideprofile
