import React from 'react'
import { CSVLink } from 'react-csv'

export const DescargarCSV2 = ({ data, filename }) => {
  return (
    <CSVLink
      className='btnDownloadCSV'
      data={data} filename={filename} onClick={(event, done) => {
        document.querySelector('.btnCerrarcsv').click()
      }}
    >
      Descargar <i className='fas fa-download ms-2' />
    </CSVLink>
  )
}
