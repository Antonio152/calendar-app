import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = () => {
  const { startLogout, user } = useAuthStore()
  return (
    <div className="navbar navbar-dark mb-4 px-4 bgNavCalendar">
      <span className="navbar-brand">
        {' '}
        <i className="fas fa-calendar-alt" />
        &nbsp;
        {user.name}{' '}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt" />
        <span> Salir</span>
      </button>
    </div>
  )
}
