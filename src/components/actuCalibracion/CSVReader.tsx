import React, { CSSProperties } from 'react';

import { useCSVReader } from 'react-papaparse';

const styles = {
  csvReader: {
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    backgroundColor:'white',
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '60%',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'green',
  } as CSSProperties,
};

export default function CSVReader({setEnableAccept, setNewCalibration}) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
    
      onUploadAccepted={(results: any) => {
          if(results.data.length>0){
            setEnableAccept(true)
            setNewCalibration(results.data)
          }
      }}
    >
      {({ 
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
      }: any) => (
        <>
          <div style={styles.csvReader}>
          <button {...getRootProps()} type="button" className="btn btn-success">Buscar CSV</button>
            <div style={styles.acceptedFile}>
              {acceptedFile && acceptedFile.name}
            </div>
            <button {...getRemoveFileProps()} className="btn btn-danger">Limpiar</button>

          </div>
          <ProgressBar style={styles.progressBarBackgroundColor} />
        </>
      )}
    </CSVReader>
  );
}