import React, { useState, useEffect, useContext } from 'react';
import { addPuntos } from '../../helpers/addPuntos';

export const SaldoLibro = ({ datosLibreta, inventarioInicial }) => {
    const [totalSaldo, setTotalSaldo] = useState('')
    
    return (
        <table className="table table-primary table-striped table-hover table-bordered">
            <thead className='subtitulosTSEC align-middle text-center'>
                <tr>
                    <th scope="col">Saldo Libro</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><input disabled placeholder='0' className='form-control' type='number' value={addPuntos(inventarioInicial)} /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input value={totalSaldo} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>

    )
}