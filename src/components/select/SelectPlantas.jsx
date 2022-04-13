/* eslint-disable camelcase */
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelect } from '../../helpers/useSelect'
import { endpointApi } from '../../helpers/variableApi'

export const SelectPlantas = (label = 'Planta') => {
  const [plantas, setPlantas] = useState([])
  const [planta, SelectPlanta] = useSelect(label, (plantas.map((d) => {
    const { planta_id, pla_glosa } = d
    const nombreMinuscula = pla_glosa.toLowerCase()
    return { code: planta_id, name: nombreMinuscula.charAt(0).toUpperCase() + nombreMinuscula.slice(1) }
  })), false, false, 'small')

  useEffect(async () => {
    const { data: { datos: resPlantas } } = await axios(endpointApi + '/api/forms/plantas')
    const idPermitidos = ['2', '3', '4', '5', '6']
    const plantasFiltradas = resPlantas.filter(p => idPermitidos.includes(p.planta_id))
    setPlantas(plantasFiltradas)
  }, [])

  const SelectPlant = () => <SelectPlanta />

  return [planta, SelectPlant]
}
