import axios from 'axios'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'

export const GuardarRF = ({
  datosLibreta, planta, estanque, nombreProducto,
  checkOleoductoGuardado, checkTrasvasijoGuardado, checkDrenajeGuardado, checkSECGuardado, checkTransferenciaGuardado,
  checkAlarmaDeNivelGuardado, rellenarDatos, alturaInterna, api60Factor6, factor13, valorCierre, volumenCanerias,
  volFinalMedidores, estVolumen, volumenAgua, valorOtros, volNaturalInicial, vol60, volumenKilos, observaciones
}) => {
  const { datosUser: { usrId } } = useContext(UserContext)

  const handleClickGuardar = async () => {
    const fecha = datosLibreta?.fecha
    // console.log(observaciones)
    const { data } = await axios.post(endpointApi + '/api/forms/insertRecuentoFisico', {
      planta: planta,
      estanque: estanque,
      producto: nombreProducto.nombreProd,
      usuario: usrId,
      oleoducto: checkOleoductoGuardado,
      trasvasijo: checkTrasvasijoGuardado,
      drenaje: checkDrenajeGuardado,
      sec: checkSECGuardado,
      transferencia: checkTransferenciaGuardado,
      alarma: checkAlarmaDeNivelGuardado,
      hora: rellenarDatos?.hora,
      alturaExterna: datosLibreta?.altura_externa,
      alturaInterna: alturaInterna,
      nivelAgua: datosLibreta?.altura_agua,
      densObs: rellenarDatos?.densidadObservada,
      tObs: rellenarDatos?.temperaturaObsrvada,
      tInf: rellenarDatos?.temperaturaInferior,
      temp: rellenarDatos?.temperatura,
      factorPared: rellenarDatos?.factorPared,
      api60: api60Factor6.api60,
      factor6: api60Factor6.factor6,
      factor13: factor13,
      primeraMedicion: datosLibreta?.primera_medicion,
      segundaMedicion: datosLibreta?.segunda_medicion,
      terceraMedicion: datosLibreta?.tercera_medicion,
      cuertaMedicion: datosLibreta?.cuarta_medicion,
      quintaMedicion: datosLibreta?.quinta_medicion,
      sextaMedicion: datosLibreta?.sexta_medicion,
      primerCierre: valorCierre?.cierre1,
      segundoCierre: valorCierre?.cierre2,
      tercerCierre: valorCierre?.cierre3,
      cuartoCierre: valorCierre?.cierre4,
      quintoCierre: valorCierre?.cierre5,
      sextoCierre: valorCierre?.cierre6,
      volumenCanerias: volumenCanerias,
      volumenMedidores: volFinalMedidores,
      volumenEstanque: estVolumen,
      volumenAgua: volumenAgua,
      volumenOtros: valorOtros.nombreVolOtros,
      volumenNatural: volNaturalInicial,
      volumen60f: vol60?.toFixed(0),
      volumenkilos: volumenKilos,
      observaciones: !observaciones.observaciones1 ? 'Sin Observaciones' : observaciones.observaciones1,
      fecha: dayjs(fecha).format('YYYY-MM-DD')
    })
    console.log(api60Factor6.api60)
    alertSwal(data.ok, data.msg)
  }
  return (
    <div><button onClick={handleClickGuardar} className='btns mt-4'>Guardar</button></div>
  )
}
