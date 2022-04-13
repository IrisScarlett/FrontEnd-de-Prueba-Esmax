/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

export const NavSide = () => {
  // eslint-disable-next-line no-unused-vars
  const { datosUser: { nombre, cargo } } = useContext(UserContext)
  // items navbar
  const itemsOperacionPlantaUsuarios = [
    { name: 'Plantas', to: '/plants', icono: 'fas fa-industry' },
    { name: 'Estanques', to: '/estanques', icono: 'fab fa-bitbucket' },
    { name: 'Productos', to: '/products', icono: 'fas fa-gas-pump' },
    { name: 'Configuración líneas', to: '/lineas', icono: 'fas fa-faucet' },
    { name: 'Libretas de medición', to: '/libretas', icono: 'fas fa-file-alt' },
    { name: 'Hoja de medición', to: '/hojamedicion', icono: 'fas fa-book-open' },
    { name: 'Recuento Físico', to: '/recuentofisico', icono: 'fas fa-balance-scale-left' },
    { name: 'Análisis Variaciones', to: '/analisisvariaciones', icono: 'fas fa-balance-scale-left' },
    { name: 'Saldo Libro', to: '/saldolibro', icono: 'fas fa-balance-scale-left' },
    { name: 'Bitácoras', to: '/listabitacoras', icono: 'fas fa-book' },
    { name: 'SEC', to: '/sec', icono: 'fas fa-archive' }
  ]
  const itemsOperacionPlantaAdmins = [
    { name: 'Empleados', to: '/users', icono: 'fas fa-users' },
    { name: 'Plantas', to: '/plants', icono: 'fas fa-industry' },
    { name: 'Estanques', to: '/estanques', icono: 'fab fa-bitbucket' },
    { name: 'Productos', to: '/products', icono: 'fas fa-gas-pump' },
    { name: 'Configuración líneas', to: '/lineas', icono: 'fas fa-faucet' },
    { name: 'Libretas de medición', to: '/libretas', icono: 'fas fa-file-alt' },
    { name: 'Hoja de medición', to: '/hojamedicion', icono: 'fas fa-book-open' },
    { name: 'Recuento Físico', to: '/recuentofisico', icono: 'fas fa-balance-scale-left' },
    { name: 'Análisis Variaciones', to: '/analisisvariaciones', icono: 'fas fa-calculator' },
    { name: 'Saldo Libro', to: '/saldolibro', icono: 'fas fa-clipboard' },
    { name: 'Bitácoras', to: '/listabitacoras', icono: 'fas fa-book' },
    { name: 'SEC', to: '/sec', icono: 'fas fa-archive' }

  ]
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    navigate('./')
  }

  return (
    <nav className='navbar navbar-light bg-light fixed-left'>
      <div className='container-fluid'>
        <div><img className='logoNav' src='img/esmax_logo.png' alt='' /></div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasNavbar'
          aria-controls='offcanvasNavbar'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <div
          className='offcanvas offcanvas-end'
          tabIndex='-1'
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
        >
          <div className='offcanvas-header'>
            <img src='img/esmax_logo.png' className='offcanvas-title' id='offcanvasNavbarLabel' />

            <button
              type='button'
              className='btn-close text-reset text-black'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            />
          </div>
          <div className='offcanvas-body'>
            <h4 className='text-center mb-3'>Bienvenid@ {nombre?.split(' ')[0]}!</h4>
            <Link className='nav-link tituloAcordion' to='/home'>
              <div className='row'>
                <div className='col-2'><i className='me-3 fas fa-home' />
                </div>
                <div className='col'>Home</div>
              </div>
            </Link>
            <Link className='nav-link tituloAcordion' to='/home'>
              <div className='row'>
                <div className='col-2'> <i className='ms-1 fas fa-id-badge' />
                </div>
                <div className='col'>Profile</div>
              </div>

            </Link>
            {/* prueba acordeon */}
            <div className='accordion accordion-flush' id='accordionFlushExample'>

              {/* item1 */}
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingOne'>
                  <button className='accordion-button collapsed tituloAcordionDesplegable' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseOne' aria-expanded='false' aria-controls='flush-collapseOne'>
                    <i className='fas fa-list-ul me-4' />Operación planta
                  </button>
                </h2>
                <div id='flush-collapseOne' className='accordion-collapse collapse' aria-labelledby='flush-headingOne' data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>
                    <ul className='navbar-nav justify-content-end flex-grow-1 pe-3 ms-2'>
                      {
                        (cargo == 1 ? itemsOperacionPlantaAdmins : itemsOperacionPlantaUsuarios).map((item) =>

                          <li key={item.name} className='nav-item'>
                            <Link className='nav-link' to={item.to}>
                              <i className={`me-3 ${item.icono}`} />
                              {item.name}
                            </Link>
                          </li>)
                    }
                    </ul>
                  </div>
                </div>
              </div>
              {/* item 2 */}
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingTwo'>
                  <button className='accordion-button collapsed tituloAcordionDesplegable' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseTwo' aria-expanded='false' aria-controls='flush-collapseTwo'>
                    <i className='fas fa-list-ul me-4' />Seguridad
                  </button>
                </h2>
                <div id='flush-collapseTwo' className='accordion-collapse collapse' aria-labelledby='flush-headingTwo' data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>.</div>
                </div>
              </div>
              {/* item3 */}
              <div className='accordion-item'>
                <h2 className='accordion-header' id='flush-headingThree'>
                  <button className='accordion-button collapsed tituloAcordionDesplegable' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapseThree' aria-expanded='false' aria-controls='flush-collapseThree'>
                    <i className='fas fa-list-ul me-4' />Entrenamiento
                  </button>
                </h2>
                <div id='flush-collapseThree' className='accordion-collapse collapse' aria-labelledby='flush-headingThree' data-bs-parent='#accordionFlushExample'>
                  <div className='accordion-body'>.</div>
                </div>
              </div>

              <div className='contLogout'>  <i onClick={handleLogout} className='fas fa-sign-out-alt btnLogout' /></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
