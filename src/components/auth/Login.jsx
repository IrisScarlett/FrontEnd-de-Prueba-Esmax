/* eslint-disable no-undef */
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { endpointApi } from '../../helpers/variableApi'
import { useForm } from 'react-hook-form'

import './login.css'
import { alertSwal } from '../../helpers/swal'
import { Box } from '@mui/system'
import { LinearProgress } from '@mui/material'
export const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [cargando, setCargando] = useState(false)
  const onSubmit = async (datos) => {
    setCargando(true)
    try {
      const { data } = await axios.post(endpointApi + '/api/auth/', datos)
      alertSwal(data.ok, data.msg)
      if (data.ok) {
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      alertSwal(false, 'Ha ocurrido un error, intente mas tarde')
    }
    setCargando(false)
  }

  return (
    <div className='contenedorLogin'>
      {cargando &&
        <div className='contCargando'>
          <Box sx={{ width: '100%', height: '5rem' }}>
            <LinearProgress color='success' />
          </Box>
        </div>}
      <div className='container contLogin'>
        <div className='d-flex justify-content-center h-100'>
          <div className='card cardLogin'>
            <div className='card-header'>
              <div className='row'>
                <div className='col-10'><h3>Ingreso</h3></div>

                <div className='col mt-2'> <img className='logoNav' src='/public/img/logo.png' alt='' /></div>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <label htmlFor='exampleInputEmail1' className='form-label'>Usuario</label>
                    <input {...register('username', { required: true })} type='text' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
                    {errors.username && <div className='text-end' style={{ color: 'red' }}>Shave es necesaria</div>}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
                    <input {...register('password', { required: true })} type='password' className='form-control' id='exampleInputPassword1' />
                    {errors.password && <div className='text-end' style={{ color: 'red' }}>Contraseña es necesaria</div>}
                  </div>
                  <div className='contBtnLogin'> <button type='submit' className='btn btn-primary text-white mt-4 btnLogin'>Ingresar</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
