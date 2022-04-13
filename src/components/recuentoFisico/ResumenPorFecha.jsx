import React from 'react'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

export const ResumenPorFecha = ({ datos: f }) => {
  // console.log(f)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/hojasresumen', { state: f })
  }

  return (
    <>
      <tr key={f.folio_id} className='text-center'>
        <td>{dayjs(f.fecha).format('DD MMMM YYYY')}</td>
        <td><button onClick={handleClick} className='btn btns' data-bs-dismiss='modal'><i className='far fa-eye' /> </button></td>
      </tr>

    </>

  )
}
