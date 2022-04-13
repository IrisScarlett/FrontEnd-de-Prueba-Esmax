import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'

import { ResumenPorFecha } from './ResumenPorFecha'

export const ModalHojasResumen = () => {
  const [fechas, setFechas] = useState([])
  const [fechaAFiltrar, setFechaAFiltrar] = useState('')
  const [fechaFiltrada, setFechaFiltrada] = useState([])
  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/modalHojasResumen')

    setFechas(datos)
  }, [])

  const handleClickFilterDate = () => {
    const fechaEncontrada = fechas.filter((f) => (dayjs(f.fecha).isSame(fechaAFiltrar)))
    setFechaFiltrada(fechaEncontrada)
    fechaEncontrada.length === 0 && alertSwal(false, 'No existen registros en esta fecha')
  }
  return (
    <>
      <div className='modal modalHojasResumen-cuadro' tabIndex='-1' id='modalHojasResumen'>
        <div className='modal-dialog tamanoModal'>
          <div className='modal-content '>
            <div className='modal-header modalHojasResumen-header'>
              <h5 className='modal-title col-11 text-center fs-4 ms-3'>HOJAS DE RESUMEN</h5>
              <button type='button' className='btn-close col-1' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body modalHojasResumen-body'>
              <form className='row g-3'>
                <div className='col-6'>
                  <label htmlFor='inputPassword2' className='visually-hidden'>Password</label>
                  <input onChange={e => setFechaAFiltrar(e.target.value)} value={fechaAFiltrar} className='w-100 form-control text-center' type='date' placeholder='Ingrese un mes o un año' />
                </div>
                <div className='col-6'>
                  <button onClick={handleClickFilterDate} type='button' className='btn btns mb-3 w-100'><i className='fas fa-search' />  Buscar</button>
                </div>

              </form>
              <table className='table table-primary border border-white  animate__animated animate__fadeIn'>
                <thead>
                  <tr className='text-center'>
                    <th scope='col-6' className='fs-5 '>Fecha</th>
                    <th scope='col-6' className='fs-5 '>Vizualizar</th>
                  </tr>
                </thead>
                <tbody>
                  {fechaFiltrada.length > 0
                    ? (fechaFiltrada.map((f) =>
                      <ResumenPorFecha key={f.folio_id} datos={f} />
                      ))
                    : (fechas.map((f) =>
                      <ResumenPorFecha key={f.folio_id} datos={f} />
                      ))}

                  {/* <tr className='w-100'>
                    <ul className='pagination w-100 col-12'>
                      <li className='page-item '>
                        <a className='page-link' href='#' aria-label='Previous'>
                          <span aria-hidden='true'>&laquo;</span>
                        </a>
                      </li>
                      <li className='page-item'><a className='page-link' href='#'>1</a></li>
                      <li className='page-item'><a className='page-link' href='#'>2</a></li>
                      <li className='page-item'><a className='page-link' href='#'>3</a></li>
                      <li className='page-item'>
                        <a className='page-link' href='#' aria-label='Next'>
                          <span aria-hidden='true'>&raquo;</span>
                        </a>
                      </li>
                    </ul>
                  </tr> */}

                </tbody>

              </table>
            </div>
            <div className='modal-footer modalHojasResumen-footer'>
              <button type='button' className='btn btn-secondary btns' data-bs-dismiss='modal'>Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <button className='btnHojaResumen w-100' data-bs-toggle='modal' data-bs-target='#modalHojasResumen'>Hojas de resumen</button>
    </>

  )
}
