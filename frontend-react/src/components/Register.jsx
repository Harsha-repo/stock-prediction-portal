import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [loading , setLoading] = useState(false)
                                        
    const handle_registration = async (e) =>{
        e.preventDefault()
        setLoading(true)
        const registration_data = {username, email, password}
         // console.log(registration_data)


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', registration_data)
            alert("registration successful")
            setErrorMessage('')
            setUsername('')
            setEmail('')
            setPassword('')
            console.log(response.data) 
            console.log("form submitted registration successfully completed")
        }
        catch (error) {
            setErrorMessage(error.response.data)
            console.error("error occured during registration", error.response.data)
        }finally{
            setLoading(false)
        }
       
    }

    


  return (

  
        <div className="container mt-4  justify-content-center text-center register-css">
            <div className="row">
                <div className="col-md-6 offset-md-3" >
                   <div className="text-dark">  <h2>create an account</h2></div>

                   <form action="" onSubmit={handle_registration}>

                    <div className='mb-3'>
                    <input type="text" className='form-control  mt-2' placeholder='username  without-space' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <small>{errorMessage.username && <div className='text-danger text-left'> <h6>* { errorMessage.username}</h6></div>} </small>
                    </div>

                    <div className='mb-3'> 
                    <input type="email" className='form-control mb-3' placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    </div>

                    <input type="password" className='form-control mb-3' placeholder='password'  value={password} onChange={(e)=> setPassword(e.target.value)} required/>
                    <small>{errorMessage.password && <div className='text-danger text-left'> <h6>* { errorMessage.password}</h6></div>} </small>
                    <br />
                    <button  className='btn btn-dark mb-3'>Submit Registration</button>
                    {loading? <h6>Loading...</h6> : null}

                   </form>
                </div>
            </div>
        </div>

    
    
  )
}

export default Register
