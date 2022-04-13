/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React, { memo, useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { api60factor6 } from '../../helpers/formulasApi60'
import { alertSwal } from '../../helpers/swal'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'
import { UserContext } from '../../context/UserContext'
import { ModalMedidores } from './ModalMedidores'
import { v4 as uuid } from 'uuid'
import { useSelect } from '../../helpers/useSelect'
import { handleEnter, handleEnter2 } from '../../helpers/handleEnter'

export const RegistroBitacora = memo(({ bitFinalizada, reg, certificados, setRegistros, registros, setShowButtonPlus, setNeedFlash, needFlash, folioBitacora }) => {
  console.log(reg)
  const navigate = useNavigate()
  // const [idParaModal, setidParaModal] = useState(dayjs())
  const idParaModal = uuid()
  const { datosUser: { plantaId } } = useContext(UserContext)
  const [disabledInputsRegister, setDisabledInputsRegister] = useState(!!reg?.id_registrobitacora)
  const [modifiRegister, setModifiRegister] = useState(!!reg?.id_registrobitacora)
  const [idRegistroBitacora, setidRegistroBitacora] = useState(reg?.id_registrobitacora || null)
  const [errorDifApis, setErrorDifApis] = useState(false)
  const [certificado, SelectCertificado] = useSelect('', certificados.map(c => ({ code: c.numero_certificado, name: c.numero_certificado })))
  const [api60, setApi60] = useState('')

  // const [infoCertificadoElegido, setInfoCertificadoElegido] = useState({})
  const [changeCert, setChangeCert] = useState(false)
  // const [alertFlash, setAlertFlash] = useState(false)
  const [formRegistro, setFormRegistro] = useState({
    hora: dayjs(reg?.fecha_regBit).format('YYYY-MM-DD HH:mm:ss') || dayjs().format('YYYY-MM-DD HH:mm:ss'),
    altura: reg?.altura_regbit || '',
    api: reg?.api60_regbit || '',
    temp: reg?.temp_regbit || '',
    api60Cert: reg?.api60cert_regbit || '',
    difApis: reg?.dif_apis_regbit || '',
    certificado: reg?.certificado_regbit || '',
    volDesp: reg?.vol_desp_regbit || '',
    volEnt: reg?.vol_ent_regbit || '',
    volRec: reg?.vol_rec_regbit || '',
    flash: reg?.flash_regbit || '',
    obs: reg?.obs_regbit || ''
  })
  // al seleccionar certificado
  useEffect(() => {
    if (certificado !== '') {
      const elegido = certificados.filter(c => certificado == c.numero_certificado)
      // todo arreglas no se envia bien
      setFormRegistro({
        ...formRegistro,
        api60Cert: elegido[0]?.api,
        certificado: elegido[0]?.numero_certificado
      })
      setChangeCert(false)
    }
  }, [certificado])

  // para calcular api60
  useEffect(() => {
    if (formRegistro.temp !== '' && formRegistro.api !== '') {
      if (!isNaN(formRegistro?.temp?.replace(',', '.')) && !isNaN(formRegistro?.api?.replace(',', '.'))) {
        const { api60 } = api60factor6(Number(formRegistro?.api?.replace(',', '.')), Number(formRegistro?.temp?.replace(',', '.')), Number(formRegistro?.temp?.replace(',', '.')))
        setApi60(api60)
      }
    } else {
      setApi60(0)
    }
  }, [formRegistro.temp, formRegistro.api])

  // calculo diApis
  useEffect(() => {
    if (api60 && formRegistro.api60Cert) {
      if (!isNaN(api60) && !isNaN((formRegistro.api60Cert).replace(',', '.'))) {
        setFormRegistro({
          ...formRegistro,
          difApis: (api60 - formRegistro.api60Cert.replace(',', '.')).toFixed(1)
        })
      }
    }
  }, [api60, formRegistro.api60Cert])

  // efecto para arrojar alerta de flash
  useEffect(() => {
    if (needFlash) {
      Swal.fire(
        'Es necesario un flash!',
        'debe rellenar campo flash',
        'info'
      )
    }
  }, [needFlash])

  // para cuando necesite flash y escriba en flash, permita continuar
  useEffect(() => {
    if (formRegistro.flash !== '') {
      setNeedFlash(false)
    }
  }, [formRegistro.flash])

  useEffect(() => {
    if (formRegistro.api === '' || formRegistro.temp === '' || formRegistro.api60Cert === '') {
      setFormRegistro({
        ...formRegistro,
        difApis: ''
      })
    }
  }, [formRegistro.api, formRegistro.temp, formRegistro.api60Cert])

  const handleChangeForm = (e) => {
    const { name, value } = e.target
    setFormRegistro({
      ...formRegistro,
      [name]: (value)
    })
  }
  const handleChangeCert = () => {
    setChangeCert(true)
  }
  const handleClickSaveRegister = async () => {
    // e.preventDefault()
    if (!needFlash) {
      // si diferencia api es mas de 1.0
      if (!(formRegistro?.difApis < 1 && formRegistro?.difApis > -1)) {
        alertSwal(false, `Diferencia api60 es ${formRegistro?.difApis}`, 3000)
      }
      // guardar en base de datos
      const { data } = await axios.post(endpointApi + '/api/forms/regbitacora', { ...formRegistro, api60, folioBitacora, errorDifApis })
      if (data.ok) {
        setidRegistroBitacora(data.id_registrobitacora)
        setDisabledInputsRegister(true)
        setShowButtonPlus(true)
        setModifiRegister(true)
        setRegistros([...registros, formRegistro])
        alertSwal(true, 'Registro agregado')
        setTimeout(() => {
          document.querySelector('#page-bottom').scrollIntoView({ alignToTop: 'false', behavior: 'smooth' })
        }, 1000)
      } else {
        alertSwal(false, data.msg)
      }
      return true
    } else {
      if (needFlash) {
        alertSwal(false, 'No puede continuar, es necesario rellenar flash', 2000)
      }
      return false
    }
  }

  // si diferneica api es mayor a 10 bacground rojo en input
  useEffect(() => {
    if (!(formRegistro?.difApis < 1 && formRegistro?.difApis > -1)) {
      setErrorDifApis(true)
    } else {
      setErrorDifApis(false)
    }
  }, [formRegistro?.difApis])

  // guardar editado de libreta
  const handleClickUpdateRegister = async () => {
    console.log(formRegistro)
    const { data } = await axios.put(endpointApi + '/api/forms/regbitacora', { ...formRegistro, api60, idRegistroBitacora, errorDifApis })
    console.log(data)
    alertSwal(data.ok, data.msg)
    if (data.ok) {
      setDisabledInputsRegister(true)
    }
  }
  const handlePause = () => {
    Swal.fire({
      title: 'Estás pausando esta bitácora',
      text: '¿Seguro que quieres hacerlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, pausar'
    }).then(async (result) => {
      // SI CONFIRMA PAUSAR BITACORA
      if (result.isConfirmed) {
        if (!needFlash) {
          const datos1 = await axios.post(endpointApi + '/api/forms/regbitacorapausa', { ...formRegistro, api60, folioBitacora, errorDifApis })
          const datos2 = await axios.put(endpointApi + '/api/forms/finalizarbitacora', { finalizada: false, folioBitacora })
          alertSwal(datos1.data.ok, datos1.data.msg, 2000)
          if (datos1.data.ok && datos2.data.ok) {
            navigate('/listabitacoras')
          } else {
            alertSwal(false, 'Ha ocurrido un error, intente denuevo', 2000)
          }
        } else {
          alertSwal(false, 'No puede continuar, es necesario rellenar flash', 2000)
        }
      }
    })
  }
  return (
    <>
      <form>
        <div className='conRegistroBit mb-5 animate__animated animate__fadeIn'>
          <div className='row m-0'>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Hora</div>
              <div className='col-12'><input disabled type='text' className='inputRegBit text-center form-control ' value={dayjs(formRegistro.hora).format('HH:mm')} />{reg?.registropausa && <p className='identPausa'>PAUSA</p>}</div>
             {!disabledInputsRegister && <div className='contPause' onClick={handlePause}>
              <i className='fas fa-pause-circle btnPause' />
                                         </div>}
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Altura</div>
              <div className='col-12'><input disabled={disabledInputsRegister} autoComplete='off' value={(formRegistro.altura)} name='altura' onKeyDown={handleEnter} onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Api</div>
              <div className='col-12'><input autoComplete='off' disabled={disabledInputsRegister} value={(formRegistro.api)} name='api' onKeyDown={handleEnter} onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>T°</div>
              <div className='col-12'><input autoComplete='off' disabled={disabledInputsRegister} value={(formRegistro.temp)} name='temp' onKeyDown={handleEnter2} onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Api 60</div>
              <div className='col-12'><input value={api60 !== '' && api60 ? (api60.replace('.', ',')) : ''} disabled type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Api 60 Certif.</div>
              <div className='col-12'><input autoComplete='off' disabled={disabledInputsRegister} value={(formRegistro.api60Cert)} onKeyDown={handleEnter2} name='api60Cert' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Dif. Apis</div>
              <div className='col-12'><input style={{ backgroundColor: errorDifApis && 'rgba(219, 11, 11, 0.336)' }} value={(formRegistro.difApis)} disabled name='difApis' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
          </div>
          <div className='row m-0'>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Análisis / Certificado</div>
              <div className='col-12'>
                {!changeCert
                  ? (
               <><input disabled={disabledInputsRegister} value={(formRegistro.certificado)} onKeyDown={handleEnter} name='certificado' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' />
                {!disabledInputsRegister && <div className='changeCert' onClick={handleChangeCert}><i className='fas fa-sync-alt' /></div>}
               </>)
                  : <div className='selectCertif'>
                 <SelectCertificado />
                    </div>}
              </div>
            </div>
            <div className='colregibit'>
              <div className='col-12 spanLabelRegBit'>Volumen despachado</div>
              <div className='col-12 row p-0 m-0'>
                <input value={(formRegistro.volDesp)} disabled={disabledInputsRegister} onKeyDown={handleEnter2} name='volDesp' onChange={handleChangeForm} type='text' className={!bitFinalizada ? 'inputMedidor form-control col-7' : 'inputMedidorFinalizado form-control col-7'} />
                {!bitFinalizada && <button type='button' data-bs-toggle='modal' style={{ cursor: !disabledInputsRegister ? 'pointer' : 'auto' }} data-bs-target={!disabledInputsRegister && `#regBitacora${idParaModal}`} className='col btnMedidorBitacora btnMedidor'>Medidor</button>}
              </div>
            </div>
            <div className='colregibit'><div className='col-12 spanLabelRegBit'>Volumen ent. Oleoducto</div>
              <div className='col-12'><input disabled={disabledInputsRegister} onKeyDown={handleEnter} value={(formRegistro.volEnt)} name='volEnt' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className=' colregibit'><div className='col-12 spanLabelRegBit spanDoubleHeigth'>Volumen recibido</div>
              <div className='col-12'><input disabled={disabledInputsRegister} onKeyDown={handleEnter} value={(formRegistro.volRec)} name='volRec' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className=' colregibit'><div className='col-12 spanLabelRegBit spanDoubleHeigth'>Flash</div>
              <div className='col-12'><input disabled={disabledInputsRegister} onKeyDown={handleEnter} value={(formRegistro.flash)} name='flash' onChange={handleChangeForm} type='text' className='inputRegBit text-center form-control ' /></div>
            </div>
            <div className={!bitFinalizada ? 'colregibitObs' : 'colregibitObsFinish'}><div className='col-12 spanLabelRegBit spanDoubleHeigth'>Observaciones</div>
              <div className='col-12'><input disabled={disabledInputsRegister} value={(formRegistro.obs)} name='obs' onChange={handleChangeForm} type='text' className='inputObs text-center form-control' /></div>
            </div>
            {!bitFinalizada && (modifiRegister
              ? (disabledInputsRegister
                  ? <div
                      className='colregibitCheck' onClick={() => setDisabledInputsRegister(false)}
                    >
                <i className='fas fa-edit mt-3' type='button' />
                    </div>
                  : <div className='colregibitCheck' onClick={handleClickUpdateRegister}>
                <i className='fas fa-save mt-3' type='button' />
                    </div>)
              : <div className='colregibitCheck' onClick={handleClickSaveRegister}>
                <i className='fas fa-check mt-3' type='button' />
                </div>)}
          </div>
        </div>
      </form>
      {/* mmodal medidores */}
      <ModalMedidores key={idParaModal} setFormRegistro={setFormRegistro} formRegistro={formRegistro} numBitacora={idParaModal} />
    </>

  )
})
