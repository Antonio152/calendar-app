import { IValidationPassword } from '../types/RegisterPageTypes'

export const validationPassword = (password: string, password2: string):IValidationPassword => {
  if (password !== password2) {
    return {
      error: true,
      msg: 'Las contraseas no son iguales'
    }
  }
  if (password.length < 6 || password2.length < 6) {
    return {
      error: true,
      msg: 'Las contraseñas deben de tener al menos 6 digitos'
    }
  }
  return {
    error: false,
    msg: ''
  }
}
