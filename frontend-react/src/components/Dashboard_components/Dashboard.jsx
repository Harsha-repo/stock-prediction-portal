import React from 'react'
import axiosInstance from '../../context/axiosInstance'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    useEffect(()=>{
      const fetch_protected_data = async () =>{
        try {
          const response = await axiosInstance.get('/protected/')
          console.log(response.data)
        }catch(error){
          console.log(error.response.data)
        }
      }
      fetch_protected_data()
    },
      [])


  return (
    <div className='container text-light' >
       Dashboard
       <button className='btn btn-danger mt-3' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
