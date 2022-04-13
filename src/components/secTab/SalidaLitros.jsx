import React, { useState, useEffect, useContext } from 'react';
import { addPuntos } from '../../helpers/addPuntos';

export const SalidaLitros = ({ datosLibreta }) => {
    const [totalSalidas, setTotalSalidas] = useState(0)

    return (
        <table className="table table-primary table-striped table-hover table-bordered">
            <thead className='subtitulosTSEC align-middle text-center'>
                <tr>
                    <th scope="col">Informe Salidas</th>
                    <th scope="col">Drenajes</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                        <td><input placeholder='0' className='form-control' type='number' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalSalidas} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>
    )
}