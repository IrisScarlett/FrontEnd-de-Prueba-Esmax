import React, { useState, useEffect, useContext } from 'react';
import { addPuntos } from '../../helpers/addPuntos';
import { ModalNumerales } from './modalNumeral';


export const Numerales = ({ datosLibreta }) => {
    const [totalNumerales, setTotalNumerales] = useState(0)

    return (
        <table className="table table-primary table-striped table-hover table-bordered text-center">
            <thead className='subtitulosTSEC align-middle'>
                <tr>
                    <th scope='col'>Agregar Numeral</th>
                    <th scope='col'>Numeral cut-off</th>
                    <th scope='col'>Numeral medición</th>
                    <th scope='col'>Total salidas</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><ModalNumerales /></td>
                        <td><input disabled className='form-control' type='number' /></td>
                        <td><input disabled value={(parseInt(d.primera_medicion) + parseInt(d.segunda_medicion) + parseInt(d.tercera_medicion) + parseInt(d.cuarta_medicion) + parseInt(d.quinta_medicion) + parseInt(d.sexta_medicion))} className='form-control' type='number' /></td>
                        <td><input disabled className='form-control' type='number' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input style={{ display: 'none' }} type="number" disabled className='form-control ' /></td>
                    <td><input value={totalNumerales} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>
    )
}