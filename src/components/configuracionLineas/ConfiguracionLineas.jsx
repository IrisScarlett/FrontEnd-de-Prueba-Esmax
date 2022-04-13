/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import Swal from 'sweetalert2'
import { InfoLineas } from './InfoLineas'
import 'animate.css'
import { InfoEstanque } from './InfoEstanque'
import { SelectPlantas } from '../select/SelectPlantas'
import { SelectEstanques } from '../select/SelectEstanques'
import { endpointApi } from '../../helpers/variableApi'

export const ConfiguracionLineas = () => {
  // select planta
  const [planta, SelectPlant] = SelectPlantas()
  const [activarButton, setActivarButton] = useState(false)
  // useState rango linea
  const [rango, setRango] = useState({})
  // info a desplegar en recuento
  const [info, setInfo] = useState({})
  // ?Borrar si no funcinoa
  const [estanque, SelectTank, estanquesRangos] = SelectEstanques(planta)

  const [componenteMostrar, setComponenteMostrar] = useState('')

  // al hacer click en consultar
  const handleClickLineas = async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/estanques')
    const info = datos.filter(d => d.numero_estanque == estanque)
    setInfo(info)
    setComponenteMostrar('lineas')
  }
  // useefect para habilitar boton de consulta o no
  useEffect(() => {
    if (planta && estanque !== '') { setActivarButton(true) } else { setActivarButton(false) }
  }, [planta, estanque])

  useEffect(() => {
    setComponenteMostrar('')
  }, [planta])

  // al cambiar estanque
  useEffect(() => {
    if (estanque !== '') {
      setRango(estanquesRangos.filter(e => (estanque === Object.keys(e)[0])))
      setComponenteMostrar('')
    }
  }, [estanque])

  const handleClickEstanque = () => {
    setComponenteMostrar('estanque')
  }

  return (
    <div className='animate__animated animate__fadeIn'>
      <h1 className='text-center titulos mb-5'>Configuración de líneas </h1>
      <div className='row'>
        <div className='col-4'><SelectPlant />
        </div>
        <div className='col-4'><SelectTank />
        </div>
        <div className='col-4'>
          <div className='contBotonLineas row'>
            <div className='col'>
              <button
                className='btn btns botonLineas' type='button' onClick={handleClickLineas}
                disabled={!activarButton}
              >Vol. lineas
              </button>
            </div>
            <div className='col'>
              <button
                onClick={handleClickEstanque} className='btn btns botonLineas' type='button'
                disabled={!activarButton}
              >Vol. Estanque
              </button>
            </div>

          </div>
        </div>
      </div>
      {(componenteMostrar === 'estanque') && <InfoEstanque idPlanta={planta} numeroEstanque={estanque} rango={rango} />}
      {(componenteMostrar === 'lineas') && (<InfoLineas info={info[0]} />)}
    </div>
  )
}

// d-grid gap-2
