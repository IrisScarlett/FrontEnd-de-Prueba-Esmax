/* eslint-disable eqeqeq */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { endpointApi } from '../../helpers/variableApi'

export const SelectProductPequeño = (initialProduct) => {
  const [productos, setProductos] = useState([])
  const [prodADevolver, setProdADevolver] = useState('')
  const [productElegido, setProductElegido] = useState(initialProduct)

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/productos')
    setProductos(datos)
  }, [])

  useEffect(() => {
    const filtrado = (productos.filter(p => p.codigo_producto == productElegido))
    setProdADevolver(filtrado[0])
  }, [productElegido])

  const SelectProduct = () => (
    <select onChange={e => setProductElegido(e.target.value)} value={productElegido} className='form-select form-select-sm' aria-label='.form-select-sm example'>
      {/* <option value=''>Open this select menu</option> */}
      {productos.map(p => <option key={p.codigo_producto} value={p.codigo_producto}>{p.nombre_producto}</option>)}

    </select>)

  return [prodADevolver, SelectProduct]
}
