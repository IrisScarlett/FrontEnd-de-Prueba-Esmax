import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import BotonVacioRF from './BotonVacioRF'

export default function CheckBoxsRF ({
  datosLibreta, planta, estanque, estVolumen, setEstVolumen,
  setCheckOleoductoGuardado,
  setCheckTrasvasijoGuardado,
  setCheckDrenajeGuardado,
  setCheckSECGuardado,
  setCheckTransferenciaGuardado,
  setCheckAlarmaDeNivelGuardado
}) {
  const [checkOleoducto, setCheckOleoducto] = useState(true)
  const [checkTrasvasijo, setCheckTrasvasijo] = useState(true)
  const [checkDrenaje, setCheckDrenaje] = useState(true)
  const [checkSEC, setCheckSEC] = useState(true)
  const [checkTransferencia, setCheckTransferencia] = useState(true)
  const [checkAlarmaDeNivel, setCheckAlarmaDeNivel] = useState(true)

  const handleCheckBoxOleoducto = (e) => {
    setCheckOleoducto({
      checked: e.target.checked
    })
  }

  const handleCheckBoxTrasvasijo = (e) => {
    setCheckTrasvasijo({
      checked: e.target.checked
    })
  }

  const handleCheckBoxDrenaje = (e) => {
    setCheckDrenaje({
      checked: e.target.checked
    })
  }

  const handleCheckBoxSEC = (e) => {
    setCheckSEC({
      checked: e.target.checked
    })
  }

  const handleCheckBoxTransferencia = (e) => {
    setCheckTransferencia({
      checked: e.target.checked
    })
  }

  const handleCheckBoxAlarmaDeNivel = (e) => {
    setCheckAlarmaDeNivel({
      checked: e.target.checked
    })
  }

  useEffect(() => {
    setCheckOleoductoGuardado(checkOleoducto.checked)
    if (checkOleoducto.checked === undefined) {
      setCheckOleoductoGuardado(false)
    }
    setCheckTrasvasijoGuardado(checkTrasvasijo.checked)
    if (checkTrasvasijo.checked === undefined) {
      setCheckTrasvasijoGuardado(false)
    }
    setCheckDrenajeGuardado(checkDrenaje.checked)
    if (checkDrenaje.checked === undefined) {
      setCheckDrenajeGuardado(false)
    }
    setCheckSECGuardado(checkSEC.checked)
    if (checkSEC.checked === undefined) {
      setCheckSECGuardado(false)
    }
    setCheckTransferenciaGuardado(checkTransferencia.checked)
    if (checkTransferencia.checked === undefined) {
      setCheckTransferenciaGuardado(false)
    }
    setCheckAlarmaDeNivelGuardado(checkAlarmaDeNivel.checked)
    if (checkAlarmaDeNivel.checked === undefined) {
      setCheckAlarmaDeNivelGuardado(false)
    }
  }, [checkOleoducto, checkTrasvasijo, checkDrenaje, checkSEC, checkTransferencia, checkAlarmaDeNivel])

  return (
    <FormControl component='fieldset' className='border border-secundary'>
      <div className='row'>
        <FormLabel className='col-10 text-center mt-2 fw-bold' component='legend'>Tipo de Operación</FormLabel>
        <div className='col-2 mt-1'> <BotonVacioRF datosLibreta={datosLibreta} estanque={estanque} planta={planta} estVolumen={estVolumen} setEstVolumen={setEstVolumen} /></div>
      </div>

      <FormGroup className='m-3 countCheckBoxs' aria-label='position' row>

        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='BT/ Oleoducto'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxOleoducto}
        />
        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='Trasvasijo'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxTrasvasijo}
        />
        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='Drenaje'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxDrenaje}

        />

        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='SEC'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxSEC}

        />
        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='Transferencia'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxTransferencia}
        />
        <FormControlLabel
          value='bottom'
          control={<Checkbox />}
          label='Alarma de Nivel'
          labelPlacement='bottom'
          defaultChecked={false}
          onChange={handleCheckBoxAlarmaDeNivel}
        />
      </FormGroup>
    </FormControl>
  )
}
