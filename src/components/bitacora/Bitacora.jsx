/* eslint-disable react/jsx-closing-tag-location */
import React, { memo, useEffect, useState } from 'react'
import { HeaderBitacora } from './HeaderBitacora'
import './bitacora.css'
import './bitacoraPrint.css'
import { RegistroBitacora } from './RegistroBitacora'
import dayjs from 'dayjs'
import { useLocation } from 'react-router-dom'
import { endpointApi } from '../../helpers/variableApi'
import axios from 'axios'
import { alertSwal } from '../../helpers/swal'
import Swal from 'sweetalert2'

export const Bitacora = memo(() => {
  // const navigate = useNavigate()
  const location = useLocation()
  const [showButtonPlus, setShowButtonPlus] = useState(false)
  const [count, setCount] = useState([])
  const [registros, setRegistros] = useState([])
  const [needFlash, setNeedFlash] = useState(false)
  const [folioBitacora, setFolioBitacora] = useState()
  const [certificados, setcertificados] = useState([])
  const [datosHeaderPause, setdatosHeaderPause] = useState()
  const [bitFinalizada, setBitFinalizada] = useState(false)

  useEffect(() => {
    const datos = (location?.state)
    if (datos) {
      if (datos.finalizada) {
        setBitFinalizada(true)
      }
      setFolioBitacora(datos?.bitacora[0].folio_bitacora)
      setdatosHeaderPause(datos?.bitacora[0])
      setRegistros(datos?.registros)
      setcertificados(datos?.certificados.map(c => ({ api: c.api, numero_certificado: c.numero_certificado })))
      setCount(datos?.registros)
      setShowButtonPlus(true)
    }
  }, [])

  const handleClickBtnPlus = () => {
    if (registros.length > 0) {
      // console.log('Ahora es:', dayjs().format('YYYY-MM-DD HH:mm:ss'))
      // console.log('El ultimo fue: ', dayjs(registros[registros.length - 1].hora).format('HH:mm'))
      // calculando la diferencia actual a la del ultimo registro
      // const diferenciaRegistros = dayjs().diff(registros[registros.length - 1].hora, 'Hour')
      const diferenciaRegistros = dayjs().diff(registros[registros.length - 1].hora, 'Second')
      // console.log('La diferencia es: ', diferenciaRegistros)
      // if (diferenciaRegistros >=3) {
      if (diferenciaRegistros > 5) {
        setNeedFlash(true)
      }
    }
    setShowButtonPlus(false)
    setCount([...count, count.length])
  }

  // para finalizar bitacora
  const handleFinish = () => {
    Swal.fire({
      title: '¿Seguro que quieres finalizar bitácora?',
      text: 'no podrás volver atrás',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Finalizar'
    }).then(async (result) => {
      // SI CONFIRMA PAUSAR BITACORA
      if (result.isConfirmed) {
        const { data } = await axios.put(endpointApi + '/api/forms/finalizarbitacora', { finalizada: true, folioBitacora })
        alertSwal(data.ok, data.msg, 2000)
        if (data.ok) {
          setBitFinalizada(true)
        }
      }
    })
  }

  return (
    <div className=''>
      {folioBitacora && <p className='pfolioBitacora'>Folio {folioBitacora}</p>}
      <h1 className='mb-4 text-center titulos '>BITACORA OPERACION OLEODUCTO</h1>
      <HeaderBitacora setcertificados={setcertificados} certificados={certificados} setFolioBitacora={setFolioBitacora} folioBitacora={folioBitacora} setShowButtonPlus={setShowButtonPlus} registros={count} datosHeader={datosHeaderPause} bitFinalizada={bitFinalizada} />

      <div className='mt-4'>
        {count.map(c => <RegistroBitacora bitFinalizada={bitFinalizada} reg={c} setcertificados={setcertificados} certificados={certificados} key={c} numBitacora={count.length} folioBitacora={folioBitacora} setNeedFlash={setNeedFlash} needFlash={needFlash} setRegistros={setRegistros} registros={registros} setShowButtonPlus={setShowButtonPlus} />)}

      </div>
      {!bitFinalizada
        ? <div className='contBotonesFinal row' id='page-bottom'>
          {(registros.length > 0 && showButtonPlus) &&
            <div className='contBtnFinalizarBitacora animate__animated animate__fadeIn col-8'>
              <button onClick={handleFinish} type='button' className='btn btns btnFinalizarBitacora'>Finalizar bitácora</button>
            </div>}
          {/* {needFlash && <h1 style={{ color: 'red', fontStyle: 'italic', textAlign: 'end' }}>RELLENAR FLASH PARA CONTINUAR</h1>} */}

          <div className={showButtonPlus ? 'animate__animated animate__fadeIn col text-end' : 'd-none '}><i
            className='fas fa-plus-circle colButtonPlusReg' onClick={handleClickBtnPlus}
                                                                                                         />
          </div>
        </div>
        : <div className='contReportBit d-flex justify-content-end'>
          <button type='button' className='btns m-4 btnPrint' onClick={() => window.print()}>Generar reporte<i class='ms-2 fas fa-download' /></button>
        </div>}
    </div>
  )
})
