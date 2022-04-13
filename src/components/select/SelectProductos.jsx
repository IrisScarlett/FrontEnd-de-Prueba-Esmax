/* eslint-disable camelcase */
import axios from 'axios'
import { useState, useEffect } from 'react'

import { useSelect } from '../../helpers/useSelect'
import { endpointApi } from '../../helpers/variableApi'

export const SelectProductos = (disabled = false) => {
  const [productos, setProductos] = useState([])
  const [producto, SelectProducto] = useSelect('', (productos.map((d) => {
    const { codigo_producto, nombre_producto } = d
    return { code: codigo_producto, name: nombre_producto }
  })), disabled)

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/productos')
    setProductos(datos)
  }, [])

  const SelectProduct = () => <SelectProducto />

  return [producto, SelectProduct]
}
