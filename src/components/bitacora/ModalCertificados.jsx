/* eslint-disable react/jsx-key */
import React from 'react'
import { FilaAgregarCertificados } from './FilaAgregarCertificados'
// import { v4 as uuid } from 'uuid'
import { AgregarLineaCert } from './AgregarLineaCert'

export const ModalCertificados = ({ setcertificados, certificados, folioBitacora }) => {
  return (
    <div className='modal fade modalCertificados' id='modalCertificados' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>Agregar certificados</h5>
            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
          </div>
          <div className='modal-body'>
            {certificados.map(c => <FilaAgregarCertificados setcertificados={setcertificados} folioBitacora={folioBitacora} datos={c} />)}
            <AgregarLineaCert setcertificados={setcertificados} folioBitacora={folioBitacora} />
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-success' data-bs-dismiss='modal'>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
