/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
import axios from 'axios'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'
import CSVReader from '../actuCalibracion/CSVReader'
import { DescargarCSV2 } from '../actuCalibracion/DescargarCSV2'
import { Estanque } from './Estanque'
import { PantallaCarga } from '../UI/PantallaCarga'
import { SelectPlantas } from '../select/SelectPlantas'
moment.locale('es')
moment.updateLocale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
)

export const EstanquesTab = () => {
  const [estanqueOriginal, setOriginal] = useState([])
  const [estanques, setEstanques] = useState([])
  const [planta, SelectPlanta] = SelectPlantas('')
  const { datosUser: { cargo } } = useContext(UserContext)
  const [changeCalibration, setChangeCalibration] = useState(false)
  const [enableAccept, setEnableAccept] = useState(false)
  const [newCalibration, setNewCalibration] = useState('')
  const [plantaEstanqueCalibracion, setPlantaEstanqueCalibracion] = useState({})
  const [cargando, setCargando] = useState(false)
  const [nombrePlantaSel, setNombrePlantaSel] = useState('')
  const [datosParaExcel, setDatosParaExcel] = useState([])

  useEffect(async () => {
    const { data: { datos } } = await axios(endpointApi + '/api/forms/estanques')
    setOriginal(datos)
  }, [])

  useEffect(async () => {
    if (plantaEstanqueCalibracion?.plantaCalibrar) {
      try {
        const datos = await axios.get(endpointApi + `/api/forms/nombrePlantaporId${plantaEstanqueCalibracion.plantaCalibrar}`)
        if (datos?.data?.resp) {
          const { data } = datos
          const { resp } = data
          const { pla_glosa } = resp[0]
          setNombrePlantaSel(pla_glosa)
        } else {
          alertSwal(false, 'Ha ocurrido un error, intente nuevamente')
        }
      } catch (error) {
        alertSwal(false, 'Ha ocurrido un error, intente nuevamente')
        setChangeCalibration(false)
      }
    }
  }, [plantaEstanqueCalibracion])

  useEffect(async () => {
    if (planta !== '') {
      const filtradoEstanque = estanqueOriginal.filter((e) => e.planta_id == (planta))
      if (filtradoEstanque.length === 0) {
        setEstanques([])
        alertSwal(false, 'No existen estanques registrados en esta planta')
      } else { setEstanques(filtradoEstanque) }
    }
  }, [planta])

  const handleAceptExcel = async () => {
    setCargando(true)
    document.querySelector('.contInputCSV').classList.add('animate__fadeOut')
    setTimeout(() => {
      setChangeCalibration(false)
    }, 1000)
    setEnableAccept(false)
    setNewCalibration([...newCalibration.shift()])
    if (newCalibration[newCalibration.length - 1][0] === '') {
      setNewCalibration([...newCalibration.pop()])
    }
    // enviar a backend
    const { data } = await axios.post(endpointApi + '/api/forms/archivocalibraciones', { ...plantaEstanqueCalibracion, newCalibration })
    setCargando(false)
    if (data.ok) {
      setDatosParaExcel(data?.resp)
      setTimeout(() => {
        data?.ok && document.querySelector('.btnActivarCSV').click()
      }, 1500)
    }
    alertSwal(data?.ok, data?.msg, 3000)
  }

  const handleCancelExcel = () => {
    document.querySelector('.contInputCSV').classList.add('animate__fadeOut')
    setTimeout(() => {
      setChangeCalibration(false)
    }, 1000)
    setEnableAccept(false)
  }
  return (
    <>
      {/* boton descarga csv */}

      {/* modal para descargar csv */}
      <button type='button' style={{ display: 'none' }} className='btnActivarCSV btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalDescargaCSV'>
        Launch demo modal
      </button>

      <div className='modal fade' style={{ paddingTop: '10%' }} id='modalDescargaCSV' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Descarga respaldo CSV</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              ¿Desea descargar un respaldo de calibraciones reemplazadas?
            </div>
            <div className='modal-footer'>
              <DescargarCSV2 className='btnDownloadCSV' data={datosParaExcel} filename={`RespaldoCalibración${nombrePlantaSel}_Tk${plantaEstanqueCalibracion.estanqueCalibrar}_${moment().format('l')}.csv`} />
              <button type='button' className='btn btn-secondary btnCerrarcsv' data-bs-dismiss='modal'>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      {cargando && <PantallaCarga />}
      {changeCalibration &&
        <div className='contInputCSV animate__animated animate__fadeIn'>
          <h2 className='text-center' style={{ color: 'white' }}>Usted esta actualizando el estanque {plantaEstanqueCalibracion.estanqueCalibrar} de {nombrePlantaSel}</h2>
          <h3 className='tituloCalibracion d-flex text-center'>FAVOR ASEGURARSE DE SEGUIR UNO DE LOS SIGUIENTES FORMATOS</h3>
          <h5 className='mb-0' style={{ color: 'pink' }}>** Usar puntos para separar decimales **</h5>
          <div className='divImagenesCalibracion'>
            <img className='ejemploCalibracion' src='img/exampleCalibracion.png' alt='EjemploCalibracion' />
            <img className='ejemploCalibracion' src='img/exampleCalibracionn2.png' alt='EjemploCalibracion2' />
          </div>
          <div className='inputCSV'>
            <CSVReader setEnableAccept={setEnableAccept} setNewCalibration={setNewCalibration} />
            {!enableAccept && <p className='labelcsv text-center'>** Si su archivo tiene extension .xlsx favor convertir <a target='_blank' href='https://convertio.co/es/' rel='noreferrer'>aquí</a> antes de subir</p>}
          </div>
          <div className=' gap-2 botonCerrarExcel'>
            <button disabled={!enableAccept} onClick={handleAceptExcel} className='btn btn-success w-50 ' type='button'>Aceptar</button>
            <button onClick={handleCancelExcel} className='btn btn-danger w-50 ' type='button'>Cancelar</button>
          </div>
        </div>}
      <div className='animate__animated animate__fadeIn'>
        <h1 className='text-center titulos mb-5'>Estanques por Planta </h1>

        <SelectPlanta />
        {estanques.length > 0 &&
          <table className='table table-primary border border-3 animate__animated animate__fadeIn'>
            <thead>
              <tr className='text-center fw-bold'>
                <th scope='col'>Número estanque</th>
                <th scope='col'>Id Planta</th>
                <th scope='col'>Fecha expiración</th>
                <th scope='col'>Producto</th>
                <th scope='col'>Total Altura</th>
                <th scope='col'>Capacidad Volumen</th>
                <th scope='col'>Volumen total linea</th>
                <th scope='col'>Volumen manifold estanque</th>
                <th scope='col'>Volumen estanque a motobomba</th>
                <th scope='col'>Volumen motobomba a mesa llenadora</th>
                <th scope='col'>Capacidad llenado seguro</th>
                {cargo == 1 && <th scope='col'>Editar</th>}
                {cargo == 1 && <th scope='col'>Actualizar calibración</th>}
              </tr>
            </thead>
            <tbody>
              {estanques?.map((e) => <Estanque key={e.numero_estanque} setPlantaEstanqueCalibracion={setPlantaEstanqueCalibracion} e={e} planta={planta} cargo={cargo} setChangeCalibration={setChangeCalibration} />)}
            </tbody>
          </table>}
      </div>
    </>
  )
}

// onClick={() => handleModificar(e.planta_id, e.numero_estanque, e.fecha_expiracion, e.codigo_producto)}
