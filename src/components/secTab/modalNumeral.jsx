import React, { useState, useEffect } from 'react'
import { endpointApi } from '../../helpers/variableApi'

export const ModalNumerales = () => {

  const [numeral1, setNumeral1] = useState('')
  const [numeral2, setNumeral2] = useState('')
  const [numeral3, setNumeral3] = useState('')
  const [numeral4, setNumeral4] = useState('')
  const [numeral5, setNumeral5] = useState('')
  const [numeral6, setNumeral6] = useState('')

 return <div>
<button type="button" className="btn btnNumeral" data-bs-toggle="modal" data-bs-target="#exampleModal">
  +
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Numerales Cut-off</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input placeholder='1° Medida' className='form-control' type='number' value={numeral1} onChange={e => setNumeral1(e.target.value)} />
        <input placeholder='2° Medida' className='form-control' type='number' value={numeral2} onChange={e => setNumeral2(e.target.value)} />
        <input placeholder='3° Medida' className='form-control' type='number' value={numeral3} onChange={e => setNumeral3(e.target.value)} />
        <input placeholder='4° Medida' className='form-control' type='number' value={numeral4} onChange={e => setNumeral4(e.target.value)} />
        <input placeholder='5° Medida' className='form-control' type='number' value={numeral5} onChange={e => setNumeral5(e.target.value)} />
        <input placeholder='6° Medida' className='form-control' type='number' value={numeral6} onChange={e => setNumeral6(e.target.value)} />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" className="btns btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>

</div>
}