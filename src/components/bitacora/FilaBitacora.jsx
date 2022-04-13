import axios from 'axios'
import dayjs from 'dayjs'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'

export const FilaBitacora = ({ datos }) => {
  const navigate = useNavigate()
  const handleContinue = async () => {
    const bitacora = await axios.get(endpointApi + `/api/forms/bitacora${datos.folio_bitacora}`)
    const registros = await axios.get(endpointApi + `/api/forms/registros${datos.folio_bitacora}`)
    const certificados = await axios.get(endpointApi + `/api/forms/certificados${datos.folio_bitacora}`)
    if (bitacora?.data?.ok && registros?.data?.ok && certificados?.data?.ok) {
      navigate('/bitacora', { state: { bitacora: bitacora.data.response, registros: registros.data.response, certificados: certificados.data.response } })
    } else {
      alertSwal(false, 'Ha ocurrido un error')
    }
  }
  const handleView = async () => {
    const bitacora = await axios.get(endpointApi + `/api/forms/bitacora${datos.folio_bitacora}`)
    const registros = await axios.get(endpointApi + `/api/forms/registros${datos.folio_bitacora}`)
    const certificados = await axios.get(endpointApi + `/api/forms/certificados${datos.folio_bitacora}`)
    if (bitacora?.data?.ok && registros?.data?.ok && certificados?.data?.ok) {
      navigate('/bitacora', { state: { bitacora: bitacora.data.response, registros: registros.data.response, certificados: certificados.data.response, finalizada: true } })
    } else {
      alertSwal(false, 'Ha ocurrido un error')
    }
  }
  return (
    <tr>
      <th scope='row'>{datos.folio_bitacora}</th>
      <td>{datos.pla_glosa}</td>
      <td>{datos.estanque_bitacora}</td>
      <td>{dayjs(datos.fecha_bitacora).format('DD MMMM YYYY')}</td>
      {datos.finalizada
        ? <td> <button onClick={handleView} className='btn btns'> <i className='fas fa-eye' /> </button></td>
        : <td> <button onClick={handleContinue} className='btn btns bg-success'> <i className='fas fa-play' /> </button></td>}

    </tr>
  )
}
