import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <>

    <div className=' container mt-5'>
        <div className='p-5 text-center bg-light-dark rounded-3'> 
            <h1>Stock prediction portal </h1>
            <p className='mt-3 lead' >This is a stock prediction portal where you can predict the stock prices of various companies 
                using machine learning algorithms. You can also view the historical data of the stocks.
                This portal is built using React for the frontend and Django for the backend.

                </p>
            <Link to ={"/login"}>
            <button className='btn btn-dark btn-lg mt-3'>Get Started</button></Link>
        </div>
    </div>
    </>
  )
}

export default Main
