/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-indent */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'
import { endpointApi } from '../../helpers/variableApi'

export const ProductosTab = () => {
  const { datosUser: { cargo } } = useContext(UserContext)
  const [producto, setProducto] = useState([])
  const [productosOriginales, setProductoOriginales] = useState([])
  const [search, setSearch] = useState('')
  const [nuevoCodigo, setCodigo] = useState('')
  const [nuevoNombre, setNombre] = useState('')
  const [showButtons, setShowButtons] = useState(false)
  const [show, setShow] = useState(false)
  const [productoAgregado, setProductoAgregado] = useState(false)
  const [productoEliminado, setProductoEliminado] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    const filtradoCodigo = productosOriginales.filter((c) => (search.toLowerCase() === c.nombre_producto || parseInt(search) === c.codigo_producto)
    )
    if (filtradoCodigo.length === 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'El producto no ha sido encontrado',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setProducto(filtradoCodigo)
    }
  }

  const handleClean = (e) => {
    e.preventDefault()
    setProducto(productosOriginales)
  }

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/productos')
    setProductoOriginales(datos)
    setProducto(datos)
    setShowButtons(true)
  }, [])

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/productos')
    setProductoOriginales(datos)
    setProducto(datos)
    setShowButtons(true)
    setProductoAgregado(false)
  }, [productoAgregado])

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/productos')
    setProductoOriginales(datos)
    setProducto(datos)
    setShowButtons(true)
    setProductoEliminado(false)
  }, [productoEliminado])

  const handleAgregar = async (e) => {
    e.preventDefault()

    const nuevoProducto = productosOriginales.filter((c) => (nuevoNombre.toLowerCase() === c.nombre_producto || parseInt(nuevoCodigo) === c.codigo_producto))
    console.log(nuevoProducto)
    if (nuevoProducto.length !== 0) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'El producto ya existe',
        showConfirmButton: false,
        timer: 1500
      })
      setCodigo('')
      setNombre('')
    } else {
      const datos = await axios.post(endpointApi + '/api/forms/insertProducto', { nuevoCodigo, nuevoNombre })

      if (datos.data.response) {
        Swal.fire('Producto agregado correctamente')
        setCodigo('')
        setNombre('')
        setProductoAgregado(true)
      } else {
        Swal.fire('Hubo un ERROR, favor revisar datos ingresados antes de volver a enviar')
      }
    }
  }

  const handleDelete = async (c) => {
    const deleteProducto = await axios.delete(endpointApi + `/api/forms/deleteProducto${c}`)

    if (deleteProducto.data.response) {
      console.log(deleteProducto)
      Swal.fire('Producto eliminado correctamente')
      setProductoEliminado(true)
    } else {
      Swal.fire('Hubo un ERROR, producto está siendo utilizado')
    }
  }

  return (
    <>
      {showButtons &&
        <div className='animate__animated animate__fadeIn'>
          <h1 className='text-center titulos mb-5'>Productos</h1>
          <form className='row g-5'>
            <div className='col-4'>
              <input className='w-100 form-control' style={{ textTransform: 'uppercase', width: '115%', height: '60%' }} type='text' placeholder='Ingrese un codigo o un nombre' onChange={event => setSearch(event.target.value)} value={search} />
            </div>
            <div className='col-auto'>
              <button onClick={handleClick} type='submit' className='btn btns mb-3'><i className='fas fa-search' />  Buscar</button>
            </div>
            <div className='col-auto'>
              <button onClick={handleClean} type='submit' className='btn btns mb-3'><i className='fas fa-broom' />  Limpiar</button>
            </div>
          </form>

          <table className='table table-primary border border-5 animate__animated animate__fadeIn '>
            <thead>
              <tr className='text-center'>
                <th scope='col'>Codigo</th>
                <th scope='col'>Nombre</th>
                {show &&
                  <th scope='col'>Eliminar</th>}
              </tr>
            </thead>
            <tbody className='text-center'>
              {producto?.map((p) =>
                <tr key={p.codigo_producto}>
                  <th scope='row'>{p.codigo_producto}</th>
                  <td>{p.nombre_producto.toUpperCase()}</td>
                  {show &&
                    <td>
                      <button onClick={() => handleDelete(p.codigo_producto)} type='button' className='btn btn-danger py-0'><i className='fas fa-trash-alt' /></button>
                    </td>}
                </tr>
              )}
            </tbody>
          </table>
          {show &&
            <div className='position-relative mt-4'>
              <form className='row g-5'>
                <div className='col-4'>
                  <input className='w-100 form-control' type='number' placeholder='INGRESE CÓDIGO DE PRODUCTO' onChange={event => setCodigo(event.target.value)} value={nuevoCodigo} />
                </div>
                <div className='col-4'>
                  <input className='w-100 form-control' style={{ textTransform: 'uppercase' }} type='text' placeholder='Ingrese nombre del producto' onChange={event => setNombre(event.target.value)} value={nuevoNombre} />
                </div>

              </form>
            </div>}

          <div className='col'>
            {cargo == 1 && (!show
              ? <button onClick={() => setShow(!show)} className='btn btns m-2'>  <i className='fas fa-edit' />  Modificar</button>
              : <div>
                <button onClick={() => setShow(!show)} className='btn btns m-2'><i className='fas fa-ban' />  Cancelar</button>
                <button onClick={handleAgregar} className='btn btns'><i className='fas fa-save' />  Guardar</button>
                </div>)}
          </div>

        </div>}
    </>
  )
}
