/* eslint-disable camelcase */
import axios from 'axios'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useSelect } from '../../helpers/useSelect'
import { endpointApi } from '../../helpers/variableApi'

export const SelectFecha = (label = 'Fecha', planta, estanque) => {
  const [estanquesInfoRFTrue, setEstanquesInfoRFTrue] = useState([])
  const [habilitadoSelectFecha, sethabilitadoSelectFecha] = useState(true)

  const [folio, SelectFecha] = useSelect(label, estanquesInfoRFTrue.map((e) => {
    return ({ name: moment(e.fecha).format('Do MMMM YYYY'), code: e.folio_id })
  }), habilitadoSelectFecha, false
  )
  useEffect(async () => {
    if (planta !== '' && estanque !== '' && planta) {
      estanque !== '' && sethabilitadoSelectFecha(false)
      const { data } = await axios.get(endpointApi + `/api/forms/datosRecuentoFisico${planta}&${estanque}`);

      (data.datos)
        ? setEstanquesInfoRFTrue(data.datos)
        : setEstanquesInfoRFTrue([])
    }
  }, [planta, estanque])

  const SelectFechaa = () => <SelectFecha />

  return [folio, SelectFechaa, estanquesInfoRFTrue]
}
