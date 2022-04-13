/* eslint-disable react/jsx-indent */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelect } from '../../helpers/useSelect'
import { endpointApi } from '../../helpers/variableApi'

export const SelectEstanques = (planta, label = 'Estanque', bloqueado = true, defaultValue) => {
  const [estanques, setEstanques] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [estanquesRangos, setEstanquesRangos] = useState([])
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    setDisabled(bloqueado)
  }, [bloqueado])

  const [estanque, SelectEstanque] = useSelect(label, (estanques.map((d) => {
    return { code: d, name: d }
  })), disabled, cargando, defaultValue = '')

  useEffect(async () => {
    if (planta !== '') {
      setCargando(true)
      const { data: { medio } } = await axios.post(endpointApi + '/api/forms/calibracion', { idPlanta: planta })
      setEstanques(medio.map(m => Object.keys(m)[0]))
      setEstanquesRangos(medio)
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    setCargando(false)
  }, [planta])

  const SelectTank = () => <SelectEstanque />

  return [estanque, SelectTank, estanquesRangos]
}

// .
