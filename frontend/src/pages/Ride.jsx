import axios from 'axios'
import React,{useEffect,useState} from 'react'
import './Ride.css'
// import { Form,useNavigate ,useParams } from 'react-router-dom'

 import { useNavigate } from 'react-router-dom'
import ferries from "../assets/ferris.jpg"
import  Roller from "../assets/Roller coaster.jpg"
import  maverick from "../assets/maverick.jpg"
import logflume from "../assets/log flume.jpg"
import Bumpercars from "../assets/Bumper.jpg"
import Swingerride from "../assets/swinge.jpg"
import scrambler from "../assets/scrambler ride.jpg"
import Waterrides from "../assets/Water rides.jpg"
import FlyingBobs from "../assets/Flying Bobs.jpg"



function Ride() {
  const Navigate= useNavigate()
  const navgitor = useNavigate()

  const [rides,setrides]= useState([])

  const viewRide =()=>{
    // ..nodemon link..
    axios.post("http://localhost:7000/viewride").then(res=>{
      console.log(res.data);
      setrides(res.data)
    }).catch(err =>{
      console.log(err);
    })

  }
  console.log(rides);
  useEffect(()=>{
    viewRide()
  },[])


  return (
    <>
    <button  onClick={()=>Navigate("/")}className='btn'> Back</button>
 
    

    <body>
   
<div>
   <h1 className='heading'>Ride</h1>
 {
rides.map((element,index) =>

 
  <form className='card1'>
  <img src={"http://localhost:7000/"+element.rideimg}/>
    <h5>ferris wheel </h5>
    <p>The term Ferris wheel comes from the maker of one of the first examples constructed for Chicago's World's Columbian Exposition by George Washington Gale Ferris Jr. in 1893</p>
    <a href="#" class="btn btn-primary" onClick={()=> navgitor("/Rideprofile/"+element._id)}>view</a>
  </form >

)}
</div>
 
  </body>
  </>
  )
}

export default Ride