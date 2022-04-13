import React, { useState, useEffect, useContext } from 'react';
import { addPuntos } from '../../helpers/addPuntos';

export const IngresoLitros = ({ datosHojasOleoducto, datosHojasTransferencia }) => {
    const [totalIngresos, setTotalIngresos] = useState(0)

    
    return (
        <table className="table table-primary table-striped table-hover table-bordered">
            <thead className='subtitulosTSEC align-middle text-center'>
                <tr>
                    <th scope="col">Día</th>
                    <th scope="col">BT Oleoducto</th>
                    <th scope="col">Transferencia</th>
                    <th scope="col">Drenajes</th>
                    <th scope="col">Calibración</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {datosHojasOleoducto?.map((o) =>
                    <tr key={o.dias}>
                        <th scope="row">{o.dias}</th>
                        <td><input value={o.gto || 0} disabled placeholder='0' className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td className='text-center'><h5>Variación</h5></td>
                    <td className='text-center'><h5>Acumulada</h5></td>
                    <td><input value={totalIngresos} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>

    )
}