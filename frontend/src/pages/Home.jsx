import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Home() {
  const [logedInUser,setLogedInUser] = useState("")
  const navigate =useNavigate()
  useEffect(()=>{
   setLogedInUser( localStorage.getItem('logedInUser'))
  },[])

  const handleLogOut=(e)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("logedInUser")
  
    setTimeout(()=>{
          navigate("/login")
    },1000)
  }
  return (
    <div>
   <h1> {logedInUser}</h1> 
   <button type='button' onClick={handleLogOut}>LogOut</button>

    </div>
  )
}

export default Home