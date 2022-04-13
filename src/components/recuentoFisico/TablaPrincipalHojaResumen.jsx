import React from 'react'

export const TablaPrincipalHojaResumen = ({ datos }) => {
  return (

    <tr className='animate__animated animate__fadeIn'>
      <td className='p-1' id='numero_estanque'> {datos?.numero_estanque}</td>
      <td className='p-1' id='nombre_producto'>{datos?.nombre_producto}</td>
      <td className='p-1' id='hora'>{(datos?.hora_rf).slice(0, 5)}</td>
      <td className='p-1' id='alt_externa'>{datos?.altura_externa_rf}</td>
      <td className='p-1' id='alt_intena'>{datos?.altura_interna_rf}</td>
      <td className='p-1' id='agua'>{datos?.nivel_agua_rf}</td>
      <td className='p-1' id='densidad_obs'>{datos?.densidad_observada_rf}</td>
      <td className='p-1' id='temp_obs'>{datos?.temperatura_observada_rf}</td>
      <td className='p-1' id='factor_t6'>{datos?.factor6_rf}</td>
      <td className='p-1' id='factor_t13'>{datos?.factor13_rf}</td>
      <td className='p-1' id='vol_canerias'>{datos?.volumen_canerias_rf}</td>
      <td className='p-1' id='vol_medidores'>{datos?.volumen_medidores_rf}</td>
      <td className='p-1' id='vol_otros'>{datos?.volumen_otros_rf}</td>
      <td className='p-1' id='vol_estanque'>{datos?.volumen_estanque_rf}</td>
      <td className='p-1' id='vol_natural'>{datos?.volumen_natural_rf}</td>
      <td className='p-1' id='vol_60f'>{datos?.volumen_60f_rf}</td>
      <td className='p-1' id='vol_kilos'>{datos?.volumen_kilos_rf}</td>

    </tr>
  )
}
