import React, { useState, useEffect, useContext } from 'react';;
import axios from 'axios';
import { endpointApi } from '../../helpers/variableApi';
import { SelectEstanques } from '../select/SelectEstanques';
import { UserContext } from '../../context/UserContext';
import { alertSwal } from '../../helpers/swal';
import { Numerales } from './Numerales';
import { Comentarios } from './Comentarios';
import { DifyVariacion } from './DifyVariacion';
import { RF } from './RF';
import { SaldoLibro } from './SaldoLibro';
import { SalidaLitros } from './SalidaLitros';
import { IngresoLitros } from './IngresoLitros';


export const SEC = () => {
    const { datosUser: { plantaId } } = useContext(UserContext)
    const [estanque, SelectEstanque] = SelectEstanques(plantaId, '')
    const [nombreProducto, setNombreProducto] = useState('')
    const [inventarioInicial, setInventarioInicial] = useState(0)
    const [datosLibreta, setDatosLibreta] = useState([])
    const [mesanio, setMesanio] = useState('')
    const [volTK, setVolTK] = useState()
    const [datosHojasOleoducto, setDatosHojasOleoducto] = useState([])
    const [datosHojasTransferencia, setDatosHojasTransferencia] = useState([])
    

 
    useEffect(async () => {
        if (estanque !== '') {
            const { data: { nombreProducto } } = await axios.get(endpointApi + `/api/forms/mostrarNombreProductos${plantaId}&${estanque}`)
            const { nombre_producto } = nombreProducto[0]
            setNombreProducto(nombre_producto)
        }
    }, [estanque])

    useEffect(async () => {
        if (nombreProducto !== '' && mesanio !== '') {
            const mes = mesanio.slice(5);
            const anio = mesanio.substring(0, 4);
            const { data: { datos } } = await axios.get(endpointApi + `/api/forms/traerLibretasSEC${plantaId}&${estanque}&${mes}&${anio}`)
            setDatosLibreta(datos)
        }
    }, [nombreProducto, mesanio])

    useEffect(async () => {
        if (nombreProducto !== '' && mesanio !== '') {
            const mes = mesanio.slice(5);
            const anio = mesanio.substring(0, 4);
            const { data: { datos } } = await axios.get(endpointApi + `/api/forms/traerHojasBTSEC${plantaId}&${estanque}&${mes}&${anio}`)
            setDatosHojasOleoducto(datos)
        }
    }, [nombreProducto, mesanio])

    useEffect(async () => {
        if (nombreProducto !== '' && mesanio !== '') {
            const mes = mesanio.slice(5);
            const anio = mesanio.substring(0, 4);
            const { data: { datos } } = await axios.get(endpointApi + `/api/forms/traerHojasTransSEC${plantaId}&${estanque}&${mes}&${anio}`)
            setDatosHojasTransferencia(datos)
        }
    }, [nombreProducto, mesanio])
    
    // useEffect(async () => {
    //     if (datosLibreta !== '') {
    //         const { data: { datos } } = await axios.get(endpointApi + `/api/forms/infoCalibracion${plantaId}&${estanque}&${(parseInt(datosLibreta[0]?.altura_interna) / 10)}`)
    //         //console.log(datos)
    //     }

    // }, [datosLibreta])


    return (
        <div>
            <h2 className='titulos text-center mb-5'>Control Diario de Inventario de Combustibles</h2>

            <div className='border border-secundary border-3 mb-3'>
                <div className='row d-flex text-center align-middle input-group justify-content-md-center my-5'>
                    <div className='col'><h5>Estanque</h5></div>
                    <div className='col'><SelectEstanque /> </div>
                    <div className='col'><h5>Producto</h5></div>
                    <div className='col fw-bold'><h6>{nombreProducto}</h6></div>
                    <div className='col'><span className='input-group-text spanLabel'>Mes</span></div>
                    <div className='col'><input className='form-control' type="month" value={mesanio} min="2000-01" max="2030-01" onChange={e => setMesanio(e.target.value)} /></div>
                    <div className='col'><span className='input-group-text spanLabel'>Inventario Inicial Litros</span></div>
                    <div className='col'><input className='form-control' type='number' value={inventarioInicial} onChange={e => setInventarioInicial(e.target.value)} /></div>

                </div>
            </div>

            <div className='container contenedorTablasSEC'>
                <div className='row contenedorTablasSEC'>
                    <div className='col-2'>
                        <div className='text-center border titulosTSEC'><h5>Ingreso en Litros</h5></div>
                        <IngresoLitros datosHojasOleoducto={datosHojasOleoducto} datosHojasTransferencia={datosHojasTransferencia} />
                    </div>
                    <div className='col-1'>
                        <div className='text-center border titulosTSEC'><h5>Salida en Litros</h5></div>
                        <SalidaLitros datosLibreta={datosLibreta} />
                    </div>

                    <div className='col-5'>
                        <div className='text-center border titulosTSEC'><h5>Analisis de Variación [ (-) : Pérdida / (+) : Ganancia ] </h5></div>
                        <div className='row'>
                            <div className='col-1'>
                                <SaldoLibro datosLibreta={datosLibreta} inventarioInicial={inventarioInicial} />
                            </div>
                            <div className='col'>
                                <div className='text-center border subtituloRFSEC'><h6>Recuento Físico</h6></div>
                                <RF datosLibreta={datosLibreta} />
                            </div>
                            <div className='col-2'>
                                <DifyVariacion datosLibreta={datosLibreta} />
                            </div>
                        </div>
                    </div>
                    <div className='col-1'>
                        <Comentarios datosLibreta={datosLibreta} />
                    </div>
                    <div className='col-3'>
                        <div className='text-center border titulosTSEC'><h5>Numerales</h5></div>
                        <Numerales datosLibreta={datosLibreta} />
                    </div>
                </div>
            </div>


        </div>
    )
}