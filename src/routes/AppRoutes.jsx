/* eslint-disable no-undef */
import React, { useState } from 'react'
import {
  BrowserRouter
} from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { RoutesDetails } from './RoutesDetails'

export const AppRoutes = () => {
  const [datosUser, setDatosUser] = useState({})

  return (
    <UserContext.Provider value={{ datosUser }}>
      <BrowserRouter>
        <RoutesDetails setDatosUser={setDatosUser} />
      </BrowserRouter>
    </UserContext.Provider>

  )
}
