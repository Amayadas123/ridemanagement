import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import Registration from './pages/registration '
import Login from './pages/login'
import Profile from './pages/profile'
import Home from './pages/home'
import Ride from './pages/Ride'
import Rideprofile from './pages/Rideprofile'
import Techniciansection from './pages/Techniciansection'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
   <Routes>
    <Route path ="/registration" element={<Registration></Registration>}></Route>
     <Route path ="/login" element={<Login></Login>}></Route>
     <Route path="/profile"exact element={<Profile/>}/>
     <Route path="/Techniciansection" exact element={<Techniciansection/>} />
     <Route path="/" exact element={<Home/>} />
     <Route path="/Ride" exact element={<Ride/>} />
     <Route path="/Rideprofile/:rideid" element={<Rideprofile></Rideprofile>}></Route>
   

   </Routes>
   </BrowserRouter> 
    </>
  )
}

export default App



