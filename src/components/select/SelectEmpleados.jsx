/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { solicitudAxios } from '../../helpers/solicitudAxios'
import { useSelect } from '../../helpers/useSelect'

export const SelectEmpleados = (label = 'Empleados') => {
  const { datosUser: { plantaId } } = useContext(UserContext)

  const [empleados, setEmpleados] = useState([])
  const [empleado, SelectEmpleado] = useSelect(label, (empleados.map((d) => {
    const { usr_nombre, usuario_id } = d
    return { code: usuario_id, name: usr_nombre }
  })), false, false)

  useEffect(async () => {
    const datos = await solicitudAxios('GET', `/api/forms/operadoresPlanta${plantaId}`)
    setEmpleados(datos.response)
  }, [])

  const SelectEmpleadoo = () => <SelectEmpleado />

  return [empleado, SelectEmpleadoo]
}
