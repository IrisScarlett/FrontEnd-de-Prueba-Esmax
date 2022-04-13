import axios from 'axios'
import React, { useState } from 'react'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'

const initialState = { numero_certificado: '', api: '' }
export const AgregarLineaCert = ({ setcertificados, folioBitacora }) => {
  const [infoCert, setInfoCert] = useState(initialState)

  const handleAddCertificado = async () => {
    if (infoCert.num !== '' && infoCert.api !== '') {
      const { data } = await axios.post(endpointApi + '/api/forms/certBitacora', { ...infoCert, folioBitacora })
      if (!data.ok) {
        alertSwal(false, data.msg)
      } else {
        setcertificados(prevCert => [...prevCert, infoCert])
        setInfoCert(initialState)
      }
      // guardar en bbdd
    } else {
      alertSwal(false, 'Antes de guardar debe rellenar ambos campos')
    }
  }
  return (
    <form className='animate__animated animate__fadeIn col text-end'>
      <div className='container'>
        <div className='row'>
          <div className='col-5 d-flex p-0'>
            <span className='input-group-text spanCertificado col-3' id='basic-addon1'>Num</span>
            <input value={infoCert.numero_certificado} onChange={e => setInfoCert({ ...infoCert, numero_certificado: e.target.value })} className='form-control' type='text' />
          </div>
          <div className='col-5 d-flex p-0'>
            <span className='input-group-text spanCertificado col-3' id='basic-addon1'>Api</span>
            <input value={infoCert.api} onChange={e => setInfoCert({ ...infoCert, api: e.target.value })} className='form-control' type='text' />
          </div>

          <div onClick={handleAddCertificado} className='col-2'><i className=' fas fa-check me-2 botonCertificados' /></div>
        </div>
      </div>
    </form>
  )
}
