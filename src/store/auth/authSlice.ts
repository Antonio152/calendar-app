import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserAuth } from '../../shared/types/userTypes'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
    user: <IUserAuth>{},
    errorMessage: ''
  },
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = {} as IUserAuth
      state.errorMessage = ''
    },
    onLogin: (state, { payload }:PayloadAction<IUserAuth>) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = ''
    },
    onLogout: (state, { payload } : PayloadAction<string>) => {
      state.status = 'not-authenticated'
      state.user = {} as IUserAuth
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    }
  }
})

// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions
