import React, { useState, useEffect, useContext } from 'react';
import { addPuntos } from '../../helpers/addPuntos';

export const DifyVariacion = ({ datosLibreta }) => {

    return (
        <table className="table table-primary table-striped table-hover table-bordered">
            <thead className='subtitulosTSEC align-middle text-center'>
                <tr>
                    <th scope="col">Dif. LT</th>
                    <th scope="col">% Variación</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                        <td><input disabled placeholder='0' className='form-control' type='number' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ visibility: 'hidden' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ visibility: 'hidden' }} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>
    )
}