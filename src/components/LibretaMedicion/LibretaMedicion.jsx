/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-indent */
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { api60factor6 } from '../../helpers/formulasApi60'
import Swal from 'sweetalert2'
import moment from 'moment'
import { SelectPlantas } from '../select/SelectPlantas'
import { SelectEstanques } from '../select/SelectEstanques'
import { endpointApi } from '../../helpers/variableApi'
import { addPuntos } from '../../helpers/addPuntos'
import { alertSwal } from '../../helpers/swal'
import { UserContext } from '../../context/UserContext'

export const LibretaMedicion = ({ folioSeleccionado: f, modificar = false, disabledDefinitivo = false, disabletoModify = false }) => {
  const { datosUser: { usrId: idUserActivo, nombre: nombreUserActivo } } = useContext(UserContext)
  const [planta, SelectPlant] = SelectPlantas()
  const [estanque, SelectTank] = SelectEstanques(planta)
  const [disabledModify, setDisebleModify] = useState(disabletoModify)
  const [canModify, setCanModify] = useState(false)
  const [primeraTemp, setPrimeraTemp] = useState(f?.temperatura_interna_inferior || 0)
  const [segundaTemp, setSegundaTemp] = useState(f?.temperatura_interna_medio || 0)
  const [terceraTemp, setTerceraTemp] = useState(f?.temperatura_interna_superior)
  const [primeraInterna, setPrimeraInterna] = useState(f?.altura_interna_primera || 0)
  const [segundaInterna, setSegundaInterna] = useState(f?.altura_interna_segunda || 0)
  const [terceraInterna, setTerceraInterna] = useState(f?.altura_interna_tercera || 0)
  const [tempPromedio, setTempPromedio] = useState()
  const [calcTempObs, setCalcTempObs] = useState(f?.temperatura_laboratorio || 0)
  const [calcDenObs, setCalcDenObs] = useState(f?.densidad_laboratorio || 0)
  const [api60, setApi60] = useState()
  const [primeraMed, setPrimeraMed] = useState(f?.primera_medicion || 0)
  const [segundaMed, setSegundaMed] = useState(f?.segunda_medicion || 0)
  const [terceraMed, setTerceraMed] = useState(f?.tercera_medicion || 0)
  const [cuartaMed, setCuartaMed] = useState(f?.cuarta_medicion || 0)
  const [quintaMed, setquintaMed] = useState(f?.quinta_medicion || 0)
  const [sextaMed, setSextaMed] = useState(f?.sexta_medicion || 0)
  const [alturaRef, setAlturaRef] = useState(f?.altura_ref || '')
  const [fecha, setFecha] = useState(moment(f?.fecha).format('YYYY-MM-DD'))
  const [hora, setHora] = useState(f?.hora || '')
  const [alturaExterna, setAlturaExterna] = useState(f?.altura_externa || 0)
  const [alturaInterna, setAlturaInterna] = useState(f?.altura_interna || 0)
  const [alturaAgua, setAlturaAgua] = useState((f?.altura_agua) || 0)
  const [oleoducto, setOleoducto] = useState(f?.oleoducto || false)
  const [transferencia, setTransferencia] = useState(f?.transferencia || false)
  const [trasvasijo, setTrasvasijo] = useState(f?.trasvasijo || false)
  const [recFisico, setRecFisico] = useState(f?.r_fisico || false)
  const [drenaje, setDrenaje] = useState(f?.drenaje || false)
  const [sec, setSec] = useState(f?.sec || false)
  const [alarmaNivel, setAlarmaNivel] = useState(f?.alarma_nivel || false)
  const [nombreCreador, setNombreCreador] = useState('')
  const [nombreEditor, setNombreEditor] = useState('')
  const [nombreProducto, setNombreProducto] = useState('')
  const [nombrePlantaSel, setNombrePlantaSel] = useState('')
  const [nombreProductoVerLibreta, setNombreProductoVerLibreta] = useState('')

  useEffect(async () => {
    if (f) {
      const { data: { ok, nombre } } = await axios.post(endpointApi + '/api/forms/buscarNombrePorId', { id: f?.usuario_id })
      if (ok) {
        const { usr_nombre } = nombre[0]
        setNombreCreador(usr_nombre.toLowerCase())
      }
      if (f?.usuario_edit) {
        const { data: { ok, nombre } } = await axios.post(endpointApi + '/api/forms/buscarNombrePorId', { id: f?.usuario_edit })
        if (ok) {
          const { usr_nombre } = nombre[0]
          setNombreEditor(usr_nombre.toLowerCase())
        }
      }
    }
    // traer nombrePlanta
    if (f) {
      try {
        const datos = await axios.get(endpointApi + `/api/forms/nombrePlantaporId${f?.planta_id}`)
        if (datos?.data?.resp) {
          const { data } = datos
          const { resp } = data
          const { pla_glosa } = resp[0]
          setNombrePlantaSel(pla_glosa)
        } else {
          alertSwal(false, 'Ha ocurrido un error, intente nuevamente')
        }
      } catch (error) {
        alertSwal(false, 'Ha ocurrido un error, intente nuevamente')
      }
      // traerNombreProducto
      const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${f?.planta_id}&${f?.numero_estanque}`)
      const { nombre_producto } = nombreProducto[0]
      setNombreProductoVerLibreta(nombre_producto)
    }
  }, [])

  useEffect(async () => {
    if (estanque !== '') {
      const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${planta}&${estanque}`)
      const { nombre_producto } = nombreProducto[0]
      setNombreProducto(nombre_producto)
    }
  }, [estanque])

  useEffect(() => {
    setNombreProducto('')
  }, [planta])

  const onSubmit = async (event) => {
    event.preventDefault()
    const numFolio = await axios.post(endpointApi + '/api/forms/agregarlibreta', {
      oleoducto,
      transferencia,
      trasvasijo,
      recFisico,
      drenaje,
      sec,
      alarmaNivel,
      alturaRef,
      fecha,
      hora,
      alturaExterna,
      primeraInterna,
      segundaInterna,
      terceraInterna,
      alturaInterna,
      alturaAgua,
      primeraTemp,
      segundaTemp,
      terceraTemp,
      tempPromedio,
      calcDenObs,
      calcTempObs,
      api60,
      primeraMed: removePuntos(primeraMed),
      segundaMed: removePuntos(segundaMed),
      terceraMed: removePuntos(terceraMed),
      cuartaMed: removePuntos(cuartaMed),
      quintaMed: removePuntos(quintaMed),
      sextaMed: removePuntos(sextaMed),
      idUserActivo,
      planta,
      estanque
    })
    if (numFolio.data.response) {
      Swal.fire(`Folio de Libreta de Medicion: ${numFolio.data.response[0].folio_id}`)
      setOleoducto(false)
      setTransferencia(false)
      setTrasvasijo(false)
      setRecFisico(false)
      setDrenaje(false)
      setSec(false)
      setAlarmaNivel(false)
      setFecha('')
      setHora('')
      setAlturaRef('')
      setAlturaExterna('')
      setAlturaInterna('')
      setAlturaAgua('')
      setPrimeraTemp('')
      setSegundaTemp('')
      setTerceraTemp('')
      setCalcDenObs('')
      setCalcTempObs('')
      setApi60('')
      setTempPromedio('')
      setPrimeraMed(0)
      setSegundaMed(0)
      setTerceraMed(0)
      setCuartaMed(0)
      setquintaMed(0)
      setSextaMed(0)
      setPrimeraInterna('')
      setSegundaInterna('')
      setTerceraInterna('')
      setAlturaInterna('')
    } else {
      Swal.fire('Hubo un ERROR, favor revisar datos ingresados antes de volver a enviar')
    }
  }

  const removePuntos = num => num.toString().replaceAll('.', '')
  const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  const removeNonNumeric = num => num.toString().replace(/[^0-9]/g, '')
  const handleChange = event => {
    if (event.target.value !== '') {
      setPrimeraMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }
  const handleChange2 = event => {
    if (event.target.value !== '') {
      setSegundaMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }
  const handleChange3 = event => {
    if (event.target.value !== '') {
      setTerceraMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }
  const handleChange4 = event => {
    if (event.target.value !== '') {
      setCuartaMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }
  const handleChange5 = event => {
    if (event.target.value !== '') {
      setquintaMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }
  const handleChange6 = event => {
    if (event.target.value !== '') {
      setSextaMed(addCommas(removeNonNumeric(event.target.value)))
    }
  }

  const calculoTempPromedio = () => {
    if (Number(primeraTemp) === Number(segundaTemp) || Number(primeraTemp) === Number(terceraTemp)) {
      setTempPromedio(Number(primeraTemp))
    } else if (Number(segundaTemp) === Number(terceraTemp)) {
      setTempPromedio(Number(segundaTemp))
    } else {
      setTempPromedio(((Number(primeraTemp) + Number(segundaTemp) + Number(terceraTemp)) / 3).toFixed(1))
    }
  }
  const calculoAltPromedio = () => {
    if (Number(primeraInterna) === Number(segundaInterna) || Number(primeraInterna) === Number(terceraInterna)) {
      setAlturaInterna(primeraInterna)
    } else if (Number(segundaInterna) === Number(terceraInterna) || Number(segundaInterna) === Number(primeraInterna)) {
      setAlturaInterna(segundaInterna)
    } else {
      setAlturaInterna('Al menos 2 mediciones deben coincidir')
    }
  }
  useEffect(() => {
    setDisebleModify(disabletoModify)
  }, [])

  useEffect(() => {
    calculoAltPromedio()
    calculoTempPromedio()
    if (calcDenObs && calcDenObs > 0 && calcDenObs < 85) {
      setApi60(api60factor6(Number(calcDenObs), Number(calcTempObs), 60).api60)
    }
  }, [primeraTemp, segundaTemp, terceraTemp, calcDenObs, calcTempObs, oleoducto, primeraInterna, segundaInterna, terceraInterna])

  const handleClickModificar = () => {
    setDisebleModify(false)
    setCanModify(true)
  }

  const handleClickActualizar = async () => {
    setDisebleModify(true)
    setCanModify(false)

    const { data } = await axios.put(endpointApi + '/api/forms/modificarlibreta', {
      nFolio: f?.folio_id,
      oleoducto,
      transferencia,
      trasvasijo,
      recFisico,
      drenaje,
      sec,
      alarmaNivel,
      alturaRef,
      fecha,
      hora,
      alturaExterna,
      primeraInterna,
      segundaInterna,
      terceraInterna,
      alturaInterna,
      alturaAgua,
      primeraTemp,
      segundaTemp,
      terceraTemp,
      tempPromedio,
      calcDenObs,
      calcTempObs,
      api60,
      primeraMed: removePuntos(primeraMed),
      segundaMed: removePuntos(segundaMed),
      terceraMed: removePuntos(terceraMed),
      cuartaMed: removePuntos(cuartaMed),
      quintaMed: removePuntos(quintaMed),
      sextaMed: removePuntos(sextaMed),
      idUserActivo
    })
    // console.log(body)
    alertSwal(data.ok, data.msg)
  }

  const handleEnter = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault()
      const form = e.target.form
      const index = [...form].indexOf(e.target)
      form.elements[index + 1].focus()
      form.elements[index + 1].select()
    }
  }

  const handleEnter2 = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault()
      const form = e.target.form
      const index = [...form].indexOf(e.target)
      form.elements[index + 2].focus()
      form.elements[index + 2].select()
    }
  }

  return (
    <>
      <div className='container border animate__animated animate__fadeIn contLibreta'>
      {f?.folio_id && <div className='col contNFolio'><h2 className='p-2'>N° Folio: {f?.folio_id}</h2></div>}
      <div className='contenedorAbsoluteNombres'>
        {nombreCreador !== '' && <div className='col nombreCreador'><h6 className='p-2'>* Registrado por {nombreCreador}</h6></div>}
      {nombreEditor !== '' && <div className='col nombreEditor'><h6 className='p-2'> * Editado por {nombreEditor}</h6></div>}
      </div>
        <h2 className='text-center p-2 mb-4 titulos'>Libreta Medicion</h2>
       {f?.folio_id && <div className='contInfoLibreta mb-3'>
        <div className='row d-flex'>
        <div className='col-4 text-center'><h4>Planta {nombrePlantaSel.toLowerCase()}</h4></div>
        <div className='col-4 text-center'><h4>Estanque {f?.numero_estanque}</h4></div>
        <div className='col-4 text-center'><h4> {nombreProductoVerLibreta}</h4></div>
        </div>
                       </div>}

       {!disabledDefinitivo && <div className='container'>
         <div className='row'>
           <div className='col'><SelectPlant /></div>
           <div className='col'><SelectTank /></div>
           <div className='col text-center'>
             <h3>Producto</h3>
             <p className='mt-4 fw-bold fs-5'>{nombreProducto}</p>
           </div>
         </div>
                               </div>}
        <form onSubmit={onSubmit}>
          <div className='d-flex justify-content-around'>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setOleoducto(!oleoducto)} checked={oleoducto} type='checkbox' value='' id='oleoducto' />
              <label className='form-check-label' htmlFor='oleoducto'>BT/Oleoducto</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setTransferencia(!transferencia)} checked={transferencia} type='checkbox' value='' id='transferencia' />
              <label className='form-check-label' htmlFor='transferencia'>Transferencia</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setTrasvasijo(!trasvasijo)} checked={trasvasijo} type='checkbox' value='' id='trasvasijo' />
              <label className='form-check-label' htmlFor='trasvasijo'>Trasvasijo</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setRecFisico(!recFisico)} checked={recFisico} type='checkbox' value='' id='recuentoFisico' />
              <label className='form-check-label' htmlFor='recuentoFisico'>R. Físico</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setDrenaje(!drenaje)} checked={drenaje} type='checkbox' value='' id='drenaje' />
              <label className='form-check-label' htmlFor='drenaje'>Drenaje</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setSec(!sec)} checked={sec} type='checkbox' value='' id='sec' />
              <label className='form-check-label' htmlFor='sec'>SEC</label>
            </div>
            <div className='form-check'>
              <input disabled={disabledModify} className='form-check-input' onChange={() => setAlarmaNivel(!alarmaNivel)} checked={alarmaNivel} type='checkbox' value='' id='alarmaNivel' />
              <label className='form-check-label' htmlFor='alarmaNivel'>Alarma Nivel</label>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 py-4'>
              <h3>Medición</h3>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>Altura Ref.</span>
                <input required disabled={disabledModify} onChange={event => setAlturaRef(event.target.value)} value={alturaRef} placeholder='Altura Referencia' id='alturaRef' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabel'>Fecha</span>
                <input required disabled={disabledModify} onChange={event => setFecha(event.target.value)} value={fecha} id='fechaLibretaMedicion' type='date' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel5'>Hora</span>
                <input required disabled={disabledModify} id='hora' onChange={event => setHora(event.target.value)} value={hora} type='time' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} placeholder='field 3' />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>Altura Externa</span>
                <input required disabled={disabledModify} type='number' step='any' id='alturaExterna' onChange={event => setAlturaExterna(event.target.value)} value={alturaExterna} placeholder='Altura Externa' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
              </div>
              <div className='input-group'>
              <span className='input-group-text spanLabel'>Altura Interna</span>
                <span className='input-group-text spanLabel2'>1<sup>a</sup> Medición</span>
                <input required disabled={disabledModify} type='number' step='any' id='alturaInterna' onChange={event => setPrimeraInterna(event.target.value)} value={primeraInterna} placeholder='Altura Interna' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel2'>2<sup>a</sup> Medición</span>
                <input required disabled={disabledModify} type='number' step='any' id='alturaInterna' onChange={event => setSegundaInterna(event.target.value)} value={segundaInterna} placeholder='Altura Interna' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel2'>3<sup>a</sup> Medición</span>
                <input required disabled={disabledModify} type='number' step='any' id='alturaInterna' onChange={event => setTerceraInterna(event.target.value)} value={terceraInterna} placeholder='Altura Interna' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter2} />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>Altura Interna Final</span>
                <input required disabled id='alturaExterna' value={addPuntos(alturaInterna)} placeholder='Altura Externa' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>Altura Agua (mm)</span>
                <input required disabled={disabledModify} type='number' step='any' id='alturaAgua' onChange={event => setAlturaAgua(event.target.value)} value={alturaAgua} placeholder='Altura Agua' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>T° Interior</span>
                <span className='input-group-text spanLabel2'>T° Int Inferior</span>
                <input required id='primeraTemp' type='number' step='0,1' disabled={disabledModify} onChange={event => setPrimeraTemp(event.target.value)} value={primeraTemp} placeholder='T° Int Inferior' aria-label='First name' className='form-control text-center' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel2'>T° Int Media</span>
                <input required id='segundaTemp' type='number' step='any' disabled={disabledModify} onChange={event => setSegundaTemp(event.target.value)} value={segundaTemp} placeholder='T° Int Media' aria-label='Last name' className='form-control text-center' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel2'>T° Int Superior</span>
                <input required id='terceraTem' type='number' step='any' disabled={disabledModify} onChange={event => setTerceraTemp(event.target.value)} value={terceraTemp} placeholder='T° Int Superior' aria-label='Last name' className='form-control text-center' onKeyDown={handleEnter2} />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>T° Interna Promedio</span>
                <input id='tempPromedio' value={!isNaN(tempPromedio) ? tempPromedio : 'Ingresar Numeros'} disabled placeholder='Tempertura Promedio' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>Densidad Laboratorio</span>
                <input required type='number' step='any' max='84.9' disabled={disabledModify} id='densidadObservada' onChange={event => setCalcDenObs(event.target.value)} value={!(Number(calcDenObs) <= 0) || Number(calcDenObs) >= 85 ? calcDenObs : 'Densidad Observada'} placeholder='Densidad Observada' aria-label='First name' className='form-control text-center' onKeyDown={handleEnter} />
                <span className='input-group-text spanLabel5'>Temperatura Laboratorio</span>
                <input required type='number' step='any' disabled={disabledModify} id='tempObservada' onChange={event => setCalcTempObs(event.target.value)} value={!(Number(calcTempObs) === 0) ? calcTempObs : calcTempObs} placeholder='Temperatura Observada' aria-label='Last name' className='form-control text-center' onKeyDown={handleEnter2} />

              </div>
              <div className='input-group'>
                <span className='input-group-text spanLabel'>API60</span>
                <input id='api60' placeholder='API60' value={!isNaN(api60) && calcDenObs < 85 && calcDenObs > 0 ? api60 : 'Favor Ingrese Numeros Validos: Rango Desidad Observada 0.1-84.9'} disabled type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <h5 className='p-2 text-center'>Medidores</h5>
             <div className='row'>
               <div className='col-4'>
               <div className='input-group'>
               <span className='input-group-text spanLabel4'>1<sup>er</sup> Med</span>
                <input disabled={disabledModify} id='primeraMed' onInput={handleChange} value={addPuntos(primeraMed)} placeholder='Primera Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
               </div>
               </div>
               <div className='col-4'>
               <div className='input-group'>
               <span className='input-group-text spanLabel4'>2<sup>do</sup> Med</span>
                <input disabled={disabledModify} id='segundaMed' onInput={handleChange2} value={addPuntos(segundaMed)} placeholder='Segunda Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
               </div>
               </div>
               <div className='col-4'>
                 <div className='input-group'>
               <span className='input-group-text spanLabel4'>3<sup>er</sup> Med</span>
                <input disabled={disabledModify} id='terceraMed' onInput={handleChange3} value={addPuntos(terceraMed)} placeholder='Tercera Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
                 </div>
               </div>
               <div className='col-4 mt-2'>
                 <div className='input-group'>
               <span className='input-group-text spanLabel4'>4<sup>to</sup> Med</span>
                <input disabled={disabledModify} id='cuartaMed' onInput={handleChange4} value={addPuntos(cuartaMed)} placeholder='Cuarta Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
                 </div>
               </div>
               <div className='col-4 mt-2'>
               <div className='input-group'>
               <span className='input-group-text spanLabel4'>5<sup>to</sup> Med</span>
                <input disabled={disabledModify} id='quintaMed' onInput={handleChange5} value={addPuntos(quintaMed)} placeholder='Quinta Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
               </div>
               </div>
               <div className='col-4 mt-2'>
                <div className='input-group'>
               <span className='input-group-text spanLabel4'>6<sup>to</sup> Med</span>
                <input disabled={disabledModify} id='sextaMed' onInput={handleChange6} value={addPuntos(sextaMed)} placeholder='Sexta Medicion' type='text' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                </div>
               </div>
             </div>
            </div>
          </div>
          {!f?.bloqueado && (modificar
            ? (!canModify
                ? <div className='row d-flex justify-content-center'>
              <div className='col-6 mb-2'>
                <button onClick={handleClickModificar} className='btn btn-danger mt-4 btnTabla5b' type='button'>Modificar</button>
              </div>
                  </div>
                : <div className='col-6 mb-2 contBtnUpdate'>
              <button onClick={handleClickActualizar} className='btn btn-success mt-4 btnTabla5b btnUpdate' type='button'>Actualizar</button>
                  </div>
              )
            : <div className='row d-flex justify-content-center'>
              <div className='col-6 mb-2'><button className='btn btn-primary mt-4 btnTabla5b' type='submit'>Guardar</button>
              </div>
              </div>)}

        </form>
      </div>
    </>
  )
}
