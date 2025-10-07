import React from 'react'

const Header = () => {
  return (
    <>
    <nav className='navbar container pt-3 pb-3'>
        <a className="navbar-brand   text-style-brand  " href=''> Stock Prediction Portal</a>
        <div>
            <button className='btn btn-dark '>Login</button>
            <button className='btn btn-dark ml-2'>Register</button>

        </div>
    </nav>
    </>
  )
}

export default Header
