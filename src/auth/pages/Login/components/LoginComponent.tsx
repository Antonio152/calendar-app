import React, { useEffect } from 'react'
import { IRegisterComponent } from '../types/LoginPageTypes'
import { useForm } from '../../../../hooks/useForm'
import { useAuthStore } from '../../../../hooks/useAuthStore'
import Swal from 'sweetalert2'
const LoginFormFields = {
  email: '',
  password: ''
}
export const LoginComponent = ({ setActive }:IRegisterComponent) => {
  const { startLogin, errorMessage } = useAuthStore()
  const { onChangeEvent, email, password } = useForm(LoginFormFields)
  const onLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startLogin(email, password)
  }

  useEffect(() => {
    if (errorMessage !== '') {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: errorMessage
      })
    }
  }, [errorMessage])

  return (
    <form onSubmit={onLogin}>
      <h2 className='mb-3 text-center'>Inicia sesión</h2>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Email"
          name='email'
          value={email}
          onChange={onChangeEvent}
        />
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="password"
          name='password'
          placeholder="Password"
          value={password}
          onChange={onChangeEvent}
        />
        <label htmlFor="password">Password</label>
      </div>
      <div className='text-end mt-3 mb-3'>
        <a href='#'>¿Olvidaste tu contraseña?</a>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit">
          Iniciar sesión
        </button>
      </div>
      <div className='text-center mt-3'>
        <span>Tambien puedes iniciar sesión con:</span>
        <div className='d-flex gap-4 mt-3 justify-content-center'>
          <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => {}}><i className="fa-brands fa-google"></i></button>
          <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => {}}><i className="fa-brands fa-facebook"></i></button>
          <button type='button' className='btn btn-link btn-floating mx-1' onClick={() => {}}><i className="fa-brands fa-twitter"></i></button>
        </div>
      </div>
      <div className='text-center mt-4 '>
        <span>¿No eres miembro? {' '}<span className='registerTxt' onClick={() => { setActive('register') }}>Registrate</span></span>
      </div>
    </form>
  )
}
