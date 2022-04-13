import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { number } from 'yup'
import { api60factor6 } from '../../helpers/formulasApi60'
import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'

const schema = yup.object({
  apiObs: number().typeError('Campo requerido').min(0.1, 'Valor debe estar entre 0.1 y 84.9').max(84.9, 'Valor debe estar entre 0.1 y 84.9'),
  tempObs: number().typeError('Campo requerido').min(0.1, 'Valor debe estar entre 0.1 y 200').max(200, 'Valor debe estar entre 0.1 y 200')

}).required()

export const FormApi60 = ({ setFactor6, setFactor13, factor13, factor6, setDisabledCalibracion }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const [tempInt, settempInt] = useState(60)
  const [api60, setApi60] = useState('- -')
  const onSubmit = async datos => {
    const { apiObs, tempObs } = datos
    const { factor6, api60 } = api60factor6(apiObs, tempObs, tempInt)
    const { data: { fac13 } } = await axios.post(endpointApi + '/api/forms/factor13', { api60 })
    const { factor13 } = fac13[0]
    setFactor13(factor13)
    setFactor6(factor6)
    setApi60(api60)
    setDisabledCalibracion(false)
  }
  return (
    <>
      <h2 className='tituloLineas'>Tabla 5B y 6B ASTM D 1250-80</h2>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row ms-4 mt-5'>
          <div className='col-6'>
            {/* API OBS */}
            <div className='col-12 row'> <div className='col-6'><h5>DENSIDAD OBS.</h5></div>
              <div className='col-6'><input {...register('apiObs')} step='any' className='input5B dens form-control' type='number' />
                <p className='error'>{errors.apiObs?.message}</p>
              </div>
            </div>
            {/* TEMP OBS */}
            <div className='col-12 row mt-4'>
              <div className='col-6'><h5>TEMP. OBS.</h5></div>
              <div className='col-6'><input {...register('tempObs')} step='any' className='input5B tempO form-control' type='number' />
                <p className='error'>{errors.tempObs?.message}</p>
              </div>
            </div>
            {/* TEMP INT */}
            <div className='col-12 row mt-4'> <div className='col-6'><h5>TEMP. INT.</h5></div>
              <div className='col-6'><input value={tempInt} onChange={e => settempInt(e.target.value)} step='any' className='input5B tempI form-control' type='number' />
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
            <div className='col-12 row'><div className='col-6'><h5>API 60</h5></div>
              <div className='col-6'>{api60.replace('.', ',')}</div>
            </div>
            <div className='col-12 mt-4 row'><div className='col-6'><h5>FACTOR T6</h5></div>
              <div className='col-6'>{factor6.replace('.', ',')}</div>
            </div>
            <div className='col-12 mt-4 row'><div className='col-6'><h5>FACTOR T13</h5></div>
              <div className='col-6'>{factor13.replace('.', ',')}</div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
