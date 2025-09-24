import React from 'react'
import { Route, Routes } from 'react-router'
import Signup from '../features/auth/Signup'
import Login from '../features/auth/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AppRoutes
