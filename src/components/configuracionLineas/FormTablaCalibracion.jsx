/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { number } from 'yup'
import axios from 'axios'
import { calcKilos, volumen60 } from '../../helpers/formulasApi60'
import { endpointApi } from '../../helpers/variableApi'
import { addPuntos } from '../../helpers/addPuntos'

export const FormTablaCalibracion = ({ idPlanta, numeroEstanque, factor6, factor13, rango }) => {
  const [rangoFinal, setRangoFinal] = useState([])

  const schema = yup.object({
    altura: number().typeError('Campo requerido').min(rangoFinal[0] * 10, `Rango debe estar entre ${rangoFinal[0] * 10} y ${rangoFinal[1] * 10}`).max(rangoFinal[1] * 10, `Rango debe estar entre ${rangoFinal[0] * 10} y ${rangoFinal[1] * 10}`)
  }).required()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const [volumen, setVolumen] = useState('- -')
  const [volumenA60, setVolumenA60] = useState('- -')
  const [kilos, setKilos] = useState('- -')
  const [alturaInit, setAlturaInit] = useState()
  const [submitHecho, setSubmitHecho] = useState(false)

  useEffect(() => {
    setRangoFinal(Object.values(rango[0])[0])
  }, [rango])

  useEffect(async () => {
    if (submitHecho) {
      const { data: { volumen } } = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta, numeroEstanque, altura: alturaInit / 10 })
      const { est_volumen } = volumen[0]
      setVolumen(est_volumen)
      // calculos vol60 y kilos
      setVolumenA60(volumen60(est_volumen, factor6))
      setKilos(calcKilos(est_volumen, factor6, factor13))
    }
  }, [factor6, factor13])

  const onSubmit = async datos => {
    setSubmitHecho(true)
    const { altura } = datos
    setAlturaInit(altura)
    const { data: { volumen } } = await axios.post(endpointApi + '/api/forms/volumen', { idPlanta, numeroEstanque, altura: altura / 10 })
    const { est_volumen } = volumen[0]
    setVolumen(est_volumen)
    // calculos vol60 y kilos
    setVolumenA60(volumen60(est_volumen, factor6))
    setKilos(calcKilos(est_volumen, factor6, factor13))
  }
  return (
    <>
      <h2 className='tituloLineas mt-5'>Tabla de calibracion estanques plantas</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row ms-4 mt-5'>
          <div className='col-6'>
            {/* ALTURA */}
            <div className='col-12 row'> <div className='col-6'><h5>ALTURA (mm)</h5></div>
              <div className='col-6'><input {...register('altura')} className='input5B alt form-control' type='number' />
                <p className='error'>{errors.altura?.message}</p>
              </div>
            </div>

            {/* boton */}
            <div className='col-12 row'> <div className='col-6'><h5 /></div>
              <div className='col-6'> <button className='btn btns mt-4 btnTabla5b' type='submit'>Calcular</button></div>
            </div>
          </div>
          {/* linea vertical */}
          <div className='col-1'><div className='vr' /></div>
          <div className='col-5'>
            <div className='col-12 row'><div className='col-6'><h5>VOLUMEN</h5></div>
              <div className='col-6'>{addPuntos(volumen)}</div>
            </div>
            <div className='col-12 mt-4 row'><div className='col-6'><h5>VOLUMEN A 60</h5></div>
              <div className='col-6'>{!isNaN(volumenA60) ? addPuntos(volumenA60) : '- -'}</div>
            </div>
            <div className='col-12 mt-4 row'><div className='col-6'><h5>KILOS</h5></div>
              <div className='col-6'>{!isNaN(kilos) ? addPuntos(kilos) : '- -'}</div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
