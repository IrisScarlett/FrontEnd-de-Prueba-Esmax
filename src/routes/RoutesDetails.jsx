/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import App from '../App'
import { HomeScreen } from '../components/UI/HomeScreen'
import { PlantasTab } from '../components/plantasTab/PlantasTab'
import { EstanquesTab } from '../components/estanquesTab/EstanquesTab'
import { UserTab } from '../components/empleadosTab/UserTab'
import { ProductosTab } from '../components/ProductosTab/ProductosTab'
import { ConfiguracionLineas } from '../components/configuracionLineas/ConfiguracionLineas'
import { Login } from '../components/auth/Login'
import { LibretaMedicion } from '../components/LibretaMedicion/LibretaMedicion'
import { ListaLibretaMediciones } from '../components/LibretaMedicion/ListaLibretaMediciones'
import { HojaMedicion } from '../components/hojaMedicion/HojaMedicion'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { endpointApi } from '../helpers/variableApi'
import { RecuentoFisico } from '../components/recuentoFisico/RecuentoFisico'
import { AnalisisVariaciones } from '../components/analisisVariacion/AnalisisVariaciones'
import { SaldoLibro } from '../components/saldoLibro/SaldoLibro'
import { Bitacora } from '../components/bitacora/Bitacora'
import { SEC } from '../components/secTab/SEC'
import { HojasResumen } from '../components/recuentoFisico/HojasResumen'
import { ListaBitacoras } from '../components/bitacora/ListaBitacoras'

export const RoutesDetails = ({ setDatosUser }) => {
  const location = useLocation()
  const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(false)
  useEffect(async () => {
    const token = localStorage.getItem('token')
    location?.pathname !== '/' && localStorage.setItem('url', location?.pathname)
    if (token != null) {
      const { data: { ok, datos } } = await axios.post(endpointApi + '/api/auth/validate', { token })
      if (ok) {
        setAuth(true)
        setDatosUser(datos)
      } else {
        navigate('/')
        setAuth(false)
      }
    } else {
      setAuth(false)
    }
    document.querySelector('.offcanvas')?.classList.remove('show')
    document.querySelector('.modal-backdrop')?.classList.remove('show')
  }, [location.pathname])
  return (
    <Routes>
      <Route
        path='/' element={
          <PublicRoute auth={auth}>
            <Routes>
              <Route path='' element={<Login />} />
            </Routes>
          </PublicRoute>
   }
      />

      <Route
        path='/*' element={
          <PrivateRoute auth={auth}>
            <Routes>
              <Route path='/*' element={<App />}>
                <Route path='home' element={<HomeScreen />} />
                <Route path='users' element={<UserTab />} />
                <Route path='plants' element={<PlantasTab />} />
                <Route path='estanques' element={<EstanquesTab />} />
                <Route path='products' element={<ProductosTab />} />
                <Route path='lineas' element={<ConfiguracionLineas />} />
                <Route path='libreta' element={<LibretaMedicion />} />
                <Route path='libretas' element={<ListaLibretaMediciones />} />
                <Route path='hojamedicion' element={<HojaMedicion />} />
                <Route path='recuentofisico' element={<RecuentoFisico />} />
                <Route path='analisisvariaciones' element={<AnalisisVariaciones />} />
                <Route path='saldolibro' element={<SaldoLibro />} />
                <Route path='bitacora' element={<Bitacora />} />
                <Route path='sec' element={<SEC />} />
                <Route path='hojasresumen' element={<HojasResumen />} />
                <Route path='listabitacoras' element={<ListaBitacoras />} />

              </Route>
            </Routes>
          </PrivateRoute>
}
      />
    </Routes>
  )
}
