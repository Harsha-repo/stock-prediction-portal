import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className="row ">
    <nav className='navbar container pt-3 pb-3'>
        <Link className="navbar-brand   text-style-brand  " to={"/"}> Stock Prediction Portal</Link>
        <div>
            <Link to={"/login"}>
            <button className='btn btn-dark '>Login</button>
            </Link>
            
            <Link to={"/register"}>
            <button className='btn btn-dark ml-2' >Register</button>
            </Link>
           

        </div>
      
      </nav>
    </div>
    </>
  )
}

export default Header
