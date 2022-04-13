import React from 'react'

export const DanloadHojaResumen = ({ datos }) => {
  return (
    <>
      <tr className='animate__animated animate__fadeIn'>
        <th className='titulosTablaHR' scope='row' rowSpan='2'>{datos?.numero_estanque}</th>

        <th className='titulosTablaHR longitudCasillaProducto' scope='row' rowSpan='2'>{datos?.nombre_producto}</th>
        <th scope='row' className='p-1 titulosTablaHRNumeros1'>Medición</th>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>1°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.primera_medicion_rf}</td>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>2°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.segunda_medicion_rf}</td>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>3°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.tercera_medicion_rf}</td>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>4°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.cuerta_medicion_rf}</td>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>5°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.quinta_medicion_rf}</td>
        <td className='p-1 titulosTablaHRNumeros1 fw-bold'>6°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.sexta_medicion_rf}</td>
        <td className='p-1 text-start ' scope='row' rowSpan='2'>{datos?.observaciones}</td>

      </tr>
      <tr className='animate__animated animate__fadeIn'>
        <th scope='row' className='p-1 titulosTablaHRNumeros2'>Cierre</th>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>1°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.primer_cierre_rf}</td>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>2°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.segundo_cierre_rf}</td>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>3°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.tercer_cierre_rf}</td>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>4°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.cuarto_cierre_rf}</td>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>5°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.quinto_cierre_rf}</td>
        <td className='p-1 titulosTablaHRNumeros2 fw-bold'>6°</td>
        <td className='p-1 text-start longitudCasilla'>{datos?.sexto_cierre_rf}</td>

      </tr>
      <tr className='espacioTablaHR' />
    </>

  )
}
