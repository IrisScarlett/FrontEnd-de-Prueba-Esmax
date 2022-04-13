/* eslint-disable no-unused-vars */
import { Outlet } from 'react-router-dom'
import './App.css'
import React from 'react'
import { NavSide } from './components/UI/NavSide'
import dayjs from 'dayjs'
import { es } from 'dayjs/locale/es'
dayjs.locale('es')

function App () {
  return (
    <>
      <NavSide />
      <div className='container mt-5'>
        <Outlet />
      </div>
    </>
  )
}

export default App
