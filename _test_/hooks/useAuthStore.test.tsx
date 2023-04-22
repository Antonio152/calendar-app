import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { IUserAuth } from '../../src/shared/types/userTypes'
import { authSlice } from '../../src/store/auth/authSlice'
import { authenticatedState, inValidUser, initialState, logguedUser, newUser, newUserResponse, notAuthenticatedState, notAuthenticatedStateM } from '../fixtures/authStates'
import { WrapperProps } from './types'
import { useAuthStore } from '../../src/hooks/useAuthStore'
import { calendarAPI } from '../../src/api/calendarAPI'
import { testUser } from '../fixtures/testUser'

const getMockStore = (initialState = {
  status: 'checking',
  user: {} as IUserAuth,
  errorMessage: ''
}) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  })
}
describe('tesing in useAuthStore', () => {
  beforeEach(() => localStorage.clear())
  test('should return default values', () => {
    const mockStore = getMockStore(initialState)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    expect(result.current).toEqual({
      ...initialState,
      startRegisterUser: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      checkAuthToken: expect.any(Function)
    })
  })

  test('should create a new user', async () => {
    const mockStore = getMockStore(initialState)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const spy = jest.spyOn(calendarAPI, 'post').mockResolvedValueOnce({
      data: {
        ok: true,
        uid: '1234214124214',
        name: 'Prueba',
        token: 'some-token'
      }
    })
    const { startRegisterUser } = result.current
    await act(async () => {
      await startRegisterUser('prueba account', 'correo@email.com', '123456')
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual(newUserResponse)
    spy.mockRestore()
  })

  test('should fail when create a new user', async () => {
    localStorage.clear()
    const mockStore = getMockStore(initialState)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const { startRegisterUser } = result.current
    await act(async () => {
      await startRegisterUser('prueba account', 'test@mail.com', '123456')
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({ ...notAuthenticatedStateM, errorMessage: 'Ya existe un usuario con ese email' })
  })

  test('should start login', async () => {
    localStorage.clear()
    const { email, password } = newUser
    const mockStore = getMockStore(notAuthenticatedStateM)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const { startLogin } = result.current
    await act(async () => {
      await startLogin(email, password)
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual(logguedUser)

    expect(localStorage.getItem('token')).toEqual(expect.any(String))
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String))
  })

  test('should fail start login', async () => {
    localStorage.clear()
    const { email, password } = inValidUser
    const mockStore = getMockStore(notAuthenticatedStateM)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const { startLogin } = result.current
    await act(async () => {
      await startLogin(email, password)
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({ ...notAuthenticatedState, errorMessage: 'Credenciales incorrectas' })
    expect(localStorage.getItem('token')).toBe(null)
    await waitFor(() =>
      expect(result.current.errorMessage).toBe('')
    )
  })

  //   test('should start logout', () => {
  //     const mockStore = getMockStore(initialState)
  //     const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

  //     const { result } = renderHook(() => useAuthStore(), {
  //       wrapper: customWrapper
  //     })
  //     const { startLogout } = result.current
  //     act(() => {
  //       startLogout()
  //     })
  //   })

  test('should fail if the token is invalid', async () => {
    const mockStore = getMockStore(initialState)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const { checkAuthToken } = result.current
    await act(async () => {
      await checkAuthToken()
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({ ...notAuthenticatedStateM })
  })
  test('should define the user session if the token is valid', async () => {
    const { data } = await calendarAPI.post('/auth', testUser)
    localStorage.setItem('token', data.token)
    const mockStore = getMockStore(initialState)
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: customWrapper
    })
    const { checkAuthToken } = result.current
    await act(async () => {
      await checkAuthToken()
    })
    const { errorMessage, status, user } = result.current
    expect({ errorMessage, status, user }).toEqual({ ...authenticatedState, user: { name: 'Test User', uid: '64399d03dc75cbd8681cfa66' } })
  })
})
