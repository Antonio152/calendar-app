import React, { useEffect } from 'react'
import { IRegisterComponent } from '../types/LoginPageTypes'
import { useForm } from '../../../../hooks/useForm'
import Swal from 'sweetalert2'
import { useAuthStore } from '../../../../hooks/useAuthStore'
import { validationPassword } from '../helpers/registerHelper'

const RegisterFormFields = {
  Email: '',
  Password: '',
  Password2: '',
  FullName: ''
}
export const RegisterComponent = ({ setActive }: IRegisterComponent) => {
  const { onChangeEvent, FullName, Email, Password, Password2 } =
    useForm(RegisterFormFields)
  const { startRegisterUser, errorMessage } = useAuthStore()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error, msg } = validationPassword(Password, Password2)
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: msg
      })
      return
    }
    startRegisterUser(FullName, Email, Password)
  }

  useEffect(() => {
    if (errorMessage !== '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage
      })
    }
  }, [errorMessage])

  return (
    <form onSubmit={onSubmit}>
      <h2 className="mb-3 text-center">Registrate</h2>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          name="FullName"
          value={FullName}
          onChange={onChangeEvent}
          required
        />
        <label>Nombre</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          name="Email"
          value={Email}
          onChange={onChangeEvent}
          required
        />
        <label>Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          name="Password"
          value={Password}
          onChange={onChangeEvent}
          required
        />
        <label>Contraseña</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Repite contraseña"
          name="Password2"
          value={Password2}
          onChange={onChangeEvent}
          required
        />
        <label>Repite contraseña</label>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="submit">
          Registrate
        </button>
      </div>
      <div className="text-center mt-4 ">
        <span>
          ¿Ya tienes una cuenta?{' '}
          <span className="registerTxt" onClick={() => setActive('login')}>
            Inicia sesión
          </span>
        </span>
      </div>
    </form>
  )
}
