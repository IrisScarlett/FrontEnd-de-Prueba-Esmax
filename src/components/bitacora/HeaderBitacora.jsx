/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import dayjs from 'dayjs'
import { validacionFecha } from '../../helpers/validacionFecha'
import { alertSwal } from '../../helpers/swal'
import { SelectEmpleados } from '../select/SelectEmpleados'
import { SelectEstanques } from '../select/SelectEstanques'
import { SelectProductos } from '../select/SelectProductos'
import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'
import { CircularProgress } from '@mui/material'
import { addPuntos } from '../../helpers/addPuntos'
import { ModalCertificados } from './ModalCertificados'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const HeaderBitacora = ({ bitFinalizada, datosHeader, setShowButtonPlus, registros, setFolioBitacora, folioBitacora, setcertificados, certificados }) => {
  const navigate = useNavigate()
  const [modificable, setModificable] = useState(!datosHeader)
  const { datosUser: { nombre, plantaId, usrId } } = useContext(UserContext)
  const [empleado, SelectEmpleado] = SelectEmpleados('')
  // form de modal entrega turno
  const [estanque, SelectEstanque] = SelectEstanques(plantaId, '', !modificable, 1)
  const [productoEnLinea, SelectProducto] = SelectProductos(!modificable)
  const [nombreProd, setNombreProd] = useState(datosHeader?.prod_linea || '')
  const [cargandoCapacidad, setCargandoCapacidad] = useState(!!datosHeader?.fecha_bitacora)
  const [rangoEstanque, setRangoEstanque] = useState([[]])
  const [cargaAceptada, setCargaAceptada] = useState(!datosHeader?.fecha_bitacora || false)
  // selectCertificados
  // const [folioBitacora, setFolioBitacora] = useState()
  const [formRec, setFormRec] = useState({
    fecha: dayjs().format('YYYY-MM-DD'),
    hora: dayjs().format('HH:mm'),
    opEntrega: usrId,
    opRecibe: empleado,
    prodRecepcion: '',
    tiempoRemate: '',
    prodFaltantes: '',
    estValvulas: '',
    estEntregando: ''
  })
  useEffect(() => {
    setFormRec({
      ...formRec,
      opRecibe: empleado
    })
  }, [empleado])

  // form header
  const [formHeader, setFormHeader] = useState({
    fecha: dayjs().format('YYYY-MM-DD'),
    operando: false,
    enFalla: false,
    mantencion: false,
    alturaInt: undefined,
    cantRecibir: undefined,
    capacidad: undefined,
    obs: ''

  })

  useEffect(() => {
    // console.log('datos::', datosHeader)
    if (datosHeader) {
      setTimeout(() => {
        setFormHeader({
          ...formHeader,
          fecha: dayjs(datosHeader?.fecha_bitacora).format('YYYY-MM-DD'),
          obs: datosHeader?.obs_bitacora,
          cantRecibir: datosHeader?.cantrecibir_bitacora,
          mantencion: datosHeader?.mantencion,
          enFalla: datosHeader?.enfalla,
          operando: datosHeader?.operando,
          alturaInt: datosHeader?.altint_bitacora,
          capacidad: parseInt(datosHeader?.capacidad)
        })
      }, 1)
    }
  }, [datosHeader])

  // para bloquear modificaciones en header si se agrega un registro
  useEffect(() => {
    if (registros.length > 0) {
      // console.log({ ...formHeader, usrId, estanque, plantaId, productoEnLinea })
      setModificable(false)
    }
  }, [registros])

  useEffect(() => {
    if (estanque !== '') {
      const funcion = async () => {
        const dattos = await axios.post(endpointApi + '/api/forms/calibracion', { idPlanta: plantaId })
        if (dattos.data.ok && dattos.data.medio) {
          setRangoEstanque(Object.values(dattos.data.medio.filter(d =>
            Object.keys(d)[0] === estanque)[0]))
        }
      }

      funcion()
    }
  }, [estanque])

  useEffect(() => {
    const funcion = async () => {
      if ((formHeader?.alturaInt / 10 > rangoEstanque[0][0]) && (formHeader?.alturaInt / 10 < rangoEstanque[0][1])) {
        setCargandoCapacidad(true)
        const { data } = await axios.get(endpointApi + `/api/forms/capacidadRecibir${plantaId}&${estanque}&${((formHeader?.alturaInt) / 10).toFixed(1)}`)
        if (data.ok) {
          const { capacidad_llenado_seguro, est_volumen } = data.response
          // if (capacidad_llenado_seguro && est_volumen) {
          // TODO AQUI SE DESCONTROLA
          setFormHeader({
            ...formHeader,
            capacidad: capacidad_llenado_seguro - (est_volumen / 1000)
          })
          // }
        }
      } else {
        setFormHeader({
          ...formHeader,
          capacidad: '--'
        })
      }
      setCargandoCapacidad(false)
    }
    funcion()
  }, [formHeader.alturaInt])

  useEffect(() => {
    const alertaLlenado = puedeRecibirCarga(formHeader.capacidad, formHeader.cantRecibir)
    console.log(productoEnLinea)
    if (alertaLlenado && formHeader.cantRecibir) {
      if ((formHeader.operando || formHeader.enFalla || formHeader.mantencion) && productoEnLinea !== '' && estanque !== '') {
        console.log('entre')
        setCargaAceptada(true)
        // setShowButtonPlus(true)
      } else {
        console.log('no entre')
        setCargaAceptada(false)
        setShowButtonPlus(false)
      }
    } else {
      if (formHeader.cantRecibir) {
        alertSwal(false, 'No es posible recibir esa cantidad de producto, favor tomar nuevamente medidas o recibir menos carga', 4000)
        setCargaAceptada(false)
        setShowButtonPlus(false)
      }
    }
  }, [formHeader, productoEnLinea])

  // funcion verificar capacidad llenado
  const puedeRecibirCarga = (capacidad, recibir) => !(capacidad - recibir < 0)

  useEffect(() => {
    const funcion = async () => {
      setFormHeader({
        ...formHeader,
        capacidad: '--',
        cantRecibir: '',
        alturaInt: ''
      })
      if (estanque !== '' || datosHeader?.prod_linea) {
        if (datosHeader?.prod_linea) {
          const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${datosHeader?.id_planta}&${datosHeader?.estanque_bitacora}`)
          setNombreProd(nombreProducto[0].nombre_producto)
        } else {
          const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${plantaId}&${estanque}`)
          setNombreProd(nombreProducto[0].nombre_producto)
        }
      }
    }
    funcion()
  }, [estanque, datosHeader])

  const handleSetFormRec = (e) => {
    const { name, value } = e.target
    setFormRec({
      ...formRec,
      [name]: value
    })
  }
  const handleSetFormHeader = (e) => {
    const { name, value } = e.target
    if (name === 'operando' || name === 'enFalla' || name === 'mantencion') {
      setFormHeader({
        ...formHeader,
        [name]: !formHeader[name]
      })
    } else {
      setFormHeader({
        ...formHeader,
        [name]: value
      })
    }
  }
  // cambiar operador
  const handleCambioOperador = async () => {
    const valida = validacionFecha(formRec.fecha)
    console.log(formRec)
    if (formRec.opRecibe === '') {
      alertSwal(false, 'Favor escoger operador que recibe')
    } else if (!valida) {
      alertSwal(valida, 'Favor escoger una fecha antes del año 2030')
    } else {
      if (!folioBitacora) {
        alertSwal(false, 'No puede entregar turno si aun no inicia bitácora')
      } else {
        Swal.fire({
          title: '¿Estas finalizando la bitácora?',
          text: 'no podrás volver atrás',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Finalizar'
        }).then(async (result) => {
          // SI CONFIRMA PAUSAR BITACORA
          if (result.isConfirmed) {
            const respFinalizacion = await axios.put(endpointApi + '/api/forms/finalizarbitacora', { finalizada: true, folioBitacora })
            const { data } = await axios.post(endpointApi + '/api/forms/entregaTurno', { ...formRec, folioBitacora })
            alertSwal(data.ok, data.msg)
            if (data.ok && respFinalizacion.data.ok) {
              document.querySelector('.modal-backdrop').remove()
              navigate('/listabitacoras')
            }
          }
        })
      }
    }
  }

  const handleStartBitacora = async () => {
    console.log(formHeader)
    const { data } = await axios.post(endpointApi + '/api/forms/bitacora', { ...formHeader, usrId, estanque, productoEnLinea, plantaId })
    console.log(data)
    if (data.ok) {
      const { folio_bitacora } = data
      setFolioBitacora(folio_bitacora)
      setShowButtonPlus(true)
      setModificable(!modificable)
    } else {
      alertSwal(data.ok, data.msg)
    }
  }
  const handleUpdateBitacora = async () => {
    const { data } = await axios.put(endpointApi + '/api/forms/bitacora', {
      operando: formHeader.operando,
      enfalla: formHeader.enFalla,
      mantencion: formHeader.mantencion,
      obs: formHeader.obs,
      folioBitacora,
      cantRecibir: formHeader.cantRecibir
    })
    alertSwal(data.ok, data.msg)
  }
  return (
    <>
      {/* modal cambio operador */}
      <div className='modal fade modalEntregaTurno' id='modalCambioTurno' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Bitacora de entrega de turno por recepcion de producto</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <div className='row px-5'>
                <div className='col-12'>
                  <div className='input-group mb-3  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Fecha</span>
                    <input type='date' value={formRec.fecha} onChange={handleSetFormRec} name='fecha' max='2027-01-01' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Hora</span>
                    <input type='time' value={formRec.hora} onChange={handleSetFormRec} name='hora' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Operador que entrega</span>
                    <input disabled type='text' value={nombre} name='opEntrega' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3 row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Operador que recibe</span>
                    <div className='selectEmpleados col'>
                      <SelectEmpleado />
                    </div>
                  </div>
                  <div className='input-group mb-3  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Productos en recepción</span>
                    <input type='text' value={formRec.prodRecepcion} onChange={handleSetFormRec} name='prodRecepcion' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1'>Tiempo para el remate</span>
                    <input type='text' value={formRec.tiempoRemate} onChange={handleSetFormRec} name='tiempoRemate' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3 contEntregGrande  row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1' />
                    <p className='infoLargaBitacora'>Productos que faltan por recibir</p>
                    <input type='text' value={formRec.prodFaltantes} onChange={handleSetFormRec} name='prodFaltantes' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3 contEntregGrande row d-flex'>
                    <span className='input-group-text spanFormEntrega' id='basic-addon1' />
                    <p className='infoLargaBitacora'>Estanques con valvulas entrada abiertas</p>
                    <input type='text' value={formRec.estValvulas} onChange={handleSetFormRec} name='estValvulas' className='col form-control' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                  <div className='input-group mb-3 contEntregGrande row d-flex'>
                    <span className='input-group-text spanFormEntrega col-3' id='basic-addon1' />
                    <p className='infoLargaBitacora'>Estanques entregando producto</p>

                    <input type='text' value={formRec.estEntregando} onChange={handleSetFormRec} name='estEntregando' className='col form-control FormEntrega' aria-label='Username' aria-describedby='basic-addon1' />
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
              <button onClick={handleCambioOperador} type='button' className='btn btn-primary'>Guardar</button>
            </div>
          </div>
        </div>
      </div>

      {/* primera fila */}
      <div className='contHeaderBit'>
        <div className='input-group d-flex justify-content-end animate__animated animate__fadeIn row inputsFila1'>
          <div className='col-3 d-flex p-0 primerElemento'>
            <span className='input-group-text spanLabelCol1'>Fecha</span>
            <input disabled={!modificable} type='date' value={formHeader.fecha} onChange={handleSetFormHeader} name='fecha' className='form-control inputcol2 inputfechareg' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <div className='col-9 d-flex p-0'>
            <span className='input-group-text spanLabelColOp'>Operador</span>
            <input value={nombre} onChange={handleSetFormHeader} name='operador' disabled className='form-control inputOperador' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
        </div>
        {/* segunda fila */}
        <div className='input-group d-flex justify-content-end animate__animated animate__fadeIn row inputsFila2'>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabelCol1'>Tanque</span>
              {!datosHeader?.estanque_bitacora
                ? <div className='inputCol2 form-control' aria-label='Username' aria-describedby='basic-addon1'>
                 <SelectEstanque />
                  </div>
                : <input className='form-control inputcol2' value={datosHeader?.estanque_bitacora} disabled />}
          </div>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabelCol2'>Producto</span>
            <input value={nombreProd} name='producto' disabled className='form-control inputCol4' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <div className='col-6 d-flex p-0'>
            <span className='input-group-text spanLabel8 labelPruebasNivel col-3'>PruebaAlarmaNivel</span>
            <div className='ms-3 contAlarmasNivel col row'>
              <div className='col-4 contCheckAlarma'>
                <input disabled={folioBitacora} checked={formHeader.operando} onChange={handleSetFormHeader} name='operando' className='form-check-input' type='checkbox' id='inlineCheckbox1' />
                <label className='ms-1 form-check-label' htmlFor='inlineCheckbox1'>Operando</label>
              </div>
              <div className='col-4 contCheckAlarma2'>
                <input disabled={folioBitacora} checked={formHeader.enFalla} onChange={handleSetFormHeader} name='enFalla' className='form-check-input' type='checkbox' id='inlineCheckbox2' />
                <label className='ms-1 form-check-label' htmlFor='inlineCheckbox2'>En falla</label>
              </div>
              <div className='col-4 contCheckAlarma3'>
                <input disabled={folioBitacora} checked={formHeader.mantencion} onChange={handleSetFormHeader} name='mantencion' className='form-check-input' type='checkbox' id='inlineCheckbox3' />
                <label className='ms-1 form-check-label' htmlFor='inlineCheckbox3'>Mantención</label>
              </div>
            </div>
          </div>
        </div>
        {/* tercera fila */}
        <div className='input-group d-flex justify-content-end animate__animated animate__fadeIn row p-0 inputsFila3'>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabelCol1'>Altura Int Act</span>
            <input disabled={estanque === '' || !modificable} value={formHeader.alturaInt} onChange={handleSetFormHeader} name='alturaInt' type='number' className='inputCol2 form-control' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabelCol2 cantRecibir'>{bitFinalizada ? 'Cantidad' : 'Cantidad a recibir'}</span>
            <input disabled={(!((formHeader?.alturaInt / 10 > rangoEstanque[0][0]) && (formHeader?.alturaInt / 10 < rangoEstanque[0][1])) && !datosHeader) || bitFinalizada} value={formHeader.cantRecibir} onChange={handleSetFormHeader} name='cantRecibir' type='number' className='form-control inputCol4' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
          <p className='metroscub1'>m<sup>3</sup></p>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabelCap'>Capacidad</span>
            {!datosHeader?.capacidad
              ? <>
            {cargandoCapacidad
              ? <div className='form-control spinnerCapacidad' aria-label='Username' aria-describedby='basic-addon1'>
                <CircularProgress color='inherit' size='small' />
                </div>
              : <input value={isNaN(formHeader?.capacidad) ? '--' : addPuntos(formHeader?.capacidad?.toFixed(2).replace('.', ','))} onChange={handleSetFormHeader} name='capacidad' type='text' disabled className='form-control' aria-label='Username' aria-describedby='basic-addon1' />}
                </>
              : <input type='text' value={datosHeader?.capacidad} className='form-control inputCol4' disabled />}

          </div>
          <p className='metroscub2'>m<sup>3</sup></p>
          <div className='col-3 d-flex p-0'>
            <span className='input-group-text spanLabel8 spanEnLinea'>{bitFinalizada ? 'En linea' : 'Producto en linea'}</span>
            {!datosHeader?.prod_linea
              ? <div className='inputselectEstReg form-control' aria-label='Username' aria-describedby='basic-addon1'>
              <SelectProducto />
                </div>
              : <input className='form-control inputCol4' value={datosHeader?.nombre_producto} disabled />}
          </div>
        </div>
        {/* errores */}
        {((formHeader?.alturaInt / 10 < rangoEstanque[0][0]) || (formHeader?.alturaInt / 10 > rangoEstanque[0][1])) &&
          <p style={{ color: 'red', fontStyle: 'italic' }}>Favor ingresar una altura válida entre {rangoEstanque[0][0] * 10} y {rangoEstanque[0][1] * 10}</p>}        {/* obs */}
        <div className='obsBitacora animate__animated animate__fadeIn row inputsFila1'>
          <div className='input-group d-flex justify-content-end col-12 p-0'>
            <span className='input-group-text spanLabelColObs'>Observaciones</span>
            <textarea disabled={!cargaAceptada || bitFinalizada} value={formHeader.obs} onChange={handleSetFormHeader} name='obs' placeholder='Escriba alguna observacion' rows='2' className='inputCol2 form-control inputObs' aria-label='Username' aria-describedby='basic-addon1' />
          </div>
        </div>
      </div>
      {!bitFinalizada && <div className='contBtnCampoOp mt-2'>
{folioBitacora && <> <button className='btn btns btnCambioOperador mt-3 me-3' data-bs-toggle='modal' data-bs-target='#modalCertificados'><i className='fas fa-plus me-2' />Certificados</button>
        <button className='btn btns btnCambioOperador mt-3' disabled={!cargaAceptada} data-bs-toggle='modal' data-bs-target='#modalCambioTurno'>Cambio operador</button>
                  </>}
       {modificable
         ? <button className='btn btns btnCambioOperador mt-3 ms-3' disabled={!cargaAceptada} onClick={handleStartBitacora}>Iniciar bitácora</button>
         : <button className='btn btn-danger btnCambioOperador mt-3 ms-3' onClick={handleUpdateBitacora}>Actualizar datos</button>}
                         </div>}
      <ModalCertificados setcertificados={setcertificados} certificados={certificados} folioBitacora={folioBitacora} />
    </>
  )
}
