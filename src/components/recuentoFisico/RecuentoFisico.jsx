/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react'
import DatosRF from './DatosRF'
// import BotonVacioRF from './BotonVacioRF'
import CheckBoxsRF from './CheckBoxsRF'
import axios from 'axios'
import { endpointApi } from '../../helpers/variableApi'
import { SelectEstanques } from '../select/SelectEstanques'
import { SelectFecha } from '../select/SelectFecha'
import { UserContext } from '../../context/UserContext'
import { ModalHojasResumen } from './ModalHojasResumen'
import { GuardarRF } from './GuardarRF'

export const RecuentoFisico = () => {
  const { datosUser: { plantaId } } = useContext(UserContext)
  const [estanque, SelectEstanque] = SelectEstanques(plantaId, '')
  const [nombreProducto, setNombreProducto] = useState({})
  const [medicionSeleccionada, setMedicionSeleccionada] = useState({})
  const [folioSeleccionado, SelectFechaa, estanquesInfoRFTrue] = SelectFecha('', plantaId, estanque)
  const [estVolumen, setEstVolumen] = useState(0)

  const [checkOleoductoGuardado, setCheckOleoductoGuardado] = useState('')
  const [checkTrasvasijoGuardado, setCheckTrasvasijoGuardado] = useState('')
  const [checkDrenajeGuardado, setCheckDrenajeGuardado] = useState('')
  const [checkSECGuardado, setCheckSECGuardado] = useState('')
  const [checkTransferenciaGuardado, setCheckTransferenciaGuardado] = useState('')
  const [checkAlarmaDeNivelGuardado, setCheckAlarmaDeNivelGuardado] = useState('')

  const [rellenarDatos, setRellenarDatos] = useState({ hora: '', densidadObservada: 0, temperaturaObsrvada: 0, temperaturaInferior: 0, temperatura: 0, factorPared: 0 })
  const [alturaInterna, setAlturaInterna] = useState()
  const [api60Factor6, setApi60Factor6] = useState({})
  const [factor13, setFactor13] = useState()
  const [valorCierre, setValorCierre] = useState({ cierre1: 0, cierre2: 0, cierre3: 0, cierre4: 0, cierre5: 0, cierre6: 0 })
  const [volumenCanerias, setVolumenCanerias] = useState({ volumenCanerias: 0 })
  const [volFinalMedidores, setVolFinalMedidores] = useState(0)
  const [volumenAgua, setVolumenAgua] = useState(0)
  const [valorOtros, setValorOtros] = useState({ nombreVolOtros: 0 })
  const [volNaturalInicial, setVolNaturalInicial] = useState((parseInt(volumenCanerias) + parseInt(estVolumen) + parseInt(volFinalMedidores)))
  const [vol60, setVol60] = useState()
  const [volumenKilos, setVolumenKilos] = useState(0)
  const [observaciones, setObservaciones] = useState(' - ')

  useEffect(() => {
    setMedicionSeleccionada({})
  }, [estanque, plantaId])

  useEffect(() => {
    setMedicionSeleccionada(estanquesInfoRFTrue.filter((estanque) => estanque.folio_id == folioSeleccionado)[0])
  }, [folioSeleccionado])

  useEffect(async () => {
    if (estanque !== '') {
      const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${plantaId}&${estanque}`)

      setNombreProducto({ nombreProd: nombreProducto[0].nombre_producto, colorProd: nombreProducto[0].color_producto })
    }
  }, [estanque])

  useEffect(() => {
    setNombreProducto('')
  }, [estanque])

  return (
    <div>

      <h2 className='titulos text-center mb-5'>Recuento Físico</h2>

      <div className=' border border-secundary border-3 mb-3 cuadroPrincipal pb-3 pt-3 ps-5 pe-5'>

        <div className='row mt-4'>

          <div className='col-4'>
            <div className='row'>
              <h5 className='col-3 mt-4'>Estanque</h5>
              <div className='col mt-4 ms-5'><SelectEstanque /> </div>
            </div>
            <div className='row mb-4'>
              <h5 className='col-3 mt-4 '>Fecha</h5>
              <div className='col mt-4 ms-5'>      <SelectFechaa />
              </div>
            </div>
            <div className='row ms-0'>
              <div className='col text-sm ps-0 text-center'>USUARIO :  {medicionSeleccionada?.usr_nombre}</div>
            </div>

          </div>

          <div className='col-8'>
            <div className=''>
              <CheckBoxsRF
                datosLibreta={medicionSeleccionada} estanque={estanque} planta={plantaId} estVolumen={estVolumen} setEstVolumen={setEstVolumen}
                setCheckOleoductoGuardado={setCheckOleoductoGuardado}
                setCheckTrasvasijoGuardado={setCheckTrasvasijoGuardado}
                setCheckDrenajeGuardado={setCheckDrenajeGuardado}
                setCheckSECGuardado={setCheckSECGuardado}
                setCheckTransferenciaGuardado={setCheckTransferenciaGuardado}
                setCheckAlarmaDeNivelGuardado={setCheckAlarmaDeNivelGuardado}

              />
            </div>
            <div className='row'>
              <div className='col-6 row mt-4 colorProducto ms-4  pt-2' style={{ backgroundColor: nombreProducto.colorProd }}>
                <h5 className='col-3 TituloProductoRF nombreProducto ' style={{ opacity: '800%' }}>Producto:</h5>
                <h5 className='col-8  text-center fw-bold nombreProducto'>{nombreProducto.nombreProd}</h5>
              </div>

              <div className='col-3 mt-4 ms-4 '><ModalHojasResumen /></div>
              <div className='col-2'>
                <GuardarRF
                  estanque={estanque} planta={plantaId} datosLibreta={medicionSeleccionada} nombreProducto={nombreProducto}
                  checkOleoductoGuardado={checkOleoductoGuardado}
                  checkTrasvasijoGuardado={checkTrasvasijoGuardado} checkDrenajeGuardado={checkDrenajeGuardado}
                  checkSECGuardado={checkSECGuardado} checkTransferenciaGuardado={checkTransferenciaGuardado}
                  checkAlarmaDeNivelGuardado={checkAlarmaDeNivelGuardado} rellenarDatos={rellenarDatos}
                  alturaInterna={alturaInterna} api60Factor6={api60Factor6} factor13={factor13} valorCierre={valorCierre}
                  volumenCanerias={volumenCanerias} volFinalMedidores={volFinalMedidores} estVolumen={estVolumen}
                  volumenAgua={volumenAgua} vol60={vol60} volumenKilos={volumenKilos} valorOtros={valorOtros}
                  volNaturalInicial={volNaturalInicial} observaciones={observaciones}

                />
              </div>
            </div>

          </div>

        </div>

        <div className=' mt-4'>
          <DatosRF
            nombreProducto={nombreProducto} datosLibreta={medicionSeleccionada} estanque={estanque} planta={plantaId}
            fecha={folioSeleccionado} estVolumen={estVolumen} setEstVolumen={setEstVolumen}
            rellenarDatos={rellenarDatos} setRellenarDatos={setRellenarDatos}
            alturaInterna={alturaInterna} setAlturaInterna={setAlturaInterna}
            api60Factor6={api60Factor6} setApi60Factor6={setApi60Factor6}
            factor13={factor13} setFactor13={setFactor13}
            valorCierre={valorCierre} setValorCierre={setValorCierre}
            volumenCanerias={volumenCanerias} setVolumenCanerias={setVolumenCanerias}
            volFinalMedidores={volFinalMedidores} setVolFinalMedidores={setVolFinalMedidores}
            volumenAgua={volumenAgua} setVolumenAgua={setVolumenAgua}
            valorOtros={valorOtros} setValorOtros={setValorOtros}
            volNaturalInicial={volNaturalInicial} setVolNaturalInicial={setVolNaturalInicial}
            vol60={vol60} setVol60={setVol60}
            volumenKilos={volumenKilos} setVolumenKilos={setVolumenKilos}
            observaciones={observaciones} setObservaciones={setObservaciones}
          />
        </div>
      </div>

    </div>
  )
}
