import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    <div className="row ">
    <nav className='navbar container pt-3 pb-3'>
        <Link className="navbar-brand   text-style-brand  " to={"/"}> Stock Prediction Portal</Link>
        <div>
            {isLoggedIn ? (
              <>
                <Link to={"/Dashboard"}>
                  <button className='btn btn-dark '>Dashboard</button>
                </Link>
                <button className='btn btn-dark ml-2' onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button className='btn btn-dark '>Login page</button>
                </Link>
                <Link to={"/register"}>
                  <button className='btn btn-dark ml-2' >Register</button>
                </Link>
              </>
            )}
        </div>

      </nav>
    </div>
    </>
  )
}

export default Header
