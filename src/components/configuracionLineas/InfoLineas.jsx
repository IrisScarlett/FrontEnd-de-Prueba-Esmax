import React from 'react'
import 'animate.css'
import { addPuntos } from '../../helpers/addPuntos'

export const InfoLineas = ({
  info: {
    volumen_estanque_motobomba: em,
    volumen_manifold_estanque: me,
    volumen_motobomba_mesallenado: mm,
    volumen_total_linea: vt
  }
}) => {
  return (
    <div className='infoLineas mt-5 p-4 animate__animated animate__fadeIn mb-5'>
      <h3 className='tituloLineas text-center'>Recuento Físico</h3>
      <hr />
      <div className='row ms-4 mt-4'>
        <div className='col'>
          <h5>Volumen total cañerias</h5>
        </div>
        <div className='col'>
          <h5>{addPuntos(vt) + ' litros'}</h5>
        </div>
      </div>
      <h3 className='tituloLineas mt-5 text-center'>Hoja de medidas</h3>
      <hr />

      <div className='hojaMedidas mt-4'>
        <div className='row ms-4 mt-3'>
          <div className='col'>
            <h5>Volumen manifold a estanque</h5>
          </div>
          <div className='col'>
            <h5>{addPuntos(me) + ' litros'}</h5>
          </div>
        </div>
        <div className='row ms-4 mt-3'>
          <div className='col'>
            <h5>Volumen estanque a motobomba</h5>
          </div>
          <div className='col'>
            <h5>{addPuntos(em) + ' litros'}</h5>
          </div>
        </div>
        <div className='row ms-4 mt-3'>
          <div className='col'>
            <h5>Volumen motobomba a mesa llenadora</h5>
          </div>
          <div className='col'>
            <h5>{addPuntos(mm) + ' litros'}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
