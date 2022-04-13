import React, { useState, useEffect, useContext } from 'react';

export const Comentarios = ({ datosLibreta }) => {
    return (
        <table className="table table-primary table-striped table-hover table-bordered text-center">
            <thead className='tituloTSECComentarios align-middle'>
                <tr>
                    <th scope="col">Comentarios</th>
                </tr>
            </thead>
            <tbody>
                {datosLibreta?.map((d) =>
                    <tr key={d.dias}>
                        <td><input className='form-control' type='text' /></td>
                    </tr>
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td><input style={{ visibility: 'hidden' }} type="number" disabled className='form-control ' /></td>
                </tr>
            </tfoot>
        </table>
    )
}