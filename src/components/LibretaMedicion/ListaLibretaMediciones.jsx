/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable eqeqeq */
// import React from 'react'
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { endpointApi } from '../../helpers/variableApi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { LibretaMedicion } from './LibretaMedicion'
import { UserContext } from '../../context/UserContext'
import { FilaLibreta } from './FilaLibreta'

export const ListaLibretaMediciones = () => {
  const navigate = useNavigate()
  const [libreta, setLibreta] = useState([])
  const [search, setSearch] = useState('')
  const [libretasOriginales, setLibretasOriginales] = useState([])
  const [showLib, setShowLib] = useState(false)
  const [libretaAVer, setLibretaAVer] = useState({})

  const {
    datosUser: { cargo }
  } = useContext(UserContext)

  const handleClick = (event) => {
    event.preventDefault()
    const filtradoCodigo = libreta.filter(
      (e) => e.folio_id == search || e.numero_estanque == search
    )
    if (filtradoCodigo.length == 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Folio no ha sido encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setLibreta(filtradoCodigo)
    }
  }
  const handleNewLibreta = () => {
    navigate('/libreta')
  }
  const handleVolver = () => {
    setShowLib(false)
  }
  const handleClean = (e) => {
    e.preventDefault()
    setLibreta(libretasOriginales)
  }

  useEffect(async () => {
    const {
      data: { datos }
    } = await axios(endpointApi + '/api/forms/libretas')
    setLibreta(datos)
    setLibretasOriginales(datos)
  }, [showLib])

  const handleViewLibreta = (libreta) => {
    // console.log(libreta)
    setLibretaAVer(libreta)
    setShowLib(true)
  }

  return (
    <div className='animate__animated animate__fadeIn'>
      {!showLib
        ? (
          <div>
            <h1 className='text-center titulos mb-5'>Libretas de medición </h1>
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
                <button
                  onClick={handleNewLibreta}
                  type='button'
                  className='btn btns mb-3'
                >
                  <i className='fas fa-plus' /> Crear libreta
                </button>
              </div>
            </form>
            <table className='table table-primary'>
              <thead>
                <tr className='text-center'>
                  <th scope='col'>Numero Folio</th>
                  <th scope='col'>Numero Planta</th>
                  <th scope='col'>Numero Estanque</th>
                  <th scope='col'>Fecha</th>
                  <th scope='col'>Hora</th>
                  {cargo == 1
                    ? (
                      <th scope='col'>Bloqueado</th>
                      )
                    : (
                      <th scope='col'>Editable</th>
                      )}
                  <th scope='col'>Vizualizar</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {libreta?.map((l) => (
                  <FilaLibreta
                    key={l.folio_id}
                    libreta={l}
                    cargo={cargo}
                    handleViewLibreta={handleViewLibreta}
                  />
                ))}
              </tbody>
            </table>
          </div>
          )
        : (
          <div>
            <button
              onClick={handleVolver}
              type='submit'
              className='btn btns mb-3'
            >
              <i className='fas fa-undo' /> Volver
            </button>
            <LibretaMedicion
              folioSeleccionado={libretaAVer}
              modificar
              disabledDefinitivo
              disabletoModify
            />
          </div>
          )}
    </div>
  )
}
