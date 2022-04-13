import React, { useState, useEffect, useContext } from 'react';
import { api60factor6 } from '../../helpers/formulasApi60';
import { addPuntos } from '../../helpers/addPuntos';

export const RF = ({ datosLibreta }) => {
    const [totalCanerias, setTotalCanerias] = useState(0)
    const [totalOtroVol, setTotalOtroVol] = useState(0)
    const [totalVolTk, setTotalVolTk] = useState(0)
    const [totalLitros, setTotalLitros] = useState(0)

    return (
        <table className="table table-primary table-striped table-hover table-bordered text-center">
            <thead className='align-middle'>
                <tr>
                    <th scope="col">Hora</th>
                    <th scope="col">Alt. Int.</th>
                    <th scope="col">API60</th>
                    <th scope="col">T°</th>
                    <th scope="col">Factor 6</th>
                    <th scope="col">Cañerías</th>
                    <th scope="col">Otro vol.</th>
                    <th scope="col">Vol. Tk</th>
                    <th scope="col">Litros</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><input disabled placeholder='0' value={d.hora} className='form-control' type='time' /></td>
                        <td><input disabled placeholder='0' value={d.altura_interna} className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' value={d.api60} className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' value={d.temperatura_interna_promedio} className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' value={api60factor6(Number(d?.densidad_laboratorio), Number(d?.temperatura_laboratorio), Number(d?.temperatura_interna_promedio)).factor6 || ""} className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalCanerias} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalOtroVol} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalVolTk} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalLitros} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>
    )
}