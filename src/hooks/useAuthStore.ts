import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../store/store'
import { calendarAPI } from '../api/calendarAPI'
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} from '../store/auth/authSlice'
import { IDataResult, IRenewToken } from './types/useAuthStoreTypes'
import { onLogoutCalendar } from '../store/calendar/calendarSlice'

export const useAuthStore = () => {
  const dispatch = useAppDispatch()
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  )

  const startRegisterUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    dispatch(onChecking())
    try {
      const { data }: IDataResult = await calendarAPI.post('/auth/new', {
        name,
        email,
        password
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime().toString())
      dispatch(onLogin({ uid: data.uid, name: data.name }))
    } catch (error:any) {
      dispatch(
        onLogout(error.response.data.msg || 'Error al crear el usuario, revisa que los datos ingresados sean correctos')
      )
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 30)
    }
  }

  const startLogin = async (email: string, password: string) => {
    dispatch(onChecking())
    try {
      const { data }: IDataResult = await calendarAPI.post('/auth', {
        email,
        password
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime().toString())
      dispatch(onLogin({ uid: data.uid, name: data.name }))
    } catch (error) {
      console.log(error)
      dispatch(onLogout('Credenciales incorrectas'))
      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 30)
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout(''))
    dispatch(onLogoutCalendar())
  }
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(onLogout(''))
    }
    try {
      const { data }:IRenewToken = await calendarAPI.get('/auth/renew')
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime().toString())
      dispatch(onLogin({ uid: data.uid, name: data.name }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout(''))
    }
  }
  return {
    // * Propieties
    status,
    user,
    errorMessage,
    // * Functions
    startRegisterUser,
    startLogin,
    startLogout,
    checkAuthToken
  }
}
