import React, { useState, useEffect } from 'react';

export const SaldoLibro = () => {

    const handleEnter = (e) => {
        if (e.key.toLowerCase() === 'enter') {
          e.preventDefault()
          const form = e.target.form
          const index = [...form].indexOf(e.target)
          form.elements[index + 1].focus()
          form.elements[index + 1].select()
        }
      }

    return (
        <div><h2 className='titulos text-center p-2 mb-4'>Saldo Libro SAP</h2>
        <div className='col-5 mx-auto'>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Fecha cierre</span>
                <input disabled className='form-control text-center' value='2022-03-24' type='date' aria-label='Username' aria-describedby='basic-addon1' />
            </div>
            <div className='input-group mt-2'>
                <label className='input-group-text spanLabelSL'>PRODUCTO</label>
                <label className='input-group-text spanLabelSL mx-auto'>VOLUMEN (LT)</label>
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Gas 93</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Gas 93 UL</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Gas 97</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Diesel A1</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Kerosene</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Jet A1</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Diesel Inv</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Biodiesel</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Diesel BA</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Fuel Oil N. 6</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
            <div className='input-group'>
                <span className='input-group-text spanLabelSL'>Jet Industrial</span>
                <input type='number' step='any' id='' placeholder='' className='form-control' aria-label='Username' aria-describedby='basic-addon1' onKeyDown={handleEnter} />
            </div>
        </div>
        </div>
    )
}