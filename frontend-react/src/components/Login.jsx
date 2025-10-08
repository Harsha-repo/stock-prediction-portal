import React from 'react'

const Login = () => {
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className='text-center mt-4 mb-4'>Login to your account</h2>
                <form action="">
                    <input type="email" className='form-control mb-3' placeholder='email' />
                    <input type="password" className='form-control mb-3' placeholder='password' />
                    
                </form>
            </div>
        </div>
    </div>
    
  )
}

export default Login
