/* eslint-disable no-undef */
import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ auth, children }) => {
  const url = localStorage.getItem('url')
  return !auth ? children : <Navigate to={url || '/'} />
}
