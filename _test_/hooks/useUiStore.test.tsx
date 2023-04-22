import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { useUIStore } from '../../src/hooks/useUIStore'
// import { store } from '../../src/store/store'
import { uiSlice } from '../../src/store/ui/uiSlice'
import { WrapperProps } from './types'

const getMockStore = (initialState = { isDateModalOpen: false }) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  })
}
describe('tesing of useUiStore hook', () => {
  test('should return default values', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useUIStore(), {
      wrapper: customWrapper
    })
    expect(result.current).toEqual({
      isDateModalOpen: true,
      onOpenDateModalH: expect.any(Function),
      onCloseDateModalH: expect.any(Function)
    })
  })
  test('should put true in isDateModal', () => {
    const mockStore = getMockStore({ isDateModalOpen: false })
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useUIStore(), {
      wrapper: customWrapper
    })
    const { onOpenDateModalH } = result.current
    act(() => {
      onOpenDateModalH()
    })
    expect(result.current.isDateModalOpen).toBe(true)
  })

  test('should put in false isDateModal', () => {
    const mockStore = getMockStore({ isDateModalOpen: true })
    const customWrapper = ({ children }:WrapperProps) => <Provider store={mockStore}>{children}</Provider>

    const { result } = renderHook(() => useUIStore(), {
      wrapper: customWrapper
    })
    const { onCloseDateModalH } = result.current
    act(() => {
      onCloseDateModalH()
    })
    expect(result.current.isDateModalOpen).toBe(false)
  })
})
