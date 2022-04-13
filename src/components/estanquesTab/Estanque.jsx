/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { addPuntos } from '../../helpers/addPuntos'
import { alertSwal } from '../../helpers/swal'
import { endpointApi } from '../../helpers/variableApi'
import { SelectProductPequeño } from '../select/SelectProductPequeño'

export const Estanque = ({ e, planta, cargo, setChangeCalibration, setPlantaEstanqueCalibracion }) => {
  e.numero_estanque === 6001 && console.log(e.volumen_motobomba_mesallenado, e.nombre_producto)
  const [modificar, setModificar] = useState(false)
  //   states inputs a cambiar
  const [nombreProd, setNombreProd] = useState(e.nombre_producto)
  const [fecha, setFecha] = useState(moment(e.fecha_expiracion).format('YYYY-MM-DD'))
  const [maniEst, setManiEst] = useState(e.volumen_manifold_estanque)
  const [estMot, setEstMot] = useState(e.volumen_estanque_motobomba)
  const [motMes, setMotMes] = useState(e.volumen_motobomba_mesallenado)
  const [capSeguro, setCapSeguro] = useState(e.capacidad_llenado_seguro)
  const [volTotal, setVolTotal] = useState(parseInt(maniEst) + parseInt(estMot) + parseInt(motMes))
  const [productoElegido, SelectProduct] = SelectProductPequeño(e.codigo_producto)

  const resetForm = () => {
    setNombreProd(e.nombre_producto)
    setFecha(e.fecha_expiracion)
    setManiEst(e.volumen_manifold_estanque)
    setEstMot(e.volumen_estanque_motobomba)
    setMotMes(e.volumen_motobomba_mesallenado)
    setCapSeguro(e.capacidad_llenado_seguro)
    setVolTotal(parseInt(maniEst) + parseInt(estMot) + parseInt(motMes))
  }
  useEffect(() => {
    setModificar(false)
    resetForm()
  }, [planta])

  useEffect(() => {
    setVolTotal(parseInt(maniEst) + parseInt(estMot) + parseInt(motMes))
  }, [maniEst, estMot, motMes])

  const handleModify = () => {
    setModificar(!modificar)
  }

  const handleSave = async () => {
    if (fecha !== '' && maniEst !== '' && estMot !== '' && motMes !== '') {
      setModificar(!modificar)
      setNombreProd((productoElegido?.nombre_producto ? productoElegido.nombre_producto : e.nombre_producto))
      const { data } = await axios.post(endpointApi + '/api/forms/cambiarestanque', { fecha, codigoProd: (productoElegido?.codigo_producto ? productoElegido.codigo_producto : e.codigo_producto), maniEst, estMot, motMes, volTotal, planta, codigoEst: e.codigo_estanque, capSeguro })
      alertSwal(data.ok, data.message)
    } else {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Favor rellenar todos los campos',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  const handleUpdateCalibration = () => {
    setChangeCalibration(true)
    setPlantaEstanqueCalibracion({ plantaCalibrar: e.planta_id, estanqueCalibrar: e.numero_estanque })
  }

  return (
    // TODO arreglar que estan atrasados los valores!
    <>
      {!modificar
        ? (
          <tr key={e.numero_estanque}>
            <th className='text-center' scope='row'>{e.numero_estanque}</th>
            <td className='text-center'>{e.planta_id}</td>
            <td className='text-center'>{moment(fecha).format('Do MMMM YYYY')}</td>
            <td className='text-center'>{nombreProd}</td>
            <td className='text-center'>{addPuntos(e.total_altura)}</td>
            <td className='text-center'>{addPuntos(e.capacidad_volumen)}</td>
            <td className='text-center'>{!isNaN(volTotal) ? addPuntos(volTotal) : '- -'}</td>
            <td className='text-center'>{addPuntos(maniEst)}</td>
            <td className='text-center'>{addPuntos(estMot)}</td>
            <td className='text-center'>{addPuntos(motMes)}</td>
            <td className='text-center'>{addPuntos(e.capacidad_llenado_seguro.replace('.', ','))}</td>
            {cargo == 1 && <td><button className='btn btns m-2' onClick={() => handleModify(e.numero_estanque)}><i className='fas fa-edit' /> </button></td>}
            {cargo == 1 && <td><button className='btn btns m-2 text-center' onClick={handleUpdateCalibration}><i className='fas fa-file-csv' /> </button></td>}
          </tr>)
        : (
          <tr key={e.numero_estanque}>
            <th scope='row'>{e.numero_estanque}</th>
            <td>{e.planta_id}</td>
            <td><input required className='form-control' type='date' value={fecha} onChange={e => setFecha(e.target.value)} /></td>
            {/* <td><input type='text' value={producto} onChange={e => setProducto(e.target.value)} /></td> */}
            <td><SelectProduct /></td>
            <td>{e.total_altura}</td>
            <td>{e.capacidad_volumen}</td>
            <td>{!isNaN(volTotal) ? volTotal : '- -'}</td>
            <td><input required className='w-100 form-control' type='number' value={maniEst} onChange={e => setManiEst(e.target.value)} /></td>
            <td><input required className='w-100 form-control' type='number' value={estMot} onChange={e => setEstMot(e.target.value)} /></td>
            <td><input required className='w-100 form-control' type='number' value={motMes} onChange={e => setMotMes(e.target.value)} /></td>
            <td><input required className='form-control inputEstCapSeguro' type='number' value={capSeguro} onChange={e => setCapSeguro(e.target.value)} /></td>
            <td><button required className='btn btns m-2' onClick={() => handleSave(e.numero_estanque)}>Guardar</button></td>
            <td><button className='btn btns m-2 text-center' onClick={handleUpdateCalibration}><i className='fas fa-file-csv' /> </button></td>
          </tr>)}
    </>
  )
}
