/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-closing-tag-location */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'
import { endpointApi } from '../../helpers/variableApi'
import { Empleado } from './Empleado'

export const UserTab = () => {
  const { datosUser: { cargo } } = useContext(UserContext)
  const [empleados, setEmpleados] = useState([])
  const [search, setSearch] = useState('')
  const [cargando, setCargando] = useState(false)
  const [empleadosOriginales, setEmpleadosOriginales] = useState([])

  const navigate = useNavigate()

  const handleClick = (event) => {
    event.preventDefault()
    setCargando(true)
    const filtradoCodigo = empleados.filter((e) => {
      return e.usuario_id == search
    })
    if (filtradoCodigo.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Empleado no ha sido encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setEmpleados(filtradoCodigo)
    }
    setCargando(false)
  }

  const handleClean = (e) => {
    e.preventDefault()
    setEmpleados(empleadosOriginales)
  }

  useEffect(async () => {
    if (cargo == 1) {
      setCargando(true)
      const { data: { datos } } = await axios(endpointApi + '/api/forms/empleados')
      setEmpleados(datos)
      setEmpleadosOriginales(datos)
      setCargando(false)
    } else {
      navigate('/home')
    }
  }, [cargo])

  return (
    <div className='animate__animated animate__fadeIn'>
      <h1 className='text-center titulos mb-5'>Empleados </h1>
      <form className='row g-3'>
        <div className='col-4'>
          <label htmlFor='inputPassword2' className='visually-hidden'>Password</label>
          <input className='w-100 form-control' type='text' placeholder='Ingrese un codigo de empleado' onChange={event => setSearch(event.target.value)} value={search} />
        </div>
        <div className='col-auto'>
          <button onClick={handleClick} type='submit' className='btn btns mb-3'><i className='fas fa-search' />  Buscar</button>
        </div>
        <div className='col-auto'>
          <button onClick={handleClean} type='submit' className='btn btns mb-3'><i className='fas fa-broom' />  Limpiar</button>
        </div>
      </form>

      {cargando
        ? <div className='spinner-border text-info' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
        : <table className='table table-primary border border-3 animate__animated animate__fadeIn'>
          <thead>
            <tr className='text-center fw-bold'>
              <th scope='col'>Codigo</th>
              <th scope='col'>Planta</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Correo</th>
              <th scope='col'>Username</th>
              <th scope='col'>Estado</th>
            </tr>
          </thead>
          <tbody>
            {empleados?.map((e) =>
              <tr key={e.usuario_id}>
                <Empleado prop={e} />
              </tr>
            )}
          </tbody>
        </table>}
    </div>
  )
}
