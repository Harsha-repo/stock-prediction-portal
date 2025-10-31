import React from 'react'

import './assets/css/style.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import Register from './components/Register'
import Dashboard from './components/Dashboard_components/Dashboard'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

function App(){

  return (
    <AuthProvider>
      <BrowserRouter>
       <Header/>
        <Routes>

          <Route path="/" element={ <>   <Main/> </>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Dashboard" element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
