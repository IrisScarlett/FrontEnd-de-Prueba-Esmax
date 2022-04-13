/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'
import { endpointApi } from '../../helpers/variableApi'
import { SelectPlantas } from '../select/SelectPlantas'

export const PlantasTab = () => {
  const { datosUser: { cargo } } = useContext(UserContext)
  const [plantas, setPlantas] = useState([])
  const [plantasOriginales, setPlantasOriginales] = useState([])
  const [planta, SelectPlanta] = SelectPlantas('')
  const [showButtons, setShowButtons] = useState(false)
  const [producto, setProducto] = useState()
  const [operacion, setOperacion] = useState()
  const [show, setShow] = useState(true)

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/plantas')
    // setPlantas(datos)
    setPlantasOriginales(datos)
    setShowButtons(false)
  }, [])

  useEffect(async () => {
    const filtradoPlanta = plantasOriginales.filter((e) => e.planta_id == (planta))
    filtradoPlanta.length === 0 ? setPlantas([]) : setPlantas(filtradoPlanta)

    setPlantas(filtradoPlanta[0])
    setShowButtons(true)
    if (filtradoPlanta.length === 0) {
      setShowButtons(false)
    }
  }, [planta])

  const handleProducto = async () => {
    const { data: { ok, nuevoProductos, message } } = await axios.put(endpointApi + '/api/forms/addProducto', { producto, planta })
    if (ok) {
      setPlantas({ ...plantas, productos: nuevoProductos })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleOperacion = async () => {
    // console.log(operacion)
    const { data: { ok, nuevasOperaciones, message } } = await axios.put(endpointApi + '/api/forms/addOperacion', { operacion, planta })
    if (ok) {
      setPlantas({ ...plantas, operacion: nuevasOperaciones })
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleDelete = async (p) => {
    await axios.delete(endpointApi + `/api/forms/deleteProductPlants${p}&${planta}`)
    const arrayNuevo = plantas.productos.split(',').filter((pr) => pr != p).join(',')
    setPlantas({ ...plantas, productos: arrayNuevo })
  }

  const handleDeleteOp = async (o) => {
    await axios.delete(endpointApi + `/api/forms/deleteOperacionPlantas${o}&${planta}`)
    const arrayNuevo = plantas.operacion.split(',').filter((op) => op != o).join(',')
    setPlantas({ ...plantas, operacion: arrayNuevo })
  }
  return (
    <div className='animate__animated animate__fadeIn'>
      <h1 className='text-center titulos mb-5'>Plantas </h1>

      <SelectPlanta />
      {showButtons &&

        <div>
          <table className='table table-primary border border-3 animate__animated animate__fadeIn'>
            <thead>
              <tr className='text-center fw-bold'>
                <th scope='col'>Codigo</th>
                <th scope='col'>Nombre</th>
                <th scope='col'>Operacion</th>
                <th scope='col'>Productos</th>
                <th scope='col'>Propiedad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'>{plantas?.planta_id}</th>
                <td>{plantas?.pla_glosa}</td>
                <td>
                  <ul>
                    {plantas?.operacion.split(',').map(o =>
                      <div key={o} className='row mt-1'>
                        <div className='col-6'>
                          <li>{o}
                          </li>
                        </div>
                        {!show &&
                          <div className='col-1'>
                            <button onClick={() => handleDeleteOp(o)} type='button' className='btn btn-danger py-0'><i className='fas fa-trash-alt' /></button>
                          </div>}
                      </div>
                    )}
                  </ul>
                </td>
                <td>
                  <ul>
                    {plantas?.productos.split(',').map(p =>
                      <div key={p} className='row mt-1'>
                        <div className='col-6'>
                          <li>{p}
                          </li>
                        </div>
                        {!show &&
                          <div className='col-1'>
                            <button onClick={() => handleDelete(p)} type='button' className='btn btn-danger py-0'><i className='fas fa-trash-alt' /></button>
                          </div>}
                      </div>
                    )}
                  </ul>
                </td>
                <td>{plantas?.propiedad}</td>
              </tr>
            </tbody>
          </table>
          <div className='row'>

            {cargo == 1 && (show
              ? <div className='col-auto'>
                <button onClick={() => setShow(!show)} className='btn btns m-2'><i className='fas fa-edit' />  Modificar</button>
              </div>
              : <div>
                <div className='position-relative'>
                  <div className='row g-3 '>
                    <div className='col-3'>
                      <button onClick={() => setShow(!show)} className='btn btns m-2'><i className='fas fa-save' />  Guardar</button>
                      <button onClick={() => setShow(!show)} className='btn btns m-2'><i className='fas fa-ban' />  Cancelar</button>
                    </div>
                    <div className='col-3' />
                    <div className='col-3'>
                      <input className='m-1' placeholder='Agregar Operación' onChange={e => setOperacion(e.target.value)} value={operacion} type='text' />
                      <button onClick={handleOperacion} className='btn btns py-1'><i className='fas fa-plus' /></button>
                    </div>
                    <div className='col-3'>
                      <input className='m-1' placeholder='Agregar Producto' onChange={e => setProducto(e.target.value)} value={producto} type='text' />
                      <button onClick={handleProducto} className='btn btns py-1'><i className='fas fa-plus' /></button>
                    </div>
                  </div>
                </div>
                </div>)}
          </div>
        </div>}
    </div>
  )
}
