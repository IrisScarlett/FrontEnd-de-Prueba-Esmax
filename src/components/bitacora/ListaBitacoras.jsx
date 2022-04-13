
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable eqeqeq */
// import React from 'react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { endpointApi } from '../../helpers/variableApi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../../context/UserContext'
import { alertSwal } from '../../helpers/swal'
import { FilaBitacora } from './FilaBitacora'

export const ListaBitacoras = () => {
  const navigate = useNavigate()
  const [bitacora, setBitacora] = useState([])
  const [search, setSearch] = useState('')
  const [bitacorasOriginales, setBitacorasOriginales] = useState([])

  useEffect(() => {
    // document.querySelector('.modal-backdrop')?.remove()
    const funcion = async () => {
      const { data } = await axios(endpointApi + '/api/forms/bitacoras')
      if (data.ok) {
        setBitacorasOriginales(data.bitacoras)
        setBitacora(data.bitacoras)
      } else {
        alertSwal(data.ok, data.msg)
      }
    }
    funcion()
  }, [])

  const handleClick = (event) => {
    event.preventDefault()
    const filtradoCodigo = bitacorasOriginales.filter(
      (e) => e.folio_bitacora == search)
    if (filtradoCodigo.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Bitácora no encontrada',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setBitacora(filtradoCodigo)
    }
  }
  const handleClean = (e) => {
    e.preventDefault()
    setBitacora(bitacorasOriginales)
  }
  //  de aqui empieza libreta
  // const handleVolver = () => {
  //   setShowLib(false)
  // }

  // useEffect(async () => {
  // const {
  //   data: { datos }
  // } = await axios(endpointApi + '/api/forms/libretas')
  // setLibreta(datos)
  // setLibretasOriginales(datos)
  // }, [showLib])

  // const handleViewLibreta = (libreta) => {
  // console.log(libreta)
  // setLibretaAVer(libreta)
  // setShowLib(true)
  // }

  return (
    <div className='animate__animated animate__fadeIn'>
      <div>
        <h1 className='text-center titulos mb-5'>BITACORAS OPERACION OLEODUCTO </h1>
        <form className='row g-3'>
          <div className='col-3'>
            <label htmlFor='inputPassword2' className='visually-hidden'>
              Password
            </label>
            <input
              className='form-control w-100'
              type='text'
              placeholder='Ingrese N° Folio o N° Estanque'
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />
          </div>
          <div className='col-auto'>
            <button
              onClick={handleClick}
              type='submit'
              className='btn btns mb-3'
            >
              <i className='fas fa-search' /> Buscar
            </button>
          </div>
          <div className='col-3'>
            <button
              onClick={handleClean}
              type='submit'
              className='btn btns mb-3'
            >
              <i className='fas fa-broom' /> Limpiar
            </button>
          </div>
          <div className='col-auto'>
            <button className='btn btns' onClick={() => navigate('/bitacora')}><i className='fas fa-plus me-2' />Crear bitácora</button>
          </div>
        </form>
        <table className='table table-primary'>
          <thead>
            <tr className='text-center'>
              <th scope='col'>Numero Folio</th>
              <th scope='col'>Nombre Planta</th>
              <th scope='col'>Numero Estanque</th>
              <th scope='col'>Fecha</th>
              <th scope='col'>Vizualizar</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {bitacora?.map((b) => (
              <FilaBitacora key={b.folio_bitacora} datos={b} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
