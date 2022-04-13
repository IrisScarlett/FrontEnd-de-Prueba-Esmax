import React, { useState, useEffect } from 'react'

export const AnalisisVariaciones = () => {
  const [fecha, setFecha] = useState('')
  const [nombre, setNombre] = useState('Gasolina 93 C/ Plomo')

  //botones
  const [purad, setPurad] = useState(true)
  const [gas93, setGas93] = useState(false)
  const [gas97, setGas97] = useState(false)
  const [dieselA1, setDieselA1] = useState(false)
  const [kerosene, setKerosene] = useState(false)
  const [jetA1, setJetA1] = useState(false)
  const [dINV, setDINV] = useState(false)
  const [jetI, setJetI] = useState(false)
  const [biodiesel, setBioDiesel] = useState(false)
  const [dieselBA, setDieselBA] = useState(false)

  //inputs purad
  const [puradRF, setPuradRF] = useState('')
  const [puradSL, setPuradSL] = useState('')
  const [puradVariacion, setPuradVariacion] = useState('')
  const [puradCausa1, setPuradCausa1] = useState('')
  const [puradCausa2, setPuradCausa2] = useState('')
  const [puradCausa3, setPuradCausa3] = useState('')
  const [puradCausa4, setPuradCausa4] = useState('')
  const [puradC1Input1, setPuradC1Input1] = useState('')
  const [puradC1Input2, setPuradC1Input2] = useState('')
  const [puradC2Input1, setPuradC2Input1] = useState('')
  const [puradC2Input2, setPuradC2Input2] = useState('')
  const [puradC3Input1, setPuradC3Input1] = useState('')
  const [puradC3Input2, setPuradC3Input2] = useState('')
  const [puradC4Input1, setPuradC4Input1] = useState('')
  const [puradC4Input2, setPuradC4Input2] = useState('')
  const [puradTotalI1, setPuradTotalI1] = useState('')
  const [puradTotalI2, setPuradTotalI2] = useState('')

  // inputs gas93
  const [gas93RF, setGas93RF] = useState('')
  const [gas93SL, setGas93SL] = useState('')
  const [gas93Variacion, setGas93Variacion] = useState('')
  const [gas93Causa1, setGas93Causa1] = useState('')
  const [gas93Causa2, setGas93Causa2] = useState('')
  const [gas93Causa3, setGas93Causa3] = useState('')
  const [gas93Causa4, setGas93Causa4] = useState('')
  const [gas93C1Input1, setGas93C1Input1] = useState('')
  const [gas93C1Input2, setGas93C1Input2] = useState('')
  const [gas93C2Input1, setGas93C2Input1] = useState('')
  const [gas93C2Input2, setGas93C2Input2] = useState('')
  const [gas93C3Input1, setGas93C3Input1] = useState('')
  const [gas93C3Input2, setGas93C3Input2] = useState('')
  const [gas93C4Input1, setGas93C4Input1] = useState('')
  const [gas93C4Input2, setGas93C4Input2] = useState('')
  const [gas93TotalI1, setGas93TotalI1] = useState('')
  const [gas93TotalI2, setGas93TotalI2] = useState('')

  //inputs gas97
  const [gas97RF, setGas97RF] = useState('')
  const [gas97SL, setGas97SL] = useState('')
  const [gas97Variacion, setGas97Variacion] = useState('')
  const [gas97Causa1, setGas97Causa1] = useState('')
  const [gas97Causa2, setGas97Causa2] = useState('')
  const [gas97Causa3, setGas97Causa3] = useState('')
  const [gas97Causa4, setGas97Causa4] = useState('')
  const [gas97C1Input1, setGas97C1Input1] = useState('')
  const [gas97C1Input2, setGas97C1Input2] = useState('')
  const [gas97C2Input1, setGas97C2Input1] = useState('')
  const [gas97C2Input2, setGas97C2Input2] = useState('')
  const [gas97C3Input1, setGas97C3Input1] = useState('')
  const [gas97C3Input2, setGas97C3Input2] = useState('')
  const [gas97C4Input1, setGas97C4Input1] = useState('')
  const [gas97C4Input2, setGas97C4Input2] = useState('')
  const [gas97TotalI1, setGas97TotalI1] = useState('')
  const [gas97TotalI2, setGas97TotalI2] = useState('')

  //inputs diesel a1
  const [dieselA1RF, setDieselA1RF] = useState('')
  const [dieselA1SL, setDieselA1SL] = useState('')
  const [dieselA1Variacion, setDieselA1Variacion] = useState('')
  const [dieselA1Causa1, setDieselA1Causa1] = useState('')
  const [dieselA1Causa2, setDieselA1Causa2] = useState('')
  const [dieselA1Causa3, setDieselA1Causa3] = useState('')
  const [dieselA1Causa4, setDieselA1Causa4] = useState('')
  const [dieselA1C1Input1, setDieselA1C1Input1] = useState('')
  const [dieselA1C1Input2, setDieselA1C1Input2] = useState('')
  const [dieselA1C2Input1, setDieselA1C2Input1] = useState('')
  const [dieselA1C2Input2, setDieselA1C2Input2] = useState('')
  const [dieselA1C3Input1, setDieselA1C3Input1] = useState('')
  const [dieselA1C3Input2, setDieselA1C3Input2] = useState('')
  const [dieselA1C4Input1, setDieselA1C4Input1] = useState('')
  const [dieselA1C4Input2, setDieselA1C4Input2] = useState('')
  const [dieselA1TotalI1, setDieselA1TotalI1] = useState('')
  const [dieselA1TotalI2, setDieselA1TotalI2] = useState('')

  //inputs kerosene
  const [keroseneRF, setKeroseneRF] = useState('')
  const [keroseneSL, setKeroseneSL] = useState('')
  const [keroseneVariacion, setKeroseneVariacion] = useState('')
  const [keroseneCausa1, setKeroseneCausa1] = useState('')
  const [keroseneCausa2, setKeroseneCausa2] = useState('')
  const [keroseneCausa3, setKeroseneCausa3] = useState('')
  const [keroseneCausa4, setKeroseneCausa4] = useState('')
  const [keroseneC1Input1, setKeroseneC1Input1] = useState('')
  const [keroseneC1Input2, setKeroseneC1Input2] = useState('')
  const [keroseneC2Input1, setKeroseneC2Input1] = useState('')
  const [keroseneC2Input2, setKeroseneC2Input2] = useState('')
  const [keroseneC3Input1, setKeroseneC3Input1] = useState('')
  const [keroseneC3Input2, setKeroseneC3Input2] = useState('')
  const [keroseneC4Input1, setKeroseneC4Input1] = useState('')
  const [keroseneC4Input2, setKeroseneC4Input2] = useState('')
  const [keroseneTotalI1, setKeroseneTotalI1] = useState('')
  const [keroseneTotalI2, setKeroseneTotalI2] = useState('')

  //inputs jeta1
  const [jetA1RF, setJetA1RF] = useState('')
  const [jetA1SL, setJetA1SL] = useState('')
  const [jetA1Variacion, setJetA1Variacion] = useState('')
  const [jetA1Causa1, setJetA1Causa1] = useState('')
  const [jetA1Causa2, setJetA1Causa2] = useState('')
  const [jetA1Causa3, setJetA1Causa3] = useState('')
  const [jetA1Causa4, setJetA1Causa4] = useState('')
  const [jetA1C1Input1, setJetA1C1Input1] = useState('')
  const [jetA1C1Input2, setJetA1C1Input2] = useState('')
  const [jetA1C2Input1, setJetA1C2Input1] = useState('')
  const [jetA1C2Input2, setJetA1C2Input2] = useState('')
  const [jetA1C3Input1, setJetA1C3Input1] = useState('')
  const [jetA1C3Input2, setJetA1C3Input2] = useState('')
  const [jetA1C4Input1, setJetA1C4Input1] = useState('')
  const [jetA1C4Input2, setJetA1C4Input2] = useState('')
  const [jetA1TotalI1, setJetA1TotalI1] = useState('')
  const [jetA1TotalI2, setJetA1TotalI2] = useState('')

  //inputs D INV
  const [dINVRF, setDINVVF] = useState('')
  const [dINVSL, setDINVSL] = useState('')
  const [dINVVariacion, setDINVVariacion] = useState('')
  const [dINVCausa1, setDINVCausa1] = useState('')
  const [dINVCausa2, setDINVCausa2] = useState('')
  const [dINVCausa3, setDINVCausa3] = useState('')
  const [dINVCausa4, setDINVCausa4] = useState('')
  const [dINVC1Input1, setDINVC1Input1] = useState('')
  const [dINVC1Input2, setDINVC1Input2] = useState('')
  const [dINVC2Input1, setDINVC2Input1] = useState('')
  const [dINVC2Input2, setDINVC2Input2] = useState('')
  const [dINVC3Input1, setDINVC3Input1] = useState('')
  const [dINVC3Input2, setDINVC3Input2] = useState('')
  const [dINVC4Input1, setDINVC4Input1] = useState('')
  const [dINVC4Input2, setDINVC4Input2] = useState('')
  const [dINVTotalI1, setDINVTotalI1] = useState('')
  const [dINVTotalI2, setDINVTotalI2] = useState('')

  //inputs JET I
  const [jetIRF, setJetIRF] = useState('')
  const [jetISL, setJetISL] = useState('')
  const [jetIVariacion, setJetIVariacion] = useState('')
  const [jetICausa1, setJetICausa1] = useState('')
  const [jetICausa2, setJetICausa2] = useState('')
  const [jetICausa3, setJetICausa3] = useState('')
  const [jetICausa4, setJetICausa4] = useState('')
  const [jetIC1Input1, setJetIC1Input1] = useState('')
  const [jetIC1Input2, setJetIC1Input2] = useState('')
  const [jetIC2Input1, setJetIC2Input1] = useState('')
  const [jetIC2Input2, setJetIC2Input2] = useState('')
  const [jetIC3Input1, setJetIC3Input1] = useState('')
  const [jetIC3Input2, setJetIC3Input2] = useState('')
  const [jetIC4Input1, setJetIC4Input1] = useState('')
  const [jetIC4Input2, setJetIC4Input2] = useState('')
  const [jetITotalI1, setJetITotalI1] = useState('')
  const [jetITotalI2, setJetITotalI2] = useState('')

  //inputs biodiesel
  const [biodieselRF, setBiodieselRF] = useState('')
  const [biodieselSL, setBiodieselSL] = useState('')
  const [biodieselVariacion, setBiodieselVariacion] = useState('')
  const [biodieselCausa1, setBiodieselCausa1] = useState('')
  const [biodieselCausa2, setBiodieselCausa2] = useState('')
  const [biodieselCausa3, setBiodieselCausa3] = useState('')
  const [biodieselCausa4, setBiodieselCausa4] = useState('')
  const [biodieselC1Input1, setBiodieselC1Input1] = useState('')
  const [biodieselC1Input2, setBiodieselC1Input2] = useState('')
  const [biodieselC2Input1, setBiodieselC2Input1] = useState('')
  const [biodieselC2Input2, setBiodieselC2Input2] = useState('')
  const [biodieselC3Input1, setBiodieselC3Input1] = useState('')
  const [biodieselC3Input2, setBiodieselC3Input2] = useState('')
  const [biodieselC4Input1, setBiodieselC4Input1] = useState('')
  const [biodieselC4Input2, setBiodieselC4Input2] = useState('')
  const [biodieselTotalI1, setBiodieselTotalI1] = useState('')
  const [biodieselTotalI2, setBiodieselTotalI2] = useState('')

  //inputs diesel BA
  const [dieselBARF, setDieselBARF] = useState('')
  const [dieselBASL, setDieselBASL] = useState('')
  const [dieselBAVariacion, setDieselBAVariacion] = useState('')
  const [dieselBACausa1, setDieselBACausa1] = useState('')
  const [dieselBACausa2, setDieselBACausa2] = useState('')
  const [dieselBACausa3, setDieselBACausa3] = useState('')
  const [dieselBACausa4, setDieselBACausa4] = useState('')
  const [dieselBAC1Input1, setDieselBAC1Input1] = useState('')
  const [dieselBAC1Input2, setDieselBAC1Input2] = useState('')
  const [dieselBAC2Input1, setDieselBAC2Input1] = useState('')
  const [dieselBAC2Input2, setDieselBAC2Input2] = useState('')
  const [dieselBAC3Input1, setDieselBAC3Input1] = useState('')
  const [dieselBAC3Input2, setDieselBAC3Input2] = useState('')
  const [dieselBAC4Input1, setDieselBAC4Input1] = useState('')
  const [dieselBAC4Input2, setDieselBAC4Input2] = useState('')
  const [dieselBATotalI1, setDieselBATotalI1] = useState('')
  const [dieselBATotalI2, setDieselBATotalI2] = useState('')

  useEffect(() => {
    setFecha()
  }, [])

  const handlePurad = (e) => {
    e.preventDefault()
    setNombre('Gasolina 93 C/ Plomo')
    setPurad(!purad)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleGas93 = (e) => {
    e.preventDefault()
    setNombre('Gasolina 93 S/ Plomo')
    setPurad(false)
    setGas93(!gas93)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleGas97 = (e) => {
    e.preventDefault()
    setNombre('Gasolina 97 S/ Plomo')
    setPurad(false)
    setGas93(false)
    setGas97(!gas97)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleDieselA1 = (e) => {
    e.preventDefault()
    setNombre('Diesel A1')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(!dieselA1)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleKerosene = (e) => {
    e.preventDefault()
    setNombre('Kerosene')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(!kerosene)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleJetA1 = (e) => {
    e.preventDefault()
    setNombre('Turbo Jet A1')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(!jetA1)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleDINV = (e) => {
    e.preventDefault()
    setNombre('Diesel Invierno')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(!dINV)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleJetI = (e) => {
    e.preventDefault()
    setNombre('Jet industrial')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(!jetI)
    setBioDiesel(false)
    setDieselBA(false)
  }

  const handleBiodiesel = (e) => {
    e.preventDefault()
    setNombre('Biodiesel')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(!biodiesel)
    setDieselBA(false)
  }

  const handleDieselBA = (e) => {
    e.preventDefault()
    setNombre('Diesel Bajo Azufre')
    setPurad(false)
    setGas93(false)
    setGas97(false)
    setDieselA1(false)
    setKerosene(false)
    setJetA1(false)
    setDINV(false)
    setJetI(false)
    setBioDiesel(false)
    setDieselBA(!dieselBA)
  }

  return (
    <div>
      <h2 className='titulos text-center p-2 mb-4'>Analisis de Variaciones</h2>
      <div className='input-group'>
        <span className='input-group-text spanLabel'>Fecha</span>
        <input disabled value='2022-03-23' type='date' aria-label='Username' aria-describedby='basic-addon1' />
      </div>

      <div className="container mt-4">
        <div className="row align-items-start">
          <button onClick={handlePurad} className="col" type='button'>Purad 97-10</button>
          <button onClick={handleGas93} className="col" type='button'>Gas 93-UL</button>
          <button onClick={handleGas97} className="col" type='button'>Gas 97</button>
          <button onClick={handleDieselA1} className="col" type='button'>Diesel A1</button>
          <button onClick={handleKerosene} className="col" type='button'>Kerosene</button>
          <button onClick={handleJetA1} className="col" type='button'>Jet A1</button>
          <button onClick={handleDINV} className="col" type='button'>D. Inv</button>
          <button onClick={handleJetI} className="col" type='button'>Jet I</button>
          <button onClick={handleBiodiesel} className="col" type='button'>Biodiesel</button>
          <button onClick={handleDieselBA} className="col" type='button'>Diesel BA</button>
        </div>
      </div>
      {purad &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
          </div>
          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='row'>
            <div className='input-group mb-3'>
              <input className='col-4 ms-3 form-control text-center' type='number' disabled />
              <input className='col-4 ms-4 form-control text-center' type='number' disabled />
              <input className='col mx-3 form-control text-center' type='number' disabled />
            </div>
            </div>
          </div>
          <div className='row d-flex'>
            <div className='col mt-3'>
              <div className='input-group'>
                <input className='form-control text-center' type='text' />
              </div>
            </div>
            <div className='col'>
            <div className='row'>
            <div className='col-4 ms-4 mt-3'>
              <div className='input-group'>
                <input className='form-control text-center' type='number' />
              </div>
            </div>
            <div className='col-4 mt-3'>
              <div className='input-group'>
                <input className='form-control text-center' type='number' />
              </div>
              </div>
            </div>
            </div>
          </div>
          <div className='row d-flex'> 
            <div className='col mt-3'>
              <div className='input-group'>
                <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
              </div>
            </div>
            <div className='col'>
            <div className='row'>
              <div className='col-4 ms-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className='mx-4 mt-3'>
            <div className='d-flex justify-content-center'>
              <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
            </div>
          </div>
        </div>
      }
      {gas93 &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {gas97 &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {dieselA1 &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {kerosene &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {jetA1 &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {dINV &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {jetI &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {biodiesel &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {dieselBA &&
        <div className="row my-3 pb-3 border border-3">
          <div className='col'>
            <h4 className='mt-5 text-center'>Producto</h4>
            <p className='mb-4 text-center'>{nombre}</p>
            <div className='mt-5'>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input className='form-control text-center' type='text' />
                </div>
              </div>
              <div className='mx-4 mt-3'>
                <div className='input-group d-flex justify-content-end'>
                  <input disabled className='form-control text-center' placeholder='Totales finales iguales' type='text' />
                </div>
              </div>
            </div>
            <div className='mx-4 mt-3'>
              <div className='d-flex justify-content-center'>
                <button className='btn btns mt-4 col-4' type='button'>Agregar Causa</button>
              </div>
            </div>
          </div>

          <div className='col'>
            <h6 className='text-center mt-4'>60 Grados F.</h6>
            <div className='row mt-2'>
              <p className='col text-center'>Recuento Físico</p>
              <p className='col text-center'>SAP Libros MB5B</p>
              <p className='col text-center'>Variación</p>
            </div>
            <div className='input-group mb-3'>
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
              <input className='col-3 mx-3 form-control text-center' type='number' disabled />
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
              <div className='col-3 mx-4 mt-3'>
                <div className='input-group'>
                  <input className='form-control text-center' type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className='d-flex justify-content-center'>
        <button className='btn btns mt-4 col-4' type='button'> Imprimir </button>
      </div>

    </div>
  )
}
