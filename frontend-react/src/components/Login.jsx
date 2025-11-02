import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const  [username, setUsername] = useState('')
    const  [password, setPassword] = useState('')
    const [loading , setLoading] = useState(false)
    const navigate  = useNavigate()
    const { login } = useAuth()



    const handle_submit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const login_data = {username, password}
        console.log("form submitted")   

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', login_data)
            // these are the creds stored in browesets local storage that helps in login 
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            console.log('login successfull')
            login()
            console.log(response.data)
            navigate('/Dashboard')
            

        }

        catch (error) {
            console.error("error occured during login", error.data)
        }

        finally {
            setLoading(false)
        }

    }


  return (
    <div className='container  '>
    <div className="col col justify-content-center">
    <div className="container justify-content-center ">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className='text-center mt-4 mb-4'>Login to your account</h2>
                <form action="" onSubmit={handle_submit}>
                    <input type='text' className='form-control mb-3' placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} required />
                    <input type='password' className='form-control mb-3' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    
                    <button className='btn btn-dark mb-3'>Login</button>
                    {loading? <h6>Loading...</h6> : null}
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>  
  )
}

export default Login
