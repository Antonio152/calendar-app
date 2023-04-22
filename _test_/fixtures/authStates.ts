import { IUserAuth } from '../../src/shared/types/userTypes'
import { testUser } from './testUser'

export const initialState = {
  status: 'checking',
  user: {} as IUserAuth,
  errorMessage: ''
}

export const authenticatedState = {
  status: 'authenticated',
  user: testUser,
  errorMessage: ''
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {} as IUserAuth,
  errorMessage: 'Error user'
}

export const notAuthenticatedStateM = {
  status: 'not-authenticated',
  user: {} as IUserAuth,
  errorMessage: ''
}

/* user in db */
export const newUser = {
  name: 'Antonio Prueba',
  email: 'prueba@mail.com',
  password: '123456'
}

export const inValidUser = {
  email: 'ggmail@mail.com',
  password: '1232222'
}

export const logguedUser = {
  status: 'authenticated',
  user: { uid: '643730501bc1c6888e1297ec', name: 'Prueba' },
  errorMessage: ''
}

export const newUserResponse = {
  status: 'authenticated',
  user: { uid: '1234214124214', name: 'Prueba' },
  errorMessage: ''
}
