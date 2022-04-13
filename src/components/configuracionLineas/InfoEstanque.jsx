import React, { useState } from 'react'
import { FormApi60 } from './FormApi60'
import { FormTablaCalibracion } from './FormTablaCalibracion'

export const InfoEstanque = ({ idPlanta, numeroEstanque, rango }) => {
  const [factor6, setFactor6] = useState('--')
  const [factor13, setFactor13] = useState('--')
  const [btnCalibracionDisabled, setBtnCalibracionDisabled] = useState(true)

  return (
    <div className='infoLineas my-5 p-4 animate__animated animate__fadeIn'>
      {/* form api 60 */}
      <FormApi60 factor6={factor6} factor13={factor13} setFactor6={setFactor6} setFactor13={setFactor13} setDisabledCalibracion={setBtnCalibracionDisabled} />
      {/* tabla calibracion */}
      <FormTablaCalibracion idPlanta={idPlanta} numeroEstanque={numeroEstanque} factor6={factor6} factor13={factor13} rango={rango} disabledBtn={btnCalibracionDisabled} />
    </div>
  )
}
