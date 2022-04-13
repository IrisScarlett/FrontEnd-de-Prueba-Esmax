/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { api60factor6 } from '../../helpers/formulasApi60'
import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'
import { addPuntos } from '../../helpers/addPuntos'

export default function DatosRF ({
  datosLibreta, estanque, planta, fecha, nombreProducto, estVolumen, setEstVolumen, rellenarDatos, setRellenarDatos,
  alturaInterna, setAlturaInterna, api60Factor6, setApi60Factor6, factor13, setFactor13, valorCierre, setValorCierre,
  volumenCanerias, setVolumenCanerias, volFinalMedidores, setVolFinalMedidores, volumenAgua, setVolumenAgua,
  valorOtros, setValorOtros, volNaturalInicial, setVolNaturalInicial, vol60, setVol60, volumenKilos, setVolumenKilos,
  observaciones, setObservaciones
}) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  const [volMedidores1, setVolumenMedidores] = useState()
  // eslint-disable-next-line no-unused-vars
  const [volNatural, setVolumenNatural] = useState()
  const [checkCanerias, setCheckCanerias] = useState(true)
  const [checkMedidores, setCheckMedidores] = useState(true)
  const [checkAgua, setCheckAgua] = useState(true)

  const [checkFactor13, setCheckFactor13] = useState(false)

  const handleObservaciones = (e) => {
    setObservaciones({
      ...observaciones,
      [e.target.name]: e.target.value

    })
  }

  const handleInput = (e) => {
    setValorCierre({
      ...valorCierre,
      [e.target.name]: e.target.value
    })
    setValorOtros({
      ...valorOtros,
      [e.target.name]: e.target.value
    })
  }
  const handleCheckBoxAgua = (e) => {
    setCheckAgua({
      checked: e.target.checked
    })
  }
  const handleCheckBoxCanerias = (e) => {
    setCheckCanerias({
      checked: e.target.checked
    })
  }
  const handleCheckBoxMedidores = (e) => {
    setCheckMedidores({
      checked: e.target.checked
    })
  }
  const handleCheckBoxFactor13 = (e) => {
    setCheckFactor13({
      checked: e.target.checked
    })
  }

  useEffect(() => {
    // & Al cambiar el estanque todo se vacie
    setRellenarDatos({
      hora: '',
      densidadObservada: 0,
      temperaturaObsrvada: 0,
      temperaturaInferior: 0,
      temperatura: 0,
      factorPared: 0
    })
  }, [estanque])

  useEffect(() => {
    setApi60Factor6(api60factor6(Number(datosLibreta?.densidad_laboratorio), Number(datosLibreta?.temperatura_laboratorio), Number(datosLibreta?.temperatura_interna_promedio)))
    // & RELLENANDO DATOS
    setRellenarDatos({
      hora: datosLibreta?.hora,
      densidadObservada: datosLibreta?.densidad_laboratorio,
      temperaturaObsrvada: datosLibreta?.temperatura_laboratorio,
      temperaturaInferior: datosLibreta?.temperatura_interna_promedio,
      temperatura: 60,
      factorPared: 1.0000000
    })
  }, [datosLibreta])

  useEffect(() => {
    setFactor13(datosLibreta?.factor13)
    if (nombreProducto.nombreProd !== 'FUEL OIL N. 6') {
      setFactor13(0)
    }
  }, [datosLibreta, nombreProducto])

  useEffect(() => {
    setVol60(volNaturalInicial * api60Factor6.factor6)
  }, [volNaturalInicial])

  useEffect(async () => {
    // & Vaciar el input de volumen agua si el checkbox esta activado
    if (estanque !== '' && planta !== '') {
      const { data: { datos } } = await axios.get(endpointApi + `/api/forms/infoCalibracion${planta}&${estanque}&${(parseInt(datosLibreta?.altura_agua) / 10)}`)
      if (checkAgua.checked === false) {
        setVolumenAgua(0)
      } else {
        if (fecha !== '') {
          setVolumenAgua(parseInt(datos[0].est_volumen))
        }
      }
    }
  }, [checkAgua])

  useEffect(() => {
    setVolNaturalInicial((parseInt(volumenCanerias) + parseInt(estVolumen) + parseInt(volFinalMedidores) - parseInt(volumenAgua)))
  }, [volumenCanerias, estVolumen, volFinalMedidores, volumenAgua])

  useEffect(() => {
    setVolumenCanerias(parseInt(datosLibreta?.volumen_total_linea))
    setVolFinalMedidores(volMedidores1)
  }, [datosLibreta, volMedidores1, valorCierre])

  useEffect(() => {
    // & Modificar volumenes si el checkbox  de factor13 esta activado
    if (checkFactor13.checked === true) {
      setVolumenKilos(volNaturalInicial * api60Factor6.factor6 * factor13)
    } else if (checkFactor13.checked === false) {
      setVolumenKilos(0)
    }
  }, [factor13, datosLibreta, checkFactor13, volNaturalInicial])

  useEffect(() => {
    // & Vaciar el input de cañerias si el checkbox esta activado
    if (checkCanerias.checked === false) {
      setVolumenCanerias(0)
      setVolumenNatural(parseInt(estVolumen) + parseInt(volFinalMedidores) + parseInt(valorOtros?.nombreVolOtros))
    } else if (checkCanerias.checked === true) {
      setVolumenCanerias(parseInt(datosLibreta?.volumen_total_linea))
      setVolumenNatural(parseInt(valorOtros?.nombreVolOtros) + volNaturalInicial)
    }
  }, [checkCanerias, alturaInterna, datosLibreta])

  useEffect(() => {
    const sumaCierres1 = parseInt(valorCierre?.cierre1) + parseInt(valorCierre?.cierre2) + parseInt(valorCierre?.cierre3) + parseInt(valorCierre?.cierre4) + parseInt(valorCierre?.cierre5) + parseInt(valorCierre?.cierre6)
    setVolFinalMedidores(volMedidores1 - sumaCierres1)
    // & Vaciar el input de medidores si el checkbox esta activado
    if (checkMedidores.checked === false) {
      setVolFinalMedidores(0)
      setVolumenNatural(parseInt(estVolumen) + parseInt(datosLibreta?.volumen_total_linea) + parseInt(valorOtros?.nombreVolOtros))
    } else if (checkMedidores.checked === true) {
      setVolFinalMedidores(volMedidores1 - sumaCierres1)
      setVolumenNatural(parseInt(valorOtros?.nombreVolOtros) + volNaturalInicial)
    }
  }, [valorCierre, checkMedidores])

  useEffect(async () => {
    if (fecha !== '') {
      const { data: { datos } } = await axios.get(endpointApi + `/api/forms/infoCalibracion${planta}&${estanque}&${(parseInt(datosLibreta?.altura_interna) / 10)}`)
      setEstVolumen(datos[0]?.est_volumen)
    }
    setVolumenMedidores(
      parseInt(datosLibreta?.primera_medicion) +
    parseInt(datosLibreta?.segunda_medicion) +
    parseInt(datosLibreta?.tercera_medicion) +
    parseInt(datosLibreta?.cuarta_medicion) +
    parseInt(datosLibreta?.quinta_medicion) +
    parseInt(datosLibreta?.sexta_medicion))

    setAlturaInterna(datosLibreta?.altura_interna)
  }, [fecha, datosLibreta])

  useEffect(() => {
    setVolNaturalInicial(parseInt(datosLibreta?.volumen_total_linea) + parseInt(estVolumen) + parseInt(volFinalMedidores) + parseInt(valorOtros?.nombreVolOtros))
  }, [valorOtros])

  return (
    <div className='row mb-3'>
      <div className='col-3 border border-secundary border rounded   '>

        <div className='input-group d-flex justify-content-end mt-2'>
          <span className='input-group-text spanLabelRF1'>Hora</span>
          <input disabled className='form-control text-center' name='hora' value={rellenarDatos.hora} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>Altura Externa</span>
          <input disabled className='form-control text-center' name='altura_externa' value={!isNaN(addPuntos(parseInt(datosLibreta?.altura_externa))) ? addPuntos(parseInt(datosLibreta?.altura_externa)) : 0} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>Altura Interna</span>
          <input disabled className='form-control text-center' value={!isNaN(addPuntos(parseInt(alturaInterna))) ? addPuntos(parseInt(alturaInterna)) : 0} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>Nivel de agua</span>
          <input disabled className='form-control text-center' value={!isNaN(addPuntos(parseInt(datosLibreta?.altura_agua))) ? addPuntos(parseInt(datosLibreta?.altura_agua)) : 0} aria-label='Username' aria-describedby='basic-addon1' />
          <div className='checkBoxsDatos'>
            <Checkbox {...label} defaultChecked={false} onChange={handleCheckBoxAgua} />
          </div>
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>D Obs / T° Obs</span>
          <input disabled className='form-control text-center' name='densidadObservada' value={rellenarDatos?.densidadObservada} aria-label='Username' aria-describedby='basic-addon1' />
          <input disabled className='form-control text-center' name='temperaturaObservada' value={rellenarDatos?.temperaturaObsrvada} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>T° Inferior</span>
          <input disabled className='form-control text-center' value={rellenarDatos?.temperaturaInferior} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className=' input-group d-flex justify-content-end'>

          <span className='input-group-text spanLabelRF1'>T° / Factor Pared</span>
          <input disabled className=' form-control text-center pe-2 ps-2 ' value={rellenarDatos?.temperatura} aria-label='Username' aria-describedby='basic-addon1' />
          <input disabled className=' form-control text-center ' value={rellenarDatos?.factorPared.toFixed(6)} aria-label='Username' aria-describedby='basic-addon1' />

        </div>

        <br />

        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>Api a 60</span>
          <input disabled className='form-control text-center' value={isNaN(api60Factor6.api60) ? '' : (api60Factor6.api60)} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF1'>Factor T 6</span>
          <input disabled className='form-control text-center' value={isNaN(api60Factor6.factor6) ? '' : (api60Factor6.factor6)} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end mb-3'>
          <span className='input-group-text spanLabelRF1'>Factor 13</span>
          <input disabled className='form-control text-center' value={factor13} name='factor13' aria-label='Username' aria-describedby='basic-addon1' />
          <div className='checkBoxsDatos'>
            <Checkbox {...label} defaultChecked={false} name='checkFactor13' onChange={handleCheckBoxFactor13} />
          </div>
        </div>

      </div>

      <div className='col-5 border-secundary border border-right-0 rounded '>

        <div className='input-group d-flex justify-content-end mt-2 mb-3'>
          <span className='input-group-text spanLabelRF4 p-3'>Medidores Asociados a este Estanque</span>
          <div className='checkBoxsDatos'>
            <Checkbox {...label} defaultChecked className='checkEspecial p-3' onChange={handleCheckBoxMedidores} />
          </div>

        </div>

        <div className='row'>

          <div className='col-6'>

            <span className='input-group-text spanLabelRF3 text-center'>Medición</span>

            <div className='row mt-1'>

              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>1</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.primera_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>2</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.segunda_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>3</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.tercera_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>4</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.cuarta_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>5</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.quinta_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>

              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>6</span>
                <input disabled className='form-control text-center' value={addPuntos(parseInt(datosLibreta?.sexta_medicion))} aria-label='Username' aria-describedby='basic-addon1' />
              </div>

            </div>

          </div>

          <div className='col-6'>

            <span className='input-group-text spanLabelRF3'>Cierre</span>

            <div className='row mt-1'>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF '>1</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre1} className='form-control text-center' name='cierre1' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>2</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre2} className='form-control text-center' name='cierre2' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>3</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre3} className='form-control text-center' name='cierre3' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>4</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre4} className='form-control text-center' name='cierre4' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>5</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre5} className='form-control text-center' name='cierre5' />
              </div>
              <div className='input-group d-flex justify-content-end'>
                <span className='input-group-text spanLabelRF'>6</span>
                <input required type='number' aria-label='First name' onChange={handleInput} value={valorCierre.cierre6} className='form-control text-center' name='cierre6' />
              </div>

            </div>

          </div>

        </div>

        <p className='fst-italic text-danger text-center mt-4' style={{ fontSize: '14px' }}>Recuerde: Solo una asociación por producto</p>

      </div>

      <div className='col-4 border border-secundary border rounded '>

        <div className='input-group d-flex justify-content-end mt-2'>
          <span className='input-group-text spanLabelRF2'>Volumen Cañerias</span>
          <input disabled name='volumenCanerias' className='form-control text-center' value={addPuntos(volumenCanerias)} aria-label='Username' aria-describedby='basic-addon1' />
          <div className='checkBoxsDatos'>
            <Checkbox {...label} defaultChecked onChange={handleCheckBoxCanerias} className='checkCanerias' name='checkCanerias' value={checkCanerias} />
          </div>

        </div>

        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Medidores</span>
          <input disabled className='form-control text-center' value={addPuntos(parseInt(volFinalMedidores))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Estanque</span>
          <input disabled className='form-control text-center' value={addPuntos(parseInt(estVolumen))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Agua</span>
          <input disabled className='form-control text-center' value={addPuntos(parseInt(volumenAgua))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Otros</span>
          <input required type='number' aria-label='First name' onChange={handleInput} value={valorOtros.nombreVolOtros} className='form-control inputOtrosRF' name='nombreVolOtros' />
        </div>

        <br />

        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Natural</span>
          <input disabled className='form-control text-center' value={addPuntos(parseInt(volNaturalInicial))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen 60°F</span>
          <input disabled className='form-control text-center' value={addPuntos(parseInt(vol60?.toFixed(0)))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>
        <div className='input-group d-flex justify-content-end'>
          <span className='input-group-text spanLabelRF2'>Volumen Kilos</span>
          <input disabled className='form-control text-center' value={factor13 === 0 ? 0 : addPuntos(parseInt(volumenKilos))} aria-label='Username' aria-describedby='basic-addon1' />
        </div>

        <br />

        <div className='input-group d-flex justify-content-end mb-3'>
          <span className='input-group-text spanLabelRF3 w-100'>Observaciones</span>
          <input required onChange={handleObservaciones} type='text' style={{ width: '200px' }} aria-label='First name' name='observaciones1' className='form-control text-align inputObsRF' />
        </div>
      </div>

    </div>

  )
}
