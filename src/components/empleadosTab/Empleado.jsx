/* eslint-disable camelcase */
import axios from 'axios'
import React, { useState } from 'react'
import { endpointApi } from '../../helpers/variableApi'

export const Empleado = ({ prop: e }) => {
  const { usuario_id } = e
  const [estado, setEstado] = useState(parseInt(e.usr_estado_id))

  const cambiarEstado = async () => {
    setEstado(!estado)
    await axios.put(endpointApi + '/api/forms/estadoEmpleado', { usuario_id, estado: !estado })
  }

  return (
    <>
      <th scope='row'>{e.usuario_id}</th>
      <td>{e.pla_glosa}</td>
      <td>{e.usr_nombre}</td>
      <td>{e.usr_correo}</td>
      <td>{e.usr_username}</td>
      <td>
        <div className='form-check form-switch '>
          <input onChange={cambiarEstado} className='form-check-input btn-outline-secondary ' type='checkbox' id='flexSwitchCheckChecked' checked={estado} />
        </div>
      </td>
    </>
  )
}
