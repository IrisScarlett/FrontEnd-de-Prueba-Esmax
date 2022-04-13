/* eslint-disable react/jsx-indent */

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import React, { useLayoutEffect, useState } from 'react'

export const useSelect = (label, opciones, disabled = false, cargando = false) => {
  const [state, setState] = useState('')
  const [error, setError] = useState(false)
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    count > 0 && ((!state) ? setError(true) : setError(false))
  }, [state])

  const handleChange = (event) => {
    setState(event.target.value)

    setCount(count + 1)
  }

  const selectOption = () => (
    <>
      {label !== '' && <h2 className='fs-3 text-center d-block' htmlFor=''>{label}</h2>}
      <div className='constSelect row w-100'>
        <FormControl size='small' error={error}>

          {cargando
            ? <div className='spinner-border' role='status'>
              {/* <span className='spinnerSelect visually-hidden'>Loading...</span> */}
              </div>
            : <>
            <InputLabel id={label}>Seleccione</InputLabel>
            <Select
              disabled={disabled}
              labelId={label}
              id='select-helper'
              value={state}
              label='Seleccioneee'
              onChange={handleChange}
            >
              <MenuItem value=''>
                <em>Seleccione</em>
              </MenuItem>
              {opciones?.map((op) => (
                <MenuItem
                  key={op.code}
                  value={op.code}

                >
                  {op.name}
                </MenuItem>
              ))}
            </Select>
              </>}
        </FormControl>
      </div>
    </>
  )

  return [state, selectOption]
}
