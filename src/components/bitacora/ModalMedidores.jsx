import React, { useState } from 'react'
import { addPuntos, removeNonNumeric } from '../../helpers/addPuntos'

export const ModalMedidores = ({ setFormRegistro, formRegistro, numBitacora }) => {
  const [medidoresIniciales, setMedidoresIniciales] = useState({
    medidor1: '0',
    medidor2: '0',
    medidor3: '0',
    medidor4: '0',
    medidor5: '0',
    medidor6: '0'
  })
  const [medidoresFinales, setMedidoresFinales] = useState({
    medidor1: '0',
    medidor2: '0',
    medidor3: '0',
    medidor4: '0',
    medidor5: '0',
    medidor6: '0'
  })

  const handleClickModalMedidores = () => {
    const arrayIniciales = Object.values(medidoresIniciales).map(m => {
      const num = parseInt(m.replace('.', ''))
      return (isNaN(num)) ? 0 : num
    })
    const arrayFinales = Object.values(medidoresFinales).map(m => {
      const num = parseInt(m.replace('.', ''))
      return (isNaN(num)) ? 0 : num
    })
    const diferenciaMedidores = arrayIniciales.reduce((a, b) => a + b) - arrayFinales.reduce((a, b) => a + b)
    console.log(diferenciaMedidores)
    setFormRegistro({
      ...formRegistro,
      volDesp: addPuntos(removeNonNumeric(diferenciaMedidores))
    })
    // cerrar modal
    document.querySelector('.modal-backdrop').remove()
  }
  const handleEnter = (e) => {
    if (e.key.toLowerCase() === 'enter') {
      e.preventDefault()
      const form = e.target.form
      const index = [...form].indexOf(e.target)
      form.elements[index + 1].focus()
      form.elements[index + 1].select()
    }
  }

  //   const removePuntos = num => num.toString().replaceAll('.', '')

  const handleMedidoresIniciales = (e) => {
    const { name, value } = e.target
    setMedidoresIniciales({
      ...medidoresIniciales,
      [name]: addPuntos(removeNonNumeric(value))
    })
  }
  const handleMedidoresFinales = (e) => {
    const { name, value } = e.target
    setMedidoresFinales({
      ...medidoresFinales,
      [name]: addPuntos(removeNonNumeric(value))
    })
  }

  return (
    <form action=''>
      <div className='modal fade m-3 modalMedidores' id={`regBitacora${numBitacora}`} tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>Registro medidores de volumen despachado</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' />
            </div>
            <div className='modal-body'>
              <table className='table'>
                <thead className='thead-dark'>
                  <tr style={{ backgroundColor: 'rgb(97, 97, 129)', color: 'white', border: '0' }}>
                    <th scope='col' />
                    <th scope='col'>Medidor 1</th>
                    <th scope='col'>Medidor 2</th>
                    <th scope='col'>Medidor 3</th>
                    <th scope='col'>Medidor 4</th>
                    <th scope='col'>Medidor 5</th>
                    <th scope='col'>Medidor 6</th>
                  </tr>
                </thead>
                <tbody>
                  {/* iniciales */}
                  <tr>
                    <th style={{ backgroundColor: 'rgb(97, 97, 129)', color: 'white', border: '0' }} scope='row'>Inicial</th>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor1} onChange={handleMedidoresIniciales} name='medidor1' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor3} onChange={handleMedidoresIniciales} name='medidor3' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor2} onChange={handleMedidoresIniciales} name='medidor2' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor4} onChange={handleMedidoresIniciales} name='medidor4' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor5} onChange={handleMedidoresIniciales} name='medidor5' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0 m-0'><input value={medidoresIniciales.medidor6} onChange={handleMedidoresIniciales} name='medidor6' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                  </tr>
                  {/* finales */}
                  <tr>
                    <th style={{ backgroundColor: 'rgb(97, 97, 129)', color: 'white', border: '0' }} scope='row'>Final</th>
                    <td className='p-0'><input value={medidoresFinales.medidor1} onChange={handleMedidoresFinales} name='medidor1' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0'><input value={medidoresFinales.medidor2} onChange={handleMedidoresFinales} name='medidor2' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0'><input value={medidoresFinales.medidor3} onChange={handleMedidoresFinales} name='medidor3' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0'><input value={medidoresFinales.medidor4} onChange={handleMedidoresFinales} name='medidor4' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0'><input value={medidoresFinales.medidor5} onChange={handleMedidoresFinales} name='medidor5' type='text' className='medidoresModal form-control' onKeyDown={handleEnter} /></td>
                    <td className='p-0'><input value={medidoresFinales.medidor6} onChange={handleMedidoresFinales} name='medidor6' type='text' className='medidoresModal form-control' /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              <button style={{ backgroundColor: 'rgb(63, 63, 124)', color: 'white', border: '0' }} type='button' className='btn btn-primary' onClick={handleClickModalMedidores}>Añadir</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
