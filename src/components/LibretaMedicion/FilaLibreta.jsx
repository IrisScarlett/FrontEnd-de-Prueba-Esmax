/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent */
/* eslint-disable eqeqeq */
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'

export const FilaLibreta = ({ libreta: l, cargo, handleViewLibreta }) => {
  const [switchEditable, setSwitchEditable] = useState(false)
  const [nombrePlanta, setNombrePlanta] = useState('')

  useEffect(async () => {
    setSwitchEditable(l.bloqueado)

    const datos = await axios.get(endpointApi + `/api/forms/nombrePlantaporId${l.planta_id}`)
    if (datos?.data?.resp) {
      const { data } = datos
      const { resp } = data
      const { pla_glosa } = resp[0]
      setNombrePlanta(pla_glosa)
    } else {
      alertSwal(false, 'Ha ocurrido un error, intente nuevamente')
    }
  }, [])

  const handleClickCheck = async () => {
    const { data: { ok, msg } } = await axios.put(endpointApi + '/api/forms/updateModificarLibreta', { switch: !switchEditable, folio: l.folio_id })
    setSwitchEditable(!switchEditable)
    if (!ok) {
      alertSwal(ok, msg)
    }
  }

  return (
    <tr>
      <th scope='row'>{l.folio_id}</th>
      <td>{nombrePlanta}</td>
      <td>{l.numero_estanque}</td>
      <td>{moment(l.fecha).format('Do MMMM YYYY')}</td>
      <td>{l.hora.split(':').splice(0, 2).join(':')}</td>
      {cargo == 1
        ? <td>
          <div className='form-check form-switch d-flex justify-content-center'>
            <input onChange={handleClickCheck} className='form-check-input  btn-outline-secondary' type='checkbox' id='flexSwitchCheckChecked' checked={switchEditable} />
          </div>
          </td>
        : <td> {l.bloqueado ? <i style={{ color: 'red' }} className='fas fa-times' /> : <i style={{ color: 'green' }} className='fas fa-check' />}</td>}
      <td> <button onClick={() => handleViewLibreta({ ...l, bloqueado: switchEditable })} className='btn btns'> <i className='fas fa-eye' /> </button></td>

    </tr>
  )
}
