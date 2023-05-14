import React from 'react'
import {Routes, Route} from "react-router-dom"
import HomePage from '../pages/HomePage'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Signup/>}></Route>
            <Route path='/home' element={<HomePage/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes