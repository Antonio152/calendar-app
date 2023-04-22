import { authSlice } from '../../../src/store/auth/authSlice'
import { initialState, authenticatedState, notAuthenticatedState, notAuthenticatedStateM } from '../../fixtures/authStates'
import { testUser } from '../../fixtures/testUser'
describe('testing in authSlice', () => {
  test('should return initial state', () => {
    expect(authSlice.name).toBe('auth')
    expect(authSlice.getInitialState()).toEqual(initialState)
  })
  test('should check the user session', () => {
    const actionCheck = authSlice.actions.onChecking()
    const stateCheck = authSlice.reducer(initialState, actionCheck)
    expect(stateCheck).toEqual(initialState)
  })
  test('should made the login', () => {
    const actionLogin = authSlice.actions.onLogin(testUser)
    const newState = authSlice.reducer(initialState, actionLogin)
    expect(actionLogin.payload).toBe(testUser)
    expect(newState).toEqual(authenticatedState)
  })

  test('should made the logout', () => {
    const actionLogout = authSlice.actions.onLogout('Error user')
    const stateLogout = authSlice.reducer(authenticatedState, actionLogout)
    expect(stateLogout).toEqual(notAuthenticatedState)
  })

  test('should delete the error message in state', () => {
    const action = authSlice.actions.onLogout('Error user')
    const stateMessage = authSlice.reducer(notAuthenticatedState, action)
    expect(stateMessage).toEqual(notAuthenticatedState)

    /* Delete state */
    const actionDelete = authSlice.actions.clearErrorMessage()
    const stateFinal = authSlice.reducer(stateMessage, actionDelete)
    expect(stateFinal).toEqual(notAuthenticatedStateM)
  })
})
