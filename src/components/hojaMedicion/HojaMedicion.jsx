/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useSelect } from '../../helpers/useSelect'
import { endpointApi } from '../../helpers/variableApi'
import { api60factor6 } from '../../helpers/formulasApi60'
import { addPuntos } from '../../helpers/addPuntos'
import Swal from 'sweetalert2'
import { UserContext } from '../../context/UserContext'
import './HojaMedidaPrint.css'

export const HojaMedicion = () => {
  const { datosUser: { plantaId } } = useContext(UserContext)
  // CABECERA
  const [volMedNat, setVolMedNat] = useState(false)
  const [volMeda60, setVolMeda60] = useState(true)
  const [checkFactor13, setCheckFactor13] = useState(false)
  const [estanques, setEstanques] = useState([])
  const [nombreProducto, setNombreProducto] = useState()
  const [nombreUsuario, setNombreUsuario] = useState()
  const [codigoUsuario, setCodigoUsuario] = useState()
  const [fecha, setFecha] = useState()
  const [operacion, setOperacion] = useState()
  const [transaccion, setTransaccion] = useState()
  const [emb, setEmb] = useState()
  const [ciclo, setCiclo] = useState()
  const [observacion, setObservacion] = useState()
  const [disFieldSet, setDisFieldSet] = useState(false)

  // Valores Antes
  const [alturaInteriorAntes, setAlturaInteriorAntes] = useState(0)
  const [alturaAguaAntes, setAlturaAguaAntes] = useState(0)
  const [densLabAntes, setDensLabAntes] = useState(0)
  const [tempLabAntes, setTempLabAntes] = useState(0)
  const [manEstAntes, setManEstAntes] = useState(0)
  const [mEAntesCheck, setMEAntesCheck] = useState(false)
  const [mEAntesValue, setMEAntesValue] = useState(0)
  const [estMbbAntes, setEstmbbAntes] = useState(0)
  const [eMAntesCheck, setEMAntesCheck] = useState(false)
  const [eMAntesValue, setEMAntesValue] = useState(0)
  const [mbbMesaAntes, setMbbMesaAntes] = useState(0)
  const [mMAntesCheck, setMMAntesCheck] = useState(false)
  const [mMAntesValue, setMMAntesValue] = useState(0)
  const [api60Antes, setApi60Antes] = useState(0)
  const [factor6Antes, setFactor6Antes] = useState(0)
  const [factor13Antes, setFactor13Antes] = useState(0)
  const [firstMedAntes, setFirstMedAntes] = useState(0)
  const [secondMedAntes, setSecondMedAntes] = useState(0)
  const [thirdMedAntes, setThirdMedAntes] = useState(0)
  const [fourthMedAntes, setFourthMedAntes] = useState(0)
  const [fifthMedAntes, setFifthMedAntes] = useState(0)
  const [sixthMedAntes, setSixthMedAntes] = useState(0)
  const [volNatAntes, setVolNatAntes] = useState(0)
  const [volNatAntesSum, setVolNatAntesSum] = useState(0)
  const [fechaAntes, setFechaAntes] = useState()
  const [horaAntes, setHoraAntes] = useState()
  const [volA60Antes, setVolA60Antes] = useState(0)
  const [kilosAntes, setKilosAntes] = useState(0)
  const [volAguaAntes, setVolAguaAntes] = useState(0)
  const [otrosVolAntes, setOtrosVolAntes] = useState(0)
  const [despTechoAntes, setDespTechoAntes] = useState(0)
  const [dosiVolAntes, setDosiVolAntes] = useState(0)

  // Valores Despues
  const [alturaInteriorDespues, setAlturaInteriorDespues] = useState(0)
  const [alturaAguaDespues, setAlturaAguaDespues] = useState(0)
  const [densLabDespues, setDensLabDespues] = useState(0)
  const [tempLabDespues, setTempLabDespues] = useState(0)
  const [manEstDespues, setManEstDespues] = useState(0)
  const [mEDespuesCheck, setMEDespuesCheck] = useState(false)
  const [mEDespuesValue, setMEDespuesValue] = useState(0)
  const [estMbbDespues, setEstmbbDespues] = useState(0)
  const [eMDespuesCheck, setEMDespuesCheck] = useState(false)
  const [eMDespuesValue, setEMDespuesValue] = useState(0)
  const [mbbMesaDespues, setMbbMesaDespues] = useState(0)
  const [mMDespuesCheck, setMMDespuesCheck] = useState(false)
  const [mMDespuesValue, setMMDespuesValue] = useState(0)
  const [api60Despues, setApi60Despues] = useState(0)
  const [factor6Despues, setFactor6Despues] = useState(0)
  const [factor13Despues, setFactor13Despues] = useState(0)
  const [firstMedDespues, setFirstMedDespues] = useState(0)
  const [secondMedDespues, setSecondMedDespues] = useState(0)
  const [thirdMedDespues, setThirdMedDespues] = useState(0)
  const [fourthMedDespues, setFourthMedDespues] = useState(0)
  const [sixthMedDespues, setSixthMedDespues] = useState(0)
  const [fifthMedDespues, setFifthMedDespues] = useState(0)
  const [volNatDespues, setVolNatDespues] = useState(0)
  const [volNatDespuesSum, setVolNatDespuesSum] = useState(0)
  const [fechaDespues, setFechaDespues] = useState()
  const [horaDespues, setHoraDespues] = useState()
  const [volA60Despues, setVolA60Despues] = useState(0)
  const [kilosDespues, setKilosDespues] = useState(0)
  const [volAguaDespues, setVolAguaDespues] = useState(0)
  const [estanqueVacioDespues, setEstanqueVacioDespues] = useState(false)
  const [otrosVolDespues, setOtrosVolDespues] = useState(0)
  const [despTechoDespues, setDespTechoDespues] = useState(0)
  const [dosiVolDespues, setDosiVolDespues] = useState(0)

  // FINALES
  const [primMedFinal, setPrimMedFinal] = useState(0)
  const [secMedFinal, setSecMedFinal] = useState(0)
  const [terMedFinal, setTerMedFinal] = useState(0)
  const [cuarMedFinal, setCuarMedFinal] = useState(0)
  const [quinMedFinal, setQuinMedFinal] = useState(0)
  const [sexMedFinal, setSexMedFinal] = useState(0)
  const [totalNat, setTotalNat] = useState(0)
  const [totalA60, setTotalA60] = useState(0)
  const [totalMasEntregasNat, setTotalMasEntregasNat] = useState(0)
  const [totalMasEntregasA60, setTotalMasEntregasA60] = useState(0)
  const [totalMasEntregasKilos, setTotalMasEntregasKilos] = useState(0)
  const [granTotalNat, setGranTotalNat] = useState(0)
  const [granTotal60, setGranTotal60] = useState(0)
  const [granTotalKilos, setGranTotalKilos] = useState(0)
  const [totalMasMed, setTotalMasMed] = useState(0)

  const [previewPDF, setpreviewPDF] = useState(true)
  const [distEsmax, setDistEsmax] = useState(0)
  const [distEnex, setDistEnex] = useState(0)
  const [distCopec, setDistCopec] = useState(0)
  const [distOtros, setDistOtros] = useState(0)

  const [foliosOrigen, setFoliosOrigen] = useState([])
  const [folioFinalHoja, setfolioFinalHoja] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const numFolio = await axios.post(endpointApi + '/api/forms/insertHojaMedida', {
      fecha,
      tanque,
      operacion,
      nombreProducto,
      transaccion,
      ciclo,
      emb,
      checkFactor13,
      volMedNat,
      volMeda60,
      libreta,
      fechaAntes,
      horaAntes,
      alturaInteriorAntes,
      alturaAguaAntes,
      tempLabAntes,
      densLabAntes,
      volNatAntes,
      volNatAntesSum,
      despTechoAntes,
      manEstAntes,
      estMbbAntes,
      mbbMesaAntes,
      volAguaAntes,
      api60Antes,
      factor6Antes,
      factor13Antes,
      kilosAntes,
      libreta2,
      fechaDespues,
      horaDespues,
      alturaInteriorDespues,
      alturaAguaDespues,
      tempLabDespues,
      densLabDespues,
      volNatDespues,
      volNatDespuesSum,
      despTechoDespues,
      manEstDespues,
      estMbbDespues,
      mbbMesaDespues,
      volAguaDespues,
      api60Despues,
      factor6Despues,
      factor13Despues,
      kilosDespues,
      totalA60,
      granTotalNat,
      granTotal60,
      granTotalKilos,
      firstMedAntes,
      secondMedAntes,
      thirdMedAntes,
      fourthMedAntes,
      fifthMedAntes,
      sixthMedAntes,
      firstMedDespues,
      secondMedDespues,
      thirdMedDespues,
      fourthMedDespues,
      fifthMedDespues,
      sixthMedDespues,
      primMedFinal,
      secMedFinal,
      terMedFinal,
      cuarMedFinal,
      quinMedFinal,
      sexMedFinal,
      observacion,
      distEsmax,
      distEnex,
      distCopec,
      distOtros,
      nombreUsuario,
      codigoUsuario,
      plantaId
    })
    if (numFolio.data.response) {
      setfolioFinalHoja(numFolio.data.response[0].folio)
      Swal.fire(`Folio de Hoja de Medida: ${numFolio.data.response[0].folio}`)
      setDisFieldSet(true)
    } else {
      Swal.fire('Ha ocurrido un Error, revisa que todos los datos esten bien Ingresados')
    }
  }

  const {
    datosUser
  } = useContext(UserContext)

  useEffect(async () => {
    const { data: { medio } } = await axios.post(endpointApi + '/api/forms/calibracion', { idPlanta: datosUser.plantaId })
    setNombreUsuario(datosUser.nombre)
    setCodigoUsuario(datosUser.usrId)
    setEstanques(medio.map((e) => Object.keys(e)[0]))
  }, [])
  const [tanque, SelectTanque] = useSelect('', (estanques.map((d) => {
    return { code: d, name: d }
  })))
  const [libreta, SelectLibretas] = useSelect('Selecciona una libreta', foliosOrigen.filter((e) => e.numero_estanque === Number(tanque)).map(d => { return { code: d.folio_id, name: d.folio_id } }))
  const [libreta2, SelectLibretas2] = useSelect('Selecciona una libreta', foliosOrigen.filter((e) => e.numero_estanque === Number(tanque)).map(d => { return { code: d.folio_id, name: d.folio_id } }))

  useEffect(async () => {
    const { data: { ok, datos } } = await axios(endpointApi + '/api/forms/libretas')
    if (ok) {
      setFoliosOrigen(datos)
    } else {
      // TODO crear error
    }
  }, [])

  useEffect(async () => {
    if (tanque !== '') {
      const { data: { datos } } = await axios(endpointApi + '/api/forms/estanques')
      const nuevoProducto = datos.filter((e) => e.numero_estanque === Number(tanque) && e.planta_id === Number(datosUser.plantaId)).map((e) => e.nombre_producto)
      setNombreProducto(nuevoProducto[0])
    }
  }, [tanque])

  useEffect(async () => {
    if (libreta !== '') {
      const datos = foliosOrigen.find(f => f.folio_id === libreta)
      setFactor6Antes((api60factor6(Number(datos.densidad_laboratorio), Number(datos.temperatura_laboratorio), Number(datos.temperatura_interna_promedio))).factor6)
      const intento = await axios.get(endpointApi + `/api/forms/infoEstanque${datos.planta_id}&${datos.numero_estanque}`)
      if (checkFactor13) {
        const factore13 = await axios.post(endpointApi + '/api/forms/factor13', { api60: datos.api60 })
        setFactor13Antes(factore13.data.fac13[0].factor13)
      }
      if (Number(datos.altura_agua) !== 0) {
        const litrosAguaAntes = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta: datos.planta_id, numeroEstanque: datos.numero_estanque, altura: datos.altura_agua / 10 })
        console.log(litrosAguaAntes)
        if (litrosAguaAntes.data.volumen.length !== 0) {
          setVolAguaAntes(litrosAguaAntes.data.volumen[0].est_volumen)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La libreta Ingresada no contiene Valores Validos, Favor editar',
            showConfirmButton: false
          })
        }
      }
      if (Number(datos.altura_interna) !== 0) {
        const litrosNat = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta: datos.planta_id, numeroEstanque: datos.numero_estanque, altura: datos.altura_interna / 10 })
        // console.log(litrosNat)
        if (litrosNat.data.volumen.length !== 0) {
          setVolNatAntes(litrosNat.data.volumen[0].est_volumen)
          setVolNatAntesSum(litrosNat.data.volumen[0].est_volumen)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La libreta Ingresada no contiene Valores Validos, Favor editar',
            showConfirmButton: false
          })
        }
      } else {
        setVolNatAntes(0)
        setVolNatAntesSum(0)
      }
      const datosEstanque = intento.data.datos[0]

      if(datos.transferencia === true) {
        setOperacion('Transferencia')
      } 
      if(datos.oleoducto === true){
        setOperacion('BT/Oleoducto')
      }
      setHoraAntes(datos.hora)
      setFechaAntes((datos.fecha).slice(0, 10))
      setAlturaInteriorAntes(datos.altura_interna)
      setAlturaAguaAntes(datos.altura_agua)
      setDensLabAntes(datos.densidad_laboratorio)
      setTempLabAntes(datos.temperatura_laboratorio)
      setApi60Antes(datos.api60)
      setFirstMedAntes(datos.primera_medicion)
      setSecondMedAntes(datos.segunda_medicion)
      setThirdMedAntes(datos.tercera_medicion)
      setFourthMedAntes(datos.cuarta_medicion)
      setFifthMedAntes(datos.quinta_medicion)
      setSixthMedAntes(datos.sexta_medicion)
      setManEstAntes(datosEstanque.volumen_manifold_estanque)
      setEstmbbAntes(datosEstanque.volumen_estanque_motobomba)
      setMbbMesaAntes(datosEstanque.volumen_motobomba_mesallenado)
    }
  }, [libreta])

  
  useEffect(async () => {
    if (libreta2 !== '') {
      const datos = foliosOrigen.find(f => f.folio_id === libreta2)
      setFactor6Despues((api60factor6(Number(datos.densidad_laboratorio), Number(datos.temperatura_laboratorio), Number(datos.temperatura_interna_promedio))).factor6)
      const intento = await axios.get(endpointApi + `/api/forms/infoEstanque${datos.planta_id}&${datos.numero_estanque}`)
      if (checkFactor13) {
        const factore13 = await axios.post(endpointApi + '/api/forms/factor13', { api60: datos.api60 })
        setFactor13Despues(factore13.data.fac13[0].factor13)
      }
      const datosEstanque = intento.data.datos[0]
      if (Number(datos.altura_agua) !== 0) {
        const litrosAguaDespues = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta: datos.planta_id, numeroEstanque: datos.numero_estanque, altura: datos.altura_agua / 10 })
        if (litrosAguaDespues.data.volumen.length !== 0) {
          setVolAguaDespues(litrosAguaDespues.data.volumen[0].est_volumen)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La libreta Ingresada no contiene Valores Validos, Favor editar',
            showConfirmButton: false
          })
        }
      }
      if (Number(datos.altura_interna) !== 0) {
        const litrosNat = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta: datos.planta_id, numeroEstanque: datos.numero_estanque, altura: datos.altura_interna / 10 })
        if (litrosNat.data.volumen.length !== 0) {
          setVolNatDespues(litrosNat.data.volumen[0].est_volumen)
          setVolNatDespuesSum(litrosNat.data.volumen[0].est_volumen)
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'La libreta Ingresada no contiene Valores Validos, Favor editar',
            showConfirmButton: false
          })
        }
      } else {
        setVolNatDespues(0)
        setVolNatDespuesSum(0)
      }
      setHoraDespues(datos.hora)
      setFechaDespues((datos.fecha).slice(0, 10))
      setAlturaInteriorDespues(datos.altura_interna)
      setAlturaAguaDespues(datos.altura_agua)
      setDensLabDespues(datos.densidad_laboratorio)
      setTempLabDespues(datos.temperatura_laboratorio)
      setApi60Despues(datos.api60)
      setFirstMedDespues(datos.primera_medicion)
      setSecondMedDespues(datos.segunda_medicion)
      setThirdMedDespues(datos.tercera_medicion)
      setFourthMedDespues(datos.cuarta_medicion)
      setFifthMedDespues(datos.quinta_medicion)
      setSixthMedDespues(datos.sexta_medicion)
      setManEstDespues(datosEstanque.volumen_manifold_estanque)
      setEstmbbDespues(datosEstanque.volumen_estanque_motobomba)
      setMbbMesaDespues(datosEstanque.volumen_motobomba_mesallenado)
    }
  }, [libreta2])
  useEffect(async () => {
    setSexMedFinal((Number(sixthMedDespues) - Number(sixthMedAntes)))
    setQuinMedFinal((Number(fifthMedDespues) - Number(fifthMedAntes)))
    setCuarMedFinal((Number(fourthMedDespues) - Number(fourthMedAntes)))
    setTerMedFinal((Number(thirdMedDespues) - Number(thirdMedAntes)))
    setSecMedFinal((Number(secondMedDespues) - Number(secondMedAntes)))
    setPrimMedFinal((Number(firstMedDespues) - Number(firstMedAntes)))
  }, [firstMedDespues, secondMedDespues, thirdMedDespues, fourthMedDespues, fifthMedDespues, sixthMedDespues])
  useEffect(async () => {
    if (volMedNat) {
      setTotalNat((Number(primMedFinal) + Number(secMedFinal) + Number(terMedFinal) + Number(cuarMedFinal) + Number(quinMedFinal + Number(sexMedFinal))))
    } else {
      setTotalA60((Number(primMedFinal) + Number(secMedFinal) + Number(terMedFinal) + Number(cuarMedFinal) + Number(quinMedFinal) + Number(sexMedFinal)))
    }
  }, [primMedFinal, secMedFinal, terMedFinal, cuarMedFinal, quinMedFinal, sexMedFinal])
  useEffect(async () => {
    if (volMedNat) {
      setTotalA60(Math.round(((Number(totalNat) * Number(factor6Despues)) + Number.EPSILON)))
    } else {
      setTotalNat(Math.round(((Number(totalA60) / Number(factor6Despues)) + Number.EPSILON)))
    }
  }, [totalNat, totalA60])
  useEffect(() => {
    setVolNatAntesSum((Number(volNatAntes) + Number(eMAntesValue) + Number(mEAntesValue) + Number(mMAntesValue) + Number(otrosVolAntes) + Number(dosiVolAntes) + Number(despTechoAntes) - Number(volAguaAntes)))
  }, [eMAntesCheck, mMAntesCheck, mEAntesCheck, otrosVolAntes, dosiVolAntes, despTechoAntes])
  useEffect(() => {
    setVolNatDespuesSum((Number(volNatDespues) + Number(eMDespuesValue) + Number(mEDespuesValue) + Number(mMDespuesValue) + Number(otrosVolDespues) + Number(dosiVolDespues) + Number(despTechoDespues) - Number(volAguaDespues)))
  }, [eMDespuesCheck, mMDespuesCheck, mEDespuesCheck, otrosVolDespues, dosiVolDespues, despTechoDespues])
  useEffect(() => {
    setVolA60Antes((Number(volNatAntesSum) * Number(factor6Antes)))
  }, [volNatAntesSum])
  useEffect(() => {
    if (checkFactor13) {
      setKilosAntes(Math.round(((Number(volA60Antes) * Number(factor13Antes)) + Number.EPSILON)))
    }
  }, [volA60Antes])
  useEffect(() => {
    setVolA60Despues((Math.round((Number(volNatDespuesSum) * Number(factor6Despues)) + Number.EPSILON)))
  }, [volNatDespuesSum])
  useEffect(() => {
    if (checkFactor13) {
      setKilosDespues(Math.round(((Number(volA60Despues) * Number(factor13Despues)) + Number.EPSILON)))
    }
  }, [volA60Despues])
  useEffect(() => {
    setTotalMasEntregasNat(Number(volNatDespuesSum) + Math.round((totalNat + Number.EPSILON)))
  }, [volNatDespuesSum, totalNat])
  useEffect(() => {
    setTotalMasEntregasA60((Math.round((Number(volA60Despues) + Number.EPSILON))) + Math.round((totalA60 + Number.EPSILON)))
  }, [volNatDespuesSum, totalA60])
  useEffect(() => {
    setGranTotalNat(Math.round(Number(totalMasEntregasNat) - Number(volNatAntesSum)))
  }, [totalMasEntregasNat])
  useEffect(() => {
    setGranTotal60(Math.round(Number(totalMasEntregasA60) - Number(volA60Antes)))
  }, [totalMasEntregasA60])
  useEffect(() => {
    setGranTotalKilos(Math.round(Number(totalMasEntregasKilos) - Number(kilosAntes)))
  }, [granTotal60])
  useEffect(() => {
    setTotalMasEntregasKilos(Math.round(Number(totalMasEntregasA60) * Number(factor13Despues)))
  }, [totalMasEntregasA60])
  useEffect(() => {
    setDistEsmax(Number(granTotal60) - Number(distCopec) - Number(distEnex) - Number(distOtros))
  }, [granTotal60, distCopec, distEnex, distOtros])

  return (
    <div className='animate__animated animate__fadeIn'>
      <div className='container contHojaMedida'>
        <p className='folioHoja' style={{ display: 'none' }}>FOLIO {folioFinalHoja}</p>
        <form onSubmit={onSubmit}>
          <fieldset disabled={disFieldSet}>
            <h2 className='tituloHoja'>Hoja Medición</h2>
            <div className='border border-2 p-2 headerHoja'>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabel2'>Estanque N°</span>
                {!disFieldSet &&
                  <div className='select-tanque'>
                    <SelectTanque />
                  </div>}
                {disFieldSet && <input className='form-control text-center' value={tanque} disabled />}
                {/* <div className='valorEstanque' style={{ display: 'none' }}>{tanque}</div> */}
                <span className='input-group-text spanLabel2 spanProduct'>Producto</span>
                <input required disabled className='form-control text-center' value={nombreProducto} aria-label='Username' aria-describedby='basic-addon1' />
                <span className='input-group-text spanLabel2'>Fecha</span>
                <input value={fecha} onChange={(e) => setFecha(e.target.value)} required type='date' className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabel2'>Operación</span>
                <input disabled value={operacion} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                <span className='input-group-text spanLabel2'>Transacción</span>
                <input required value={transaccion} onChange={(e) => setTransaccion(e.target.value)} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                <span className='input-group-text spanLabel2'>Emb</span>
                <input required value={emb} onChange={(e) => setEmb(e.target.value)} className='emb form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end inputCiclo'>
                <span className='input-group-text spanLabel2'>Ciclo</span>
                <input required value={ciclo} onChange={(e) => setCiclo(e.target.value)} className='ciclo form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='d-flex justify-content-evenly contMedidoresHoja'>
                <div className='form-check flex-grow-1 ms-4 mt-2 medidorf13'>
                  <input className='form-check-input' type='checkbox' onChange={() => setCheckFactor13(!checkFactor13)} checked={checkFactor13} value='' id='oleoducto' />
                  <label className='form-check-label labelHojaCheck13' htmlFor='oleoducto'>Factor 13</label>
                </div>
                <div className='form-check me-4 mt-2 medidorn'>
                  <input className='form-check-input' onChange={() => { setVolMeda60(!volMeda60); setVolMedNat(!volMedNat) }} checked={volMedNat} type='checkbox' />
                  <label className='form-check-label labelHojaCheck' htmlFor='trasvasijo'>Medidores Naturales</label>
                </div>
                <div className='form-check me-4 mt-2 medidor60'>
                  <input className='form-check-input' type='checkbox' onChange={() => { setVolMedNat(!volMedNat); setVolMeda60(!volMeda60) }} checked={volMeda60} />
                  <label className='form-check-label labelHojaCheck' htmlFor='recuentoFisico'>Medidores a 60</label>
                </div>
              </div>
            </div>
            <div className='border border-2 p-2 my-2 primeraTabla'>
              <div>
                <div className='contTituloAntes'>
                  <h3 className='tituloAntes'>Antes</h3>
                </div>
                {(tanque && !disFieldSet) &&
                  <div className='selectHoja'>
                    <SelectLibretas />
                  </div>}
                {/* {libreta !== '' &&
              <div className='form-check flex-grow-1 mb-2'>
                <label className='form-check-label' htmlFor='oleoducto'>Estanque Vacio</label>
                <input className='form-check-input' type='checkbox' onChange={() => setEstanqueVacioAntes(!estanqueVacioAntes)} checked={estanqueVacioAntes} id='oleoducto' />
              </div>} */}

                <div className='row tablaAntes'>
                  <div className='col-6'>
                    {disFieldSet &&
                      <div className='input-group d-flex justify-content-end'>
                        <span className='input-group-text spanLabel3'>Libreta</span>
                        <input value={libreta} disabled className='form-control' aria-label='Username' aria-describedby='basic-addon1' />
                      </div>}
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel3 labelfechaAntes'>Fecha</span>
                      <input value={fechaAntes} disabled className='form-control fechaAntes' aria-label='Username' aria-describedby='basic-addon1' />
                      <span className='input-group-text spanLabel3 labelHora'>Hora</span>
                      <input value={horaAntes} disabled className='form-control' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Vacio Estanque</span>
                      <input disabled value={alturaInteriorAntes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Nivel Agua</span>
                      <input disabled value={alturaAguaAntes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Densidad Laboratorio</span>
                      <input disabled value={densLabAntes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Temperatura Laboratorio</span>
                      <input disabled value={tempLabAntes} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Desplazamiento Techo</span>
                      <input value={despTechoAntes} onChange={(e) => setDespTechoAntes(e.target.value)} type='number' className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel '>Manifold a Estanque<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setMEAntesCheck(!mEAntesCheck); setMEAntesValue(!mEAntesCheck ? manEstAntes : 0) }} checked={mEAntesCheck} type='checkbox' value='' /></span>
                      <input disabled value={mEAntesCheck ? manEstAntes : 0} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end '>
                      <span className='input-group-text spanLabel'>Estanque a MBB<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setEMAntesCheck(!eMAntesCheck); setEMAntesValue(!eMAntesCheck ? estMbbAntes : 0) }} checked={eMAntesCheck} type='checkbox' value='' /></span>
                      <input disabled value={eMAntesCheck ? estMbbAntes : 0} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>MBB a MesaLlenadora<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setMMAntesCheck(!mMAntesCheck); setMMAntesValue(!mMAntesCheck ? mbbMesaAntes : 0) }} checked={mMAntesCheck} type='checkbox' value='' /></span>
                      <input disabled value={mMAntesCheck ? mbbMesaAntes : 0} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Otros</span>
                      <input value={otrosVolAntes} type='number' onChange={(e) => setOtrosVolAntes(e.target.value)} className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Dosificacion(Otros2)</span>
                      <input value={dosiVolAntes} type='number' onChange={(e) => setDosiVolAntes(e.target.value)} className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Volumen Agua</span>
                      <input disabled value={volAguaAntes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>API a 60°F</span>
                      <input disabled value={api60Antes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Factor 6</span>
                      <input disabled value={factor6Antes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Peso de un Litro (T13)</span>
                      <input disabled value={factor13Antes} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                  </div>
                  <div className='col-6 d-flex flex-column  justify-content-between tablaVolumenes'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center' colSpan='3'>Volumen Según Tabla de Calibración</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-center' colSpan='3'>{volNatAntes && addPuntos(volNatAntes)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center' colSpan='3'>Volumen Corregido Nat</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-center' colSpan='3'>{volNatAntes && addPuntos(volNatAntesSum)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center tituloMedidoresHoja' colSpan='3'>Volumen Final</th>
                        </tr>
                        <tr>
                          <th scope='col'>Litros Naturales</th>
                          <th scope='col'>Litros a 60°F</th>
                          <th scope='col'>Kilos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{volNatAntesSum ? addPuntos(volNatAntesSum) : 0}</td>
                          <td>{(volA60Antes && factor6Antes) && addPuntos((Math.round((Number(volA60Antes) + Number.EPSILON)) * 10) / 10)}</td>
                          <td>{factor13Antes && addPuntos(kilosAntes)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='border border-2 p-2 my-2 tablaDespues'>
              <div>
                <div className='contTituloDespues'>
                  <h3 className='tituloDespues'>Despues</h3>
                </div>

                {(libreta !== '' && !disFieldSet) &&
                  <div className='selectHoja'>
                    <SelectLibretas2 />
                  </div>}
                {/* {libreta2 !== '' &&
              <div className='form-check flex-grow-1 mb-2'>
                <label className='form-check-label' htmlFor='oleoducto'>Estanque Vacio</label>
                <input className='form-check-input' onChange={() => setEstanqueVacioDespues(!estanqueVacioDespues)} type='checkbox' checked={estanqueVacioDespues} id='oleoducto' />
              </div>} */}
                <div className='row'>
                  <div className='col-6'>
                    {disFieldSet &&
                      <div className='input-group d-flex justify-content-end'>
                        <span className='input-group-text spanLabel3'>Libreta</span>
                        <input value={libreta2} disabled className='form-control' aria-label='Username' aria-describedby='basic-addon1' />
                      </div>}
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel3 labelfechaDespues'>Fecha</span>
                      <input value={fechaDespues} disabled className='form-control fechaDespues' aria-label='Username' aria-describedby='basic-addon1' />
                      <span className='input-group-text spanLabel3'>Hora</span>
                      <input value={horaDespues} disabled className='form-control' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Vacío Estanque</span>
                      <input disabled value={alturaInteriorDespues} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Nivel Agua</span>
                      <input disabled value={alturaAguaDespues} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Densidad Laboratorio</span>
                      <input disabled value={densLabDespues} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Temperatura Laboratorio</span>
                      <input disabled value={tempLabDespues} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Desplazamiento Techo</span>
                      <input type='number' value={despTechoDespues} onChange={(e) => setDespTechoDespues(e.target.value)} className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Manifold a Estanque<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setMEDespuesCheck(!mEDespuesCheck); setMEDespuesValue(!mEDespuesCheck ? manEstDespues : 0) }} checked={mEDespuesCheck} type='checkbox' value='' /></span>
                      <input disabled value={mEDespuesCheck ? manEstDespues : 0} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Estanque a MBB<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setEMDespuesCheck(!eMDespuesCheck); setEMDespuesValue(!eMDespuesCheck ? estMbbDespues : 0) }} checked={eMDespuesCheck} type='checkbox' value='' /></span>
                      <input disabled value={eMDespuesCheck ? estMbbDespues : 0} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>MBB a MesaLlenadora<input className='form-check-input ms-3 mb-1 checkLineas' onChange={() => { setMMDespuesCheck(!mMDespuesCheck); setMMDespuesValue(!mMDespuesCheck ? mbbMesaDespues : 0) }} checked={mMDespuesCheck} type='checkbox' value='' /></span>
                      <input disabled value={mMDespuesCheck ? mbbMesaDespues : 0} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Otros</span>
                      <input type='number' value={otrosVolDespues} onChange={(e) => setOtrosVolDespues(e.target.value)} className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Dosificacion(Otros2)</span>
                      <input type='number' value={dosiVolDespues} onChange={(e) => setDosiVolDespues(e.target.value)} className='form-control text-center textoConMargen' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <br />
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Volumen Agua</span>
                      <input disabled value={volAguaDespues} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>API a 60°F</span>
                      <input disabled value={api60Despues} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Factor 6</span>
                      <input disabled value={factor6Despues} className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                    <div className='input-group d-flex justify-content-end'>
                      <span className='input-group-text spanLabel'>Peso de un Litro (T13)</span>
                      <input disabled value={factor13Despues} required className='form-control text-center' aria-label='Username' aria-describedby='basic-addon1' />
                    </div>
                  </div>
                  <div className='col-6 d-flex flex-column  justify-content-between tablaVolumenes'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center' colSpan='3'>Volumen Según Tabla de Calibración</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-center' colSpan='3'>{volNatDespues && addPuntos(volNatDespuesSum)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center' colSpan='3'>Volumen Corregidos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-center' colSpan='3'>{volNatDespues && addPuntos(volNatDespuesSum)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th className='text-center' colSpan='3'>Volumen Final</th>
                        </tr>
                        <tr>
                          <th scope='col'>Litros Naturales</th>
                          <th scope='col'>Litros a 60°F</th>
                          <th scope='col'>Kilos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{volNatDespues && addPuntos(volNatDespuesSum)}</td>
                          <td>{(volA60Despues && factor6Despues) && addPuntos(volA60Despues)}</td>
                          <td>{factor13Despues && addPuntos(kilosDespues)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>
            <div className='tablaTotalNeto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th className='text-center' colSpan='4'>TOTAL NETO MAS ENTREGAS</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <th>Litros Naturales</th>
                    <th>Litros a 60°</th>
                    <th>Kilos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Final Volumen</th>
                    <td>{volNatDespues && addPuntos(volNatDespuesSum)}</td>
                    <td>{(volA60Despues && factor6Despues) && addPuntos(Number(volA60Despues))}</td>
                    <td>{factor13Despues && addPuntos(kilosDespues)}</td>
                  </tr>
                  <tr>
                    <th>Entregas Directas</th>
                    <td>{!isNaN(totalNat) ? addPuntos(Math.round((totalNat + Number.EPSILON))) : 0}</td>
                    <td>{totalA60 === 0 ? 0 : addPuntos(totalA60)}</td>
                    <td>{checkFactor13 ? addPuntos(Math.round(Number(totalMasEntregasKilos) - Number(kilosDespues))) : 0}</td>
                  </tr>
                  <tr>
                    <th>Total Neto Mas Entregas</th>
                    <td>{volNatDespues !== 0 ? addPuntos(totalMasEntregasNat) : 0}</td>
                    <td>{(volA60Despues && factor6Despues) && addPuntos(totalMasEntregasA60)}</td>
                    <td>{checkFactor13 ? (volA60Despues && factor13Despues) && addPuntos(totalMasEntregasKilos) : 0}</td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th>Gran Total Recibido/Entregado</th>
                    <th>{addPuntos(granTotalNat)}</th>
                    <th>{addPuntos(granTotal60)}</th>
                    <th>{checkFactor13 ? addPuntos(granTotalKilos) : 0}</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className='border border-2 p-2 my-2 contVolFinal'>
              <div className='row'>
                <div className='col-6 medidoresHoja'>
                  <table className='table tablaVolFinal'>
                    <thead>
                      <tr>
                        <th className='text-center' colSpan='6'>Volumen Final</th>
                      </tr>
                      <tr>
                        <th scope='col medidaVol'>Inicial 1</th>
                        <th scope='col'>Inicial 2</th>
                        <th scope='col'>Inicial 3</th>
                        <th scope='col'>Inicial 4</th>
                        <th scope='col'>Inicial 5</th>
                        <th scope='col'>Inicial 6</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{firstMedAntes && addPuntos(firstMedAntes)}</td>
                        <td>{secondMedAntes && addPuntos(secondMedAntes)}</td>
                        <td>{thirdMedAntes && addPuntos(thirdMedAntes)}</td>
                        <td>{fourthMedAntes && addPuntos(fourthMedAntes)}</td>
                        <td>{fifthMedAntes && addPuntos(fifthMedAntes)}</td>
                        <td>{sixthMedAntes && addPuntos(sixthMedAntes)}</td>
                      </tr>
                      <tr className='border-bottom'>
                        <th scope='col'>Final 1</th>
                        <th scope='col'>Final 2</th>
                        <th scope='col'>Final 3</th>
                        <th scope='col'>Final 4</th>
                        <th scope='col'>Final 5</th>
                        <th scope='col'>Final 6</th>
                      </tr>
                      <tr>
                        <td>{firstMedDespues && addPuntos(firstMedDespues)}</td>
                        <td>{secondMedDespues && addPuntos(secondMedDespues)}</td>
                        <td>{thirdMedDespues && addPuntos(thirdMedDespues)}</td>
                        <td>{fourthMedDespues && addPuntos(fourthMedDespues)}</td>
                        <td>{fifthMedDespues && addPuntos(fifthMedDespues)}</td>
                        <td>{sixthMedDespues && addPuntos(sixthMedDespues)}</td>
                      </tr>
                      <tr className='border-bottom'>
                        <th scope='col'>Salido 1</th>
                        <th scope='col'>Salido 2</th>
                        <th scope='col'>Salido 3</th>
                        <th scope='col'>Salido 4</th>
                        <th scope='col'>Salido 5</th>
                        <th scope='col'>Salido 6</th>
                      </tr>
                      <tr>
                        <td>{primMedFinal !== 0 ? addPuntos(primMedFinal) : 0}</td>
                        <td>{secMedFinal !== 0 ? addPuntos(secMedFinal) : 0}</td>
                        <td>{terMedFinal !== 0 ? addPuntos(terMedFinal) : 0}</td>
                        <td>{cuarMedFinal !== 0 ? addPuntos(cuarMedFinal) : 0}</td>
                        <td>{quinMedFinal !== 0 ? addPuntos(quinMedFinal) : 0}</td>
                        <td>{sexMedFinal !== 0 ? addPuntos(sexMedFinal) : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='col-12 col-xl-6 contDistribucionHoja'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th className='text-center' colSpan='4'>DISTRIBUCION</th>
                      </tr>
                      <tr>
                        <th>#</th>
                        <th>Litros Naturales</th>
                        <th>Litros a 60°F</th>
                        <th>Kilos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>ESMAX (01)</td>
                        <td>{distEsmax !== 0 ? Math.round(Number(granTotalNat) - Math.round(Number(distEnex) / Number(factor6Despues)) - Math.round(Number(distCopec) / Number(factor6Despues)) - Math.round(Number(distOtros) / Number(factor6Despues))) : 0}</td>
                        <td><input disabled value={distEsmax} type='number' /></td>
                        <td>{distEsmax !== 0 && checkFactor13 ? Math.round(Number(granTotalKilos) - Math.round(Number(distEnex) * Number(factor13Despues)) - Math.round(Number(distCopec) * Number(factor13Despues)) - Math.round(Number(distOtros) * Number(factor13Despues))) : 0}</td>
                      </tr>
                      <tr>
                        <td>ENEX (10)</td>
                        <td>{distEnex !== 0 ? Math.round(Number(distEnex) / Number(factor6Despues)) : 0}</td>
                        <td><input value={distEnex} onChange={(e) => setDistEnex(e.target.value)} type='number' /></td>
                        <td>{distEnex !== 0 && checkFactor13 ? Math.round(Number(distEnex) * Number(factor13Despues)) : 0}</td>
                      </tr>
                      <tr>
                        <td>COPEC (10)</td>
                        <td>{distCopec !== 0 ? Math.round(Number(distCopec) / Number(factor6Despues)) : 0}</td>
                        <td><input value={distCopec} onChange={(e) => setDistCopec(e.target.value)} type='number' /></td>
                        <td>{distCopec !== 0 && checkFactor13 ? Math.round(Number(distCopec) * Number(factor13Despues)) : 0}</td>
                      </tr>
                      <tr>
                        <td>OTROS</td>
                        <td>{distOtros !== 0 ? Math.round(Number(distOtros) / Number(factor6Despues)) : 0}</td>
                        <td><input value={distOtros} onChange={(e) => setDistOtros(e.target.value)} type='number' /></td>
                        <td>{distOtros !== 0 && checkFactor13 ? Math.round(Number(distOtros) * Number(factor13Despues)) : 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='input-group observaciones'>
              <span className='input-group-text'>Observaciones</span>
              <textarea value={observacion} onChange={(e) => setObservacion(e.target.value)} className='form-control' aria-label='With textarea' />
            </div>
            <div className='row d-flex justify-content-center'>
              {!disFieldSet &&
                <div className='col-12 mb-2'>
                  <button className='btns mt-4 btnTabla5b' type='submit'>Guardar</button>
                </div>}

              <div className='firmaHoja'><p style={{ display: 'none' }} className='parrafoFirma1'>ESMAX CHILE DISTRIBUCION</p></div>
              <div className='firmaHoja'><p style={{ display: 'none' }} className='parrafoFirma2'>OPERACIÓN PLANTA A.E.G.G</p></div>

            </div>
          </fieldset>
        </form>
        {disFieldSet &&
          <div className='container'>
            <div className='container d-flex justify-content-center'>
              <button type='button' className='btns m-4 btnPrint' onClick={() => window.print()}>Generar reporte<i class='ms-2 fas fa-download' /></button>
            </div>
            <div className='container d-flex justify-content-center'>
              <button type='button' className='btns m-4 btnPrint' onClick={() => window.location.reload()}>Generar Nueva Hoja de Medida<i class='ms-2 fas fa-download' /></button>
            </div>
          </div>}
      </div>
    </div>
  )
}
