import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { endpointApi } from '../../helpers/variableApi'
import { DanloadHojaResumen } from './DanloadHojaResumen'
import { TablaPrincipalHojaResumen } from './TablaPrincipalHojaResumen'
import './hojaResumenPrint.css'

export const HojasResumen = () => {
  const location = useLocation()
  const [fecha, setFecha] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const funcion = async () => {
      if (location.state.fecha) {
        const { data } = await axios(endpointApi + `/api/forms/recuentosPorFecha${dayjs(location.state.fecha).format('YYYY-MM-DD')}`)
        setData(data.response)
        setFecha(dayjs(location.state.fecha).format('MMMM D, YYYY'))
        console.log(data.response)
      }
    }
    funcion()
  }, [location])

  return (
    <div>
      <h2 className='titulos text-center mb-5 tituloHojaResumen'>Control de Combustibles</h2>
      <h5 className='subTitulos text-center mb-5 fechaHojaResumen'>{fecha}</h5>
      <table className='table table-bordered border-dark text-center tablaResumenes'>
        <thead>
          <tr>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'>N° Est</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'>Producto</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'>Hora</th>
            <th scope='col' colspan='3' className='titulosTablaHR p-1'>Altura</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'>API</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'>T°</th>
            <th scope='col' colspan='2' className='titulosTablaHR p-1'>Factor</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Cañerias</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Medidores</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Otros</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Estanque</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Natural</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>60°F</th>
            <th scope='col' rowspan='2' className='titulosTablaHR p-1'><p className='mb-0'>Vol</p>Kilos</th>

          </tr>
          <tr>
            <th scope='col' className='p-1 titulosTablaHR'>Ext</th>
            <th scope='col' className='p-1 titulosTablaHR'>Int</th>
            <th scope='col' className='p-1 titulosTablaHR'>Agua</th>
            <th scope='col' className='p-1 titulosTablaHR'>T6</th>
            <th scope='col' className='p-1 titulosTablaHR'>T13</th>
          </tr>

        </thead>
        <tr className='espacioTablaHR' />
        <tbody className='p-0'>

          {data.map((d) => <TablaPrincipalHojaResumen key={d.id_rf} datos={d} />)}

        </tbody>
      </table>

      <div className='row tablaDanload'>
        <div className='col-12'>
          <div className='row titulosDanload'>
            <h5 className=' col-9 subTitulos mt-5 '>DANLOAD</h5>
            <h5 className='col-3 subTitulosObservaciones mt-5 text-rigth'>Observaciones</h5>
          </div>

          <table className='table table-bordered border-dark text-center mb-5 tableDanload'>

            <tbody>

              {data.map((d) => <DanloadHojaResumen key={d.id_rf} datos={d} />)}

            </tbody>

          </table>
        </div>
        <div className='reportHojaResumen d-flex justify-content-end'>
          <button type='button' className='btns m-4 btnPrint' onClick={() => window.print()}>Generar reporte<i class='ms-2 fas fa-download' /></button>
        </div>
      </div>
    </div>
  )
}
